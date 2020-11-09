import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { url } from 'src/app/shared/endpoints';
import { Device, Series, State } from 'src/app/shared/services/device.service';

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

const devList: Device[] = [
  {
    id: 0,
    name: 'wiProbe2',
    description: 'network HW zond',
    ip: '192.168.1.2',
    procFrequency: 233,
    ramMb: 32,
    regDate: new Date(),
    series: Series.T2000,
    state: State.CONNECTED,
    workingCondition: true,
  },
  {
    id: 1,
    name: 'wiProbe1',
    description: 'network HW zond',
    ip: '192.168.1.3',
    procFrequency: 133,
    ramMb: 16,
    regDate: new Date(),
    series: Series.T1000,
    state: State.CONNECTED,
    workingCondition: true,
  },
  {
    id: 2,
    name: 'cisco',
    description: 'network cisco module',
    ip: '192.168.1.88',
    procFrequency: 133,
    ramMb: 16,
    regDate: new Date(),
    series: Series.T1000,
    state: State.CONNECTED,
    workingCondition: false,
  },
  {
    id: 3,
    name: 'cisco',
    description: 'network cisco module',
    ip: '192.168.3.88',
    procFrequency: 133,
    ramMb: 16,
    regDate: new Date(),
    series: Series.T1000,
    state: State.CONNECTED,
    workingCondition: false,
  },
  {
    id: 4,
    name: 'cisco',
    description: 'network cisco module',
    ip: '192.168.2.88',
    procFrequency: 133,
    ramMb: 16,
    regDate: new Date(),
    series: Series.T1000,
    state: State.CONNECTED,
    workingCondition: true,
  },
  {
    id: 5,
    name: 'cisco',
    description: 'network cisco module',
    ip: '192.168.7.88',
    procFrequency: 133,
    ramMb: 16,
    regDate: new Date(),
    series: Series.T1000,
    state: State.CONNECTED,
    workingCondition: true,
  },
  {
    id: 6,
    name: 'cisco',
    description: 'network cisco module',
    ip: '192.168.8.88',
    procFrequency: 133,
    ramMb: 16,
    regDate: new Date(),
    series: Series.T1000,
    state: State.CONNECTED,
    workingCondition: true,
  },
];

@Injectable()
export class FakeHttpInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let response: any;

    console.log(request.url);

    switch (true) {
      case url.auth === request.url:
        if (request.body.email === fakeUser.email && request.body.password === fakeUser.password) {
          response = {
            status: 200,
            body:
              {
                token: fakeToken,
              },
          };
        } else if (request.body.email === fakeUser.email) {
          response = {
            status: 401,
            body:
              {
                error: 'password',
              },
          };
        } else {
          response = {
            status: 401,
            body:
              {
                error: 'email',
              },
          };
        }
        break;
      case url.deviceList === request.url:
        response = {
          status: 200,
          body: devList,
        };
        break;
      case request.url.startsWith(url.deviceById):
        const id = request.url.slice(1 + request.url.lastIndexOf('='), request.url.length);
        response = {
          status: 200,
          body: devList.find(dev => dev.id.toString() === id),
        };
        break;
      case url.add === request.url:
        const device: Device = request.body;
        device.id = devList.length;
        devList.push(device);
        break;
    }

    return of(new HttpResponse(response)).pipe(
      delay(1000),
    );
  }
}
