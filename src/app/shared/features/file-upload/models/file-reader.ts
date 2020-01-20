import { UploadStatus } from './upload-status';

export type FileReadType = 'string' | 'dataURL' | 'arrayBuffer';

export interface FileReadEvent {
  status: UploadStatus;
  type: string;
  progress?: number;
  data?: any;
}
