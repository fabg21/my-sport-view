import { Action } from '@ngrx/store';
import { LocalFile } from '../../models';

export const UPLOAD_REQUEST = '[File Local Upload Form] Request';
export const UPLOAD_CANCEL = '[File Local Upload Form] Cancel';
export const UPLOAD_RESET = '[File Local Upload Form] Reset';
export const UPLOAD_STARTED = '[File Local Upload API] Started';
export const UPLOAD_PROGRESS = '[File Local Upload API] Progress';
export const UPLOAD_FAILURE = '[File Local Upload API] Failure';
export const UPLOAD_COMPLETED = '[File Local Upload API] Success';
export const UPLOAD_UPDATE_MAX_TOTAL_FILES_SIZE = '[File Local Upload API] Update Max Total Files Size';
export const UPLOAD_MAX_TOTAL_SIZE_EXCEEDED_FAILURE = '[File Local Upload API] Max Total Size Exceeded Failure';

export class LocalUploadRequest implements Action {
  readonly type = UPLOAD_REQUEST;
  constructor(public payload: { files: File[] }) {}
}

export class LocalUploadCancel implements Action {
  readonly type = UPLOAD_CANCEL;
  constructor(public payload: { name: string }) {}
}

export class LocalUploadReset implements Action {
  readonly type = UPLOAD_RESET;
}

export class LocalUploadStarted implements Action {
  readonly type = UPLOAD_STARTED;
}

export class LocalUploadProgress implements Action {
  readonly type = UPLOAD_PROGRESS;
  constructor(public payload: { progress: number }) {}
}

export class LocalUploadFailure implements Action {
  readonly type = UPLOAD_FAILURE;
  constructor(public payload: { error: any }) {}
}

export class LocalUploadCompleted implements Action {
  readonly type = UPLOAD_COMPLETED;
  constructor(public payload: { file: LocalFile }) {}
}

export class LocalUploadUpdateMaxTotalFilesSize implements Action {
  readonly type = UPLOAD_UPDATE_MAX_TOTAL_FILES_SIZE;
  constructor(public payload: number) {}
}

export class LocalUploadMaxTotalSizeExceededFailure implements Action {
  readonly type = UPLOAD_MAX_TOTAL_SIZE_EXCEEDED_FAILURE;
  constructor(public payload: { error: any }) {}
}

export type LocalUploadActions =
  | LocalUploadRequest
  | LocalUploadCancel
  | LocalUploadReset
  | LocalUploadStarted
  | LocalUploadProgress
  | LocalUploadFailure
  | LocalUploadCompleted
  | LocalUploadUpdateMaxTotalFilesSize
  | LocalUploadMaxTotalSizeExceededFailure;
