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
  serverErrorMessage: String;


  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['company'];
      },
      err => {
        this.serverErrorMessage = "Company Details couldn\'t be find, you will be redirected to another page.";
        setTimeout(() => this.router.navigate(['/cvview']), 1000);
      }
    );
  }

  onLogout() {
    this.companyService.deleteToken();
    this.router.navigate(['/login']);
  }

}
