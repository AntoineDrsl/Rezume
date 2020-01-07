import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  companyDetails;
  serverErrorMessage: boolean;


  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['company'];
      },
      err => {
        this.serverErrorMessage = true;
        setTimeout(() => this.router.navigate(['/login']), 1000);
      }
    );
  }

  onLogout() {
    this.companyService.deleteToken();
    this.router.navigate(['/login']);
  }

}
