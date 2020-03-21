import { Component, OnInit } from '@angular/core';

import { CompanyService } from 'src/app/shared/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  companyDetails;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {

    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['company'];
        console.log(this.companyDetails);
      },
      err => {
        console.log("nop");
      }
    )

  }

}
