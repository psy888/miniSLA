import { TestBed } from '@angular/core/testing';

import { LoadingStateService } from 'src/app/shared/services/loading-state.service';

describe('LoadingSatateService', () => {
  let service: LoadingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
