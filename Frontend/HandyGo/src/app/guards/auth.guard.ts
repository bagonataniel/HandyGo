import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');
  const currentTime = new Date().getTime();

  if (token && loginTime) {
    const loginTimestamp = new Date(loginTime).getTime();
    const expirationTime = 24 *60 * 60 * 1000;
    if (currentTime - loginTimestamp > expirationTime) {
      localStorage.clear();
      return router.createUrlTree(['/']);
    }
  }
  if (token) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
