import { TestBed } from '@angular/core/testing';

import { FakeHttpInterceptor } from './fake-http.interceptor';

describe('FakeHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FakeHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FakeHttpInterceptor = TestBed.inject(FakeHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
