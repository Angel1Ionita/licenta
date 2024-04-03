import { HttpInterceptorFn } from '@angular/common/http';

//interceptor for setting cookie
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ withCredentials: true });
  console.log("this request has been intercepted");
  return next(req);
};
