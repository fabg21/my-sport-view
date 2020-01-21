import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  concatMap,
  takeUntil,
  map,
  catchError,
  withLatestFrom,
  filter,
  tap
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import * as fromRootState from 'src/app/core/+state';
import { TransferFileService } from '../../services/transfer-file.service';
import {
  AcceptedFileTypes,
  HasOwner,
  UploadedFileResponse,
  BucketDestination,
  LoadedFile
} from '../../models';
import * as fromFileTransfer from '../actions';

@Injectable({
  providedIn: 'root'
})
export class TransferFileEffect {
  constructor(
    private actions$: Actions<fromFileTransfer.FileTransferActions>,
    private uploadService: TransferFileService,
    private store$: Store<fromRootState.State>
  ) {}

  @Effect()
  uploadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType(fromFileTransfer.UPLOAD_REQUEST),
    withLatestFrom(this.store$.pipe(select(fromRootState.getUrl))),
    map(([{ payload }, url]) => setFileOwnership(payload, url)),
    concatMap(payload =>
      this.uploadService.uploadFile(payload.file, payload.destination).pipe(
        takeUntil(this.actions$.pipe(ofType(fromFileTransfer.UPLOAD_CANCEL))),
        map(getActionFromHttpEvent(payload.owner, payload.destination)),
        catchError(error => of(error))
      )
    )
  );

  @Effect()
  getFileSrcOnUploadSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType(fromFileTransfer.UPLOAD_COMPLETED),
    filter(({ payload }) => !!payload.file && !!payload.file.id),
    map(({ payload }) => {
      const fileId = payload.file.id;
      const destination = payload.file.destination;
      console.log('about to dispatch a getfile req with', fileId, destination);
      return new fromFileTransfer.GetFileRequest({ fileId, destination });
    })
  );

  @Effect()
  getFileSrcEffect$: Observable<Action> = this.actions$.pipe(
    ofType<fromFileTransfer.GetFileRequest>(fromFileTransfer.GET_FILE_REQUEST),
    concatMap(({ payload }) =>
      this.uploadService.getFileUrl(payload.fileId, payload.destination).pipe(
        map(
          fileSrc =>
            new fromFileTransfer.GetFileRequestSuccess({
              fileSrc,
              fileId: payload.fileId
            })
        ),
        catchError(error =>
          of(new fromFileTransfer.GetFileRequestFailure(error))
        )
      )
    )
  );
}

const getActionFromHttpEvent = (
  owner: HasOwner,
  destination: BucketDestination
) => (event: HttpEvent<any>) => {
  switch (event.type) {
    case HttpEventType.Sent: {
      return new fromFileTransfer.UploadStarted();
    }
    case HttpEventType.DownloadProgress:
    case HttpEventType.UploadProgress: {
      return new fromFileTransfer.UploadProgress({
        progress: Math.round((100 * event.loaded) / event.total)
      });
    }
    case HttpEventType.ResponseHeader:
    case HttpEventType.Response: {
      return event.status === 201
        ? new fromFileTransfer.UploadCompleted({
            file: getFileInfo(
              event as HttpResponse<UploadedFileResponse>,
              owner,
              destination
            )
          })
        : new fromFileTransfer.UploadFailure({
            error: event.statusText
          });
    }
    default: {
      return new fromFileTransfer.UploadFailure({
        error: `Unknown Event : ${JSON.stringify(event)}`
      });
    }
  }
};

const setFileOwnership = (
  payload: any,
  url: string
): { file: File; destination: BucketDestination; owner: HasOwner } => {
  return !!payload.hasOwner && !!payload.hasOwner.ownerId
    ? { ...payload, owner: { owned: true, ownerId: payload.ownerId } }
    : { ...payload, owner: { owned: false, ownerId: url } };
};

function getFileInfo(
  event: HttpResponse<UploadedFileResponse>,
  owner: HasOwner,
  destination: BucketDestination
): LoadedFile {
  if (!event.body) {
    return;
  }
  const { etag, fileName, originalName } = event.body;
  if (!etag) {
    throw new Error('the file is not well formed');
  }
  const type: any = fileName.split('.')[1];

  if (!AcceptedFileTypes.includes(type)) {
    throw new Error('the file has invalid extension');
  }

  return {
    id: fileName,
    name: originalName,
    type,
    description: null,
    src: null,
    destination,
    ...owner
  };
}
