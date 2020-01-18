import { Observable } from 'rxjs';

import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('JWT_TOKEN');
    const jsonReq: HttpRequest<any> = token
      ? req.clone({
          headers: req.headers.append('Authorization', `Bearer ${token}`)
        })
      : req.clone();
    return next.handle(jsonReq);
  }
}
