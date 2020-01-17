import { createSelector } from '@ngrx/store';

import * as fromReducer from '../reducers';
import { getDiskSizeExceeded } from '../reducers/local-upload.reducer';

export const selectLocalUploadFileState = createSelector(
  fromReducer.selectUploadFeatureState,
  (state: fromReducer.UploadState) => state.localFiles
);

export const getFiles = createSelector(
  selectLocalUploadFileState,
  fromReducer.fromLocalFileUpload.getFiles
);

export const getFilesSize = createSelector(
  getFiles,
  files => files.length
);

export const getMaxSizeExceeded = createSelector(
  selectLocalUploadFileState,
  getDiskSizeExceeded
);
