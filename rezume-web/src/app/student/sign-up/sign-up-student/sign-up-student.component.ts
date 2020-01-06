import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { StudentService } from '../../../shared/student.service';

@Component({
  selector: 'app-sign-up-student',
  templateUrl: './sign-up-student.component.html',
  styleUrls: ['./sign-up-student.component.css']
})
export class SignUpStudentComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    this.studentService.postStudent(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
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
    this.studentService.selectedStudent = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
