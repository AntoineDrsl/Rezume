import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';
import { Router } from '@angular/router';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  companyDetails;
  serverErrorMessage: boolean;
  valid = false;

  options: AnimationOptions = {
    path: '/assets/lottie/data.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['company'];
        this.valid = true;
      },
      err => {
        this.serverErrorMessage = true;
        setTimeout(() => this.router.navigate(['/studentprofile']), 1);
      }
    );
  }

  onLogout() {
    this.companyService.deleteToken();
    this.router.navigate(['/login']);
  }



}
