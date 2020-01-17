import { ActionReducerMap, MemoizedSelector, createFeatureSelector } from '@ngrx/store';
import * as fromFileUpload from './upload-file.reducer';
import * as fromLocalFileUpload from './local-upload.reducer';

export interface UploadState {
  files: fromFileUpload.FileUploadState;
  localFiles: fromLocalFileUpload.LocalFileUploadState;
}

export const reducers: ActionReducerMap<UploadState> = {
  files: fromFileUpload.reducer,
  localFiles: fromLocalFileUpload.reducer
};

export const selectUploadFeatureState: MemoizedSelector<object, UploadState> = createFeatureSelector<UploadState>(
  'uploads'
);

export { fromFileUpload, fromLocalFileUpload };
