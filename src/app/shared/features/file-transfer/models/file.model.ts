import { FileType } from './file-types';
import { BucketDestination } from './bucket';

export interface LoadedFile extends HasOwner {
  id: string;
  name: string;
  type: FileType;
  src?: string;
  destination?: BucketDestination;
  description?: string;
}

export interface HasOwner {
  owned: boolean;
  ownerId?: string;
}

export interface UploadedFileResponse {
  etag: string;
  fileName: string;
  originalName: string;
}
