import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/userprofile');
    }
  }

  model = {
    email : '',
    password : ''
  };

  onSubmit(form : NgForm) {
    //On appelle la fonction login() définie dans UserService en passant les infos comme Credentials
    this.userService.login(form.value).subscribe(
      res => {
        //On stock le tocken renvoyé
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
