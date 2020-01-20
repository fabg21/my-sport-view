import { FileReadEvent } from './file-reader';

export interface LocalFile {
  id: string;
  name: string;
  size: number;
  type: string;
  data?: FileReadEvent | any;
  error?: any;
}
