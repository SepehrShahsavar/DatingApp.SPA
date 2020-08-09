import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError( responsError => {
        if (responsError.status === 401) {
          return throwError(responsError.statusText);
        }

        if ( responsError instanceof HttpErrorResponse) {
          const  applicationError = responsError.headers.get('Application-Error');
          if (applicationError) {
            return  throwError(applicationError);
          }
          const serverError = responsError.error;
          let modelStateError = '';
          if (serverError.errors && typeof  serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modelStateError += serverError.errors[key] + '\n';
              }
            }
          }
          return throwError(modelStateError || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
