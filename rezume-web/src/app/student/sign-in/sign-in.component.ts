import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from '../../shared/student.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    if(this.studentService.isLoggedIn()) {
      this.router.navigateByUrl('/studentprofile');
    }
  }

  model = {
    statut : 'student',
    email : '',
    password : ''
  };

  onSubmit(form : NgForm) {
    //On appelle la fonction login() définie dans StudentService en passant les infos comme Credentials
    this.studentService.login(form.value).subscribe(
      res => {
        //On stock le tocken renvoyé
        this.studentService.setToken(res['token']);
        if(this.model.statut == "student") {
          this.router.navigateByUrl('/studentprofile');
        } else if(this.model.statut == "company") {
          this.router.navigateByUrl('/companyprofile')
        }
      },
      err => {
        this.serverErrorMessages = err.error.message;

      }
    );
  }

}
