import { Action } from '@ngrx/store';
import { BucketDestination } from '../../models';

export const UPLOAD_REQUEST = '[File Remote Upload Form] Request';
export const UPLOAD_CANCEL = '[File Remote Upload Form] Cancel';
export const UPLOAD_RESET = '[File Remote Upload Form] Reset';
export const UPLOAD_STARTED = '[File Remote Upload API] Started';
export const UPLOAD_PROGRESS = '[File Remote Upload API] Progress';
export const UPLOAD_FAILURE = '[File Remote Upload API] Failure';
export const UPLOAD_COMPLETED = '[File Remote Upload API] Success';

export class UploadRequest implements Action {
  readonly type = UPLOAD_REQUEST;
  constructor(
    public payload: {
      file: File;
      destination: BucketDestination;
      ownerId: string;
    }
  ) {}
}

export class UploadCancel implements Action {
  readonly type = UPLOAD_CANCEL;
}

export class UploadReset implements Action {
  readonly type = UPLOAD_RESET;
}

export class UploadStarted implements Action {
  readonly type = UPLOAD_STARTED;
}

export class UploadProgress implements Action {
  readonly type = UPLOAD_PROGRESS;
  constructor(public payload: { progress: number }) {}
}

export class UploadFailure implements Action {
  readonly type = UPLOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UploadCompleted implements Action {
  readonly type = UPLOAD_COMPLETED;
  constructor(
    public payload: {
      file: { owner: string; etag: string; id: string; name: string };
    }
  ) {}
}

export type UploadActions =
  | UploadRequest
  | UploadCancel
  | UploadReset
  | UploadStarted
  | UploadProgress
  | UploadFailure
  | UploadCompleted;
