import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  concatMap,
  takeUntil,
  map,
  catchError,
  withLatestFrom,
  filter
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

import * as fromRootState from 'src/app/core/+state';
import { TransferFileService } from '../../services/transfer-file.service';
import {
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
    map(([{ payload }, url]) => this.setFileOwnership(payload, url)),
    concatMap(payload =>
      this.uploadService.uploadFile(payload.file, payload.destination).pipe(
        takeUntil(this.actions$.pipe(ofType(fromFileTransfer.UPLOAD_CANCEL))),
        map(this.getActionFromHttpEvent(payload.owner, payload.destination)),
        catchError(error => of(error))
      )
    )
  );

  // @Effect()
  // getFileSrcOnUploadSuccessEffect$: Observable<Action> = this.actions$.pipe(
  //   ofType(fromFileTransfer.UPLOAD_COMPLETED),
  //   filter(({ payload }) => !!payload.file && !!payload.file.id),
  //   map(({ payload }) => {
  //     const fileId = payload.file.id;
  //     const destination = payload.file.destination;
  //     return new fromFileTransfer.GetFileRequest({ fileId, destination });
  //   })
  // );

  private getActionFromHttpEvent = (
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
              file: this.getFileInfo(
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

  private setFileOwnership(
    payload: any,
    url: string
  ): { file: File; destination: BucketDestination; owner: HasOwner } {
    return !!payload.hasOwner && !!payload.hasOwner.ownerId
      ? { ...payload, owner: { owned: true, ownerId: payload.ownerId } }
      : { ...payload, owner: { owned: false, ownerId: url } };
  }

  private getFileInfo(
    event: HttpResponse<UploadedFileResponse>,
    owner: HasOwner,
    destination: BucketDestination
  ): LoadedFile {
    if (!event.body) {
      return;
    }
    const { name, id, mimetype: type, size, updatedAt } = event.body;
    const parsedSize = Number.parseInt(size);
    return {
      id,
      name,
      type,
      size: parsedSize,
      description: null,
      src: this.uploadService.getFileUrl(id, destination),
      destination,
      updatedAt: new Date(updatedAt),
      ...owner
    };
  }
}
