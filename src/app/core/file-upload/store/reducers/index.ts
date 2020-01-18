import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromFileUpload from './upload-file.reducer';

export interface UploadState {
  files: fromFileUpload.FileUploadState;
}

export const reducers: ActionReducerMap<UploadState> = {
  files: fromFileUpload.reducer
};

export const selectUploadFeatureState: MemoizedSelector<
  object,
  UploadState
> = createFeatureSelector<UploadState>('uploads');

export * from './upload-file.reducer';
