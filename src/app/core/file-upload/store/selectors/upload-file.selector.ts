import { createSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';

export const selectUploadFileState = createSelector(
  fromReducer.selectUploadFeatureState,
  (state: fromReducer.UploadState) => state.files
);

export const selectUploadFileError = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getError
);

export const selectUploadFileReady = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getReady
);

export const selectUploadFileRequested = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getRequested
);

export const selectUploadFileStarted = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getStarted
);

export const selectUploadFileProgress = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getProgress
);

export const selectUploadFileInProgress = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getInProgress
);

export const selectUploadFileFailed = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getFailed
);

export const selectUploadFileCompleted = createSelector(
  selectUploadFileState,
  fromReducer.fromFileUpload.getCompleted
);
