import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../registro/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router ) { }

  canActivate(next: ActivatedRouteSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {
      if(this.authenticationService.isLoggedIn) {
         this.router.navigate(['servicios'])
      }
    return true;
  }

}
