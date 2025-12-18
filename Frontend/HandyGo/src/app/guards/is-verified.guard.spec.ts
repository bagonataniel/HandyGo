import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isVerifiedGuard } from './is-verified.guard';

describe('isVerifiedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isVerifiedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
