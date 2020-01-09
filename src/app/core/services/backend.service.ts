import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class BackendService {
  apiHost = environment.apiHost;

  constructor(protected http: HttpClient) {}

  get<T>(url, useCache = false): Observable<T> {
    const options = Object.assign(
      { withCredentials: false },
      httpOptions,
      useCache
    );
    return this.http.get(this.apiHost + url, options) as any;
  }

  post<T>(url: string, customOptions, body: any): Observable<T> {
    const options = Object.assign(
      { withCredentials: true },
      customOptions || httpOptions
    );
    return this.http.post(
      this.apiHost + url,
      JSON.stringify(body),
      options
    ) as any;
  }

  delete<T>(id: number, url: string) {
    return this.http.delete(this.apiHost + url + '/' + id);
  }

  put<T>(url: string, customOptions, body: any): Observable<T> {
    const options = Object.assign(
      { withCredentials: true },
      customOptions || httpOptions
    );
    return this.http.put(
      this.apiHost + url,
      JSON.stringify(body),
      options
    ) as any;
  }
}
