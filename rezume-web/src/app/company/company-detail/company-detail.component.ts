import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  companyDetails;

  editSelected = false;

  companyUpdateForm: FormGroup;

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
        console.log(this.companyDetails);
      },
      err => {
        console.log("nop");
      }
    )

  }



  goToEdit() {
    this.editSelected = !this.editSelected;
    this.initForm();
  }

  initForm() {
    const company_name = this.companyDetails[0].company_name;
    const email = this.companyDetails[0].email;
    const description = this.companyDetails[0].description;
    const password = this.companyDetails[0].password;
    console.log(password);

    this.companyUpdateForm = new FormGroup({
      company_name: new FormControl(company_name),
      email: new FormControl(email),
      description: new FormControl(description),
      password: new FormControl(password)
    });

  }



  onSubmit(form) {
    console.log(form.value);

    this.companyService.updateCompany(form.value).subscribe(
      res => {
        window.location.reload();
      },

      err => {
        console.log("erreur");
      }
    )
  }
}
