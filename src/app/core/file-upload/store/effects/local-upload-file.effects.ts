import { Observable, of } from 'rxjs';
import {
  map,
  catchError,
  exhaustMap,
  withLatestFrom,
  mapTo
} from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import { Injectable } from '@angular/core';

import { FileUploadService } from '../../services/file-upload.service';
import { UploadStatus } from '../../models';
import { LocalFile } from '../../models/local-file';
import { localActions as fromFileUpload } from '../actions';
import { LocalFileUploadState } from '../reducers/local-upload.reducer';
import { getMaxSizeExceeded } from '../selectors';

@Injectable()
export class LocalUploadFileEffects {
  constructor(
    private actions$: Actions,
    private uploadService: FileUploadService,
    private store$: Store<LocalFileUploadState>
  ) {}

  // @Effect()
  // localUploadRequestEffect$: Observable<Action> = this.actions$.pipe(
  //   ofType<fromFileUpload.LocalUploadRequest>(fromFileUpload.UPLOAD_REQUEST),
  //   withLatestFrom(this.store$.pipe(select(getMaxSizeExceeded))),
  //   exhaustMap(([{ payload }, exceeded]) =>
  //     this.uploadService.localUploadFile(payload.files).pipe(
  //       map(file => getActionFromFileReadEvent(file, exceeded)),
  //       catchError(error => of(new fromFileUpload.LocalUploadFailure(error)))
  //     )
  //   )
  // );
}

function getActionFromFileReadEvent(file: LocalFile, exceeded: boolean) {
  if (!file || !file.data) {
    return;
  }

  if (exceeded) {
    return new fromFileUpload.LocalUploadMaxTotalSizeExceededFailure({
      error: 'The upload exceeds the authorized size.'
    });
  }

  const { data: event, ...fileInfo } = file;

  switch (event.status) {
    case UploadStatus.Requested: {
      return new fromFileUpload.LocalUploadStarted();
    }
    case UploadStatus.Started: {
      return new fromFileUpload.LocalUploadProgress({
        progress: event.progress
      });
    }
    case UploadStatus.Completed: {
      return new fromFileUpload.LocalUploadCompleted({
        file: {
          ...fileInfo,
          data: event.data
        }
      });
    }
    case UploadStatus.Failed: {
      return new fromFileUpload.LocalUploadFailure({
        error: event.data
      });
    }
    default: {
      return new fromFileUpload.LocalUploadFailure({
        error: `Unknown Event : ${JSON.stringify(file)}`
      });
    }
  }
}
