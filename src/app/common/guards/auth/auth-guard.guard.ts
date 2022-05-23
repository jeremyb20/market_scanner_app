import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  hasPermissionByMenu: any;
  changeDetected: any;
  navigation: any;
  value: boolean;
  url: any;
  tittle :any;

  constructor(private titleService: Title, private authService: AuthService, private router: Router, private location: Location){
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: any) => {
      if(event.url != '/login' ){
        this.authService.setRouterLink(event.url);
      } 
      this.hasPermissionByMenu = (this.authService.getPermissionByMenu() == 'true')? true: false;
      if( this.authService.getUserRole() != 'Administrador' ){
        if(!this.hasPermissionByMenu){
          if(event.url != '/profile' && event.url != '/login' && event.url != '/configuration'){
            this.router.navigate(['/dashboard'])
          }
        }

        return true;
      }else {
        this.router.navigate(['/dashboard'])
        return false;
      }
    });
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if( this.authService.getUserRole() == 'Usuario' ){
        return true;
      }else {
        this.router.navigate(['/admin'])
        return false;
      }
  }
  
}
