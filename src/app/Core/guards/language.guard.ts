import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const languageGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const lang = route.params['lang'];
  if (lang === 'en' || lang === 'ar') {
    return true;
  }
  router.navigate(['en']);
  return false;
};