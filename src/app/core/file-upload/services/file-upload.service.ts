import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { mapTo } from 'rxjs/operators';
import { BucketDestination } from '../models/bucket';

@Injectable()
export class FileUploadService {
  private API_UPLOAD_BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public uploadFile(
    file: File,
    destination: BucketDestination
  ): Observable<HttpEvent<{}>> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    const options = {
      reportProgress: true,
      observe: 'events'
    };

    const req = new HttpRequest(
      'POST',
      `${this.API_UPLOAD_BASE_URL}/upload/${destination}`,
      formData,
      options
    );
    return this.http.request(req);
  }

  public getFileUrl(fileName: string, fileCategory: string) {
    const url = `${this.API_UPLOAD_BASE_URL}/download/${fileCategory}/${fileName}`;
    return this.http.get(url, { responseType: 'text' }).pipe(mapTo(url));
  }
}
