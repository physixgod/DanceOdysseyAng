import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuthenticated = sessionStorage.getItem('loggedIn') === 'true';

    if (isAuthenticated) {
      const roleString = sessionStorage.getItem('role');
      const role = roleString ? JSON.parse(roleString).id : null;
      console.log(role);
      console.log(roleString);


      switch (route.routeConfig?.path) {
        case 'homepage':
          return role == 1 || role == 2;
        case 'competitions':
          return role == 1 || role == 2;

        case 'admin':
          return role == 1;
          case 'usersList':
        return role == 1;
        default:
          return false;
          
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
