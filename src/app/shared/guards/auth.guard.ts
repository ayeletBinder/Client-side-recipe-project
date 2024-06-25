import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsersService } from '../services/users.service';


export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(UsersService);
  debugger
  console.log(userService.token,"userService.token");
  return userService.token ? true :false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const userService=inject(UsersService);
  return userService.correctUser?.role ? true :false;
};
