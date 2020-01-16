import { localActions as fromActions } from '../actions';
import { LocalFile, UploadStatus } from '../../models';

export interface LocalFileUploadState {
  status: UploadStatus;
  error: string | null;
  progress: number | null;
  files: { [id: string]: LocalFile };
  totalDiskSize: number;
}

export const initialState: LocalFileUploadState = {
  status: UploadStatus.Ready,
  error: null,
  progress: null,
  files: {},
  totalDiskSize: null
};

export function reducer(
  state = initialState,
  action: fromActions.LocalUploadActions
): LocalFileUploadState {
  switch (action.type) {
    case fromActions.UPLOAD_UPDATE_MAX_TOTAL_FILES_SIZE: {
      return {
        ...state,
        totalDiskSize: action.payload
      };
    }
    case fromActions.UPLOAD_REQUEST: {
      return {
        ...state,
        status: UploadStatus.Requested,
        progress: null,
        error: null
      };
    }
    case fromActions.UPLOAD_CANCEL: {
      const { [action.payload.name]: removed, ...remainingFiles } = state.files;
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null,
        files: remainingFiles
      };
    }
    case fromActions.UPLOAD_RESET: {
      return {
        ...state,
        status: UploadStatus.Ready,
        progress: null,
        error: null,
        files: {}
      };
    }
    case fromActions.UPLOAD_FAILURE: {
      return {
        ...state,
        status: UploadStatus.Failed,
        error: action.payload.error,
        progress: null,
        files: null
      };
    }
    case fromActions.UPLOAD_MAX_TOTAL_SIZE_EXCEEDED_FAILURE: {
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
      return {
        ...state,
        status: UploadStatus.Completed,
        progress: 100,
        error: null,
        files: {
          ...state.files,
          [action.payload.file.id]: action.payload.file
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getError = (state: LocalFileUploadState): string => state.error;

export const getStarted = (state: LocalFileUploadState): boolean =>
  state.status === UploadStatus.Started;

export const getRequested = (state: LocalFileUploadState): boolean =>
  state.status === UploadStatus.Requested;

export const getReady = (state: LocalFileUploadState): boolean =>
  state.status === UploadStatus.Ready;

export const getProgress = (state: LocalFileUploadState): number =>
  state.progress;

export const getInProgress = (state: LocalFileUploadState): boolean =>
  state.status === UploadStatus.Started && state.progress >= 0;

export const getFailed = (state: LocalFileUploadState): boolean =>
  state.status === UploadStatus.Failed;

export const getCompleted = (state: LocalFileUploadState): boolean =>
  state.status === UploadStatus.Completed;

export const getFiles = (state: LocalFileUploadState): LocalFile[] =>
  fromEntitiesToArray(state.files);

export const getFilesTotalSize = (state: LocalFileUploadState): number =>
  getFiles(state)
    .map(file => file.size)
    .reduce((acc, next) => acc + next, 0);

export const getDiskSizeExceeded = (state: LocalFileUploadState): boolean =>
  state.totalDiskSize ? getFilesTotalSize(state) > state.totalDiskSize : false;

function fromEntitiesToArray<T>(entities: { [id: string]: T }): T[] {
  return entities ? Object.keys(entities).map(k => entities[k]) : [];
}
