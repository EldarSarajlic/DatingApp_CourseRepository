import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AccountService} from '../services/account-service';

export const jwsInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const currentUser = accountService.currentUser();

  if(currentUser) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${currentUser.token}`
      }
    })
  }
  return next(req);
};
