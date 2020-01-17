import { Observable /*, of*/ } from 'rxjs';
// import {
//   map,
//   catchError,
//   tap,
//   concatAll,
//   concatMap,
//   mergeMap
// } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpParams
} from '@angular/common/http';

// import {
//   UploadStatus,
//   FileReadType,
//   FileReadEvent,
//   LocalFile
// } from '../models';
// import { getMimeType } from '../utils';

@Injectable()
//   {
//   providedIn: 'root'
// }
export class FileUploadService {
  private API_UPLOAD_BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    const options = {
      reportProgress: true
    };

    const req = new HttpRequest(
      'POST',
      `${this.API_UPLOAD_BASE_URL}/upload/avatars`,
      formData,
      options
    );
    return this.http.request(req);
  }

  // public localUploadFile(files: File[]): Observable<LocalFile> {
  //   return of(files).pipe(
  //     concatAll(),
  //     mergeMap(({ name: id, name, size, type }, index) =>
  //       uploadFileAsObservable(
  //         files[index],
  //         'arrayBuffer',
  //         arrayBufferToBase64
  //       ).pipe(
  //         map((x: any) => ({
  //           id,
  //           name,
  //           size,
  //           type: type ? type : getMimeType(name),
  //           data: x
  //         })),
  //         catchError(error =>
  //           of({
  //             id,
  //             name,
  //             size,
  //             type: type ? type : getMimeType(name),
  //             error
  //           })
  //         )
  //       )
  //     )
  //   );
  // }
}

// function uploadFileAsObservable(
//   blob: File | Blob,
//   readFormat: FileReadType = 'arrayBuffer',
//   convertFn?: Function
// ): Observable<FileReadEvent> {
//   return new Observable(obs => {
//     if (!(blob instanceof Blob)) {
//       throw new Error('`blob` must be an instance of File or Blob.');
//     }

//     const reader = new FileReader();

//     reader.onabort = err => obs.error(err);
//     reader.onerror = (event: ProgressEvent) =>
//       obs.next({
//         status: UploadStatus.Failed,
//         type: event.type,
//         data: reader.error
//       });
//     reader.onload = (event: ProgressEvent) =>
//       obs.next({
//         status: UploadStatus.Completed,
//         type: event.type,
//         data: convertFn ? convertFn(reader.result) : reader.result
//       });
//     reader.onprogress = (event: ProgressEvent) =>
//       obs.next({
//         status: UploadStatus.Started,
//         type: event.type,
//         progress: event.lengthComputable
//           ? Math.round((100 * event.loaded) / event.total)
//           : null
//       });
//     reader.onloadend = () => obs.complete();

//     switch (readFormat) {
//       case 'arrayBuffer': {
//         return reader.readAsArrayBuffer(blob);
//       }
//       case 'dataURL': {
//         return reader.readAsDataURL(blob);
//       }
//       default:
//       case 'string': {
//         return reader.readAsText(blob);
//       }
//     }
//   });
// }
// function arrayBufferToBase64(buffer: ArrayBuffer) {
//   const bin = new Uint8Array(buffer).reduce((prev, curr) => {
//     return prev.concat(String.fromCharCode(curr));
//   }, '');
//   const resultBase64 = btoa(bin);
//   return resultBase64;
// }
