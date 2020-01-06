import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { CompanyService } from '../../../shared/company.service';

@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.css']
})
export class SignUpCompanyComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    this.companyService.postCompany(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
        setTimeout(() => this.router.navigate(['/login']), 1000);

      },
      err => {
        if (err.status == 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        } else {
          this.serverErrorMessages = "Une erreur est survenue";
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.companyService.selectedCompany = {
      company_name: '',
      email: '',
      description: '',
      password: '',
      confirmPassword: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
