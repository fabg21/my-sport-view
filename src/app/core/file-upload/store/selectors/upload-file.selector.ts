import { createSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';

export const selectUploadFileState = createSelector(
  fromReducer.selectUploadFeatureState,
  (state: fromReducer.UploadState) => state.files
);

export const selectUploadFileError = createSelector(
  selectUploadFileState,
  fromReducer.getError
);

export const selectUploadFileReady = createSelector(
  selectUploadFileState,
  fromReducer.getReady
);

export const selectUploadFileRequested = createSelector(
  selectUploadFileState,
  fromReducer.getRequested
);

export const selectUploadFileStarted = createSelector(
  selectUploadFileState,
  fromReducer.getStarted
);

export const selectUploadFileProgress = createSelector(
  selectUploadFileState,
  fromReducer.getProgress
);

export const selectUploadFileInProgress = createSelector(
  selectUploadFileState,
  fromReducer.getInProgress
);

export const selectUploadFileFailed = createSelector(
  selectUploadFileState,
  fromReducer.getFailed
);

export const selectUploadFileCompleted = createSelector(
  selectUploadFileState,
  fromReducer.getCompleted
);

export const selectFiles = createSelector(
  selectUploadFileState,
  fromReducer.getFiles
);

export const selectFilesById = (fileId: string) =>
  createSelector(selectFiles, files => files[fileId]);
