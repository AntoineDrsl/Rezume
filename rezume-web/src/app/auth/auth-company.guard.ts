import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../shared/company.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthCompanyGuard implements CanActivate {


  constructor(private companyService: CompanyService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.companyService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      this.companyService.deleteToken();
      return false;
    }
  return true;
  }

}
