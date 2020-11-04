import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { url } from 'src/app/shared/endpoints';

const fakeUser = {
  name: 'John',
  email: 'test@test.com',
  password: 'GfHjkm!@',
};
/*
token data:
{
 "name": "John",
 "email": "test@test.com"
}
 */
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9.VFUII-XlGrJrfYryPLtxKYvUV7zPpEcFV9eJihTrmAc';

@Injectable()
export class FakeHttpInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let response: any;

    switch (request.url) {
      case url.auth:
        if (request.body.email === fakeUser.email && request.body.password === fakeUser.password) {
          response = {
            status: 200,
            body:
              {
                token: fakeToken,
              },
          };
        }

    }
    return of(new HttpResponse(response));
    // next.handle(request).pipe(
    //   tap(x => console.log('my server response')),
    // );
  }
}
