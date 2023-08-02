import { TestBed } from '@angular/core/testing';

import { InstallmentsApiService } from './installments-api.service';

describe('InstallmentsApiService', () => {
  let service: InstallmentsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstallmentsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
