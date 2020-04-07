import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { FormGroup, FormControl, Validators, MinLengthValidator} from '@angular/forms';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  companyDetails;

  editSelected = false;

  companyUpdateForm: FormGroup;
  get company_name() {
    return this.companyUpdateForm.get('company_name');
  }
  get email() {
    return this.companyUpdateForm.get('email');
  }
  get password() {
    return this.companyUpdateForm.get('password');
  }
  get description() {
    return this.companyUpdateForm.get('description');
  }

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
    this.initForm();
  }

  initForm() {
    const company_name = this.companyDetails[0].company_name;
    const email = this.companyDetails[0].email;
    const description = this.companyDetails[0].description;

    this.companyUpdateForm = new FormGroup({
      company_name: new FormControl(company_name, Validators.required),
      email: new FormControl(email, Validators.compose([Validators.required, Validators.email])),
      description: new FormControl(description, Validators.required),
      password: new FormControl('', Validators.minLength(8))
    });

  }

  onSubmit(form) {
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
