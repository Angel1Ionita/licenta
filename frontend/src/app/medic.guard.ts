import { CanMatchFn } from '@angular/router';

export const medicGuard: CanMatchFn = (route, state) => {
  let role: string = JSON.parse(localStorage.getItem('role')!);

  if (role !== "MEDIC") {
    //router.navigate(['/login']);
    return false;
  }
  return true;
};
