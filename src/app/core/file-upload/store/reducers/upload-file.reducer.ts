import { remoteActions as fromActions } from '../actions';
import { UploadStatus } from '../../models';

export interface FileUploadState {
  status: UploadStatus;
  error: string | null;
  progress: number | null;
  files: { [fileId: string]: any }; // Type this!!
}

export const initialState: FileUploadState = {
  status: UploadStatus.Ready,
  error: null,
  progress: null,
  files: {}
};

export function reducer(
  state = initialState,
  action: fromActions.UploadActions
): FileUploadState {
  switch (action.type) {
    case fromActions.UPLOAD_REQUEST: {
      return {
        ...state,
        status: UploadStatus.Requested,
        progress: null,
        error: null
      };
    }
    case fromActions.UPLOAD_CANCEL: {
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null
      };
    }
    case fromActions.UPLOAD_RESET: {
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null
      };
    }
    case fromActions.UPLOAD_FAILURE: {
      return {
        ...state,
        status: UploadStatus.Failed,
        error: action.payload.error,
        progress: null
      };
    }
    case fromActions.UPLOAD_STARTED: {
      return {
        ...state,
        status: UploadStatus.Started,
        progress: 0
      };
    }
    case fromActions.UPLOAD_PROGRESS: {
      return {
        ...state,
        progress: action.payload.progress
      };
    }
    case fromActions.UPLOAD_COMPLETED: {
      const newEntry = !!action.payload.file.id
        ? { [action.payload.file.id]: action.payload.file }
        : {};
      return {
        ...state,
        status: UploadStatus.Completed,
        progress: 100,
        error: null,
        files: {
          ...state.files,
          ...newEntry
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getError = (state: FileUploadState): string => state.error;

export const getStarted = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Started;

export const getRequested = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Requested;

export const getReady = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Ready;

export const getProgress = (state: FileUploadState): number => state.progress;

export const getInProgress = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Started && state.progress >= 0;

export const getFailed = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Failed;

export const getCompleted = (state: FileUploadState): boolean =>
  state.status === UploadStatus.Completed;
