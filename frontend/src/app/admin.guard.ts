import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  let storage: StorageService = inject(StorageService);
  let router: Router = inject(Router);
  let authService: AuthService = inject(AuthService);

  let role: string = JSON.parse(storage.getItem('role')!);

  if (role !== "ADMIN") {
    router.navigate(['/login']);
    return false;
  }

  // authService.getUserInfo().pipe(map(data => {
  //   if (data.email !== "ADMIN") { return false; }
  // }));

  return true;

};
