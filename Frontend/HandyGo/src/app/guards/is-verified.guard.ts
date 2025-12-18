import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isVerifiedGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const isVerified = AuthService.isAuthenticated;
  
    if (!isVerified) {
      return router.createUrlTree(['/verification']);
    }
  
    return true;
};
