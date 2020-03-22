import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  companyDetails;

  editSelected = false;
  outAnimation

  options: AnimationOptions = {
    path: '/assets/lottie/data.json',
    loop: true,
    autoplay: true
  };

  animationCreated(animationItem: AnimationItem): void {
    // console.log(animationItem);
    animationItem.setSpeed(0.5);

  }

  constructor(private companyService: CompanyService) { }

  ngOnInit() {

    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['company'];
      },
      err => {
        console.log("nop");
      }
    )

  }



  goToEdit() {

    this.editSelected = !this.editSelected;

  }


}
