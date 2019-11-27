import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  showMessage: boolean;
  serverErrorMessage: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showMessage = true;
        setTimeout(() => this.showMessage = false, 4000);
      },
      err => {
        if(err.status === 422){
          this.serverErrorMessage = err.error.join('</br>');
        }
        else{
          this.serverErrorMessage = 'Something went wrong. Please contact admin.';
        }
      }

    );
  }


  resetForm(form: NgForm){
    this.userService.selectedUser = {
      fullname: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessage ='';
  }


}
