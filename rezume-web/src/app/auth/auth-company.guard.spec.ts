import { TestBed, async, inject } from '@angular/core/testing';

import { AuthCompanyGuard } from './auth-company.guard';

describe('AuthCompanyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCompanyGuard]
    });
  });

  it('should ...', inject([AuthCompanyGuard], (guard: AuthCompanyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
