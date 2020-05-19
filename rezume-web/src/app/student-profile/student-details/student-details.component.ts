import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { FormGroup, FormControl, Validators, MinLengthValidator} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentDetails;
  favorites;

  editSelected = false;

  studentUpdateForm: FormGroup;
  get firstName() {
    return this.studentUpdateForm.get('firstName');
  }
  get lastName() {
    return this.studentUpdateForm.get('lastName');
  }
  get email() {
    return this.studentUpdateForm.get('email');
  }
  get password() {
    return this.studentUpdateForm.get('password');
  }

  options: AnimationOptions = {
    path: '/assets/lottie/data.json',
    loop: true,
    autoplay: true
  };
  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.5);

  }

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {

    this.studentService.getStudentProfile().subscribe(
      res => {
        this.studentDetails = res['student'];
      },
      err => {
        this.router.navigate(['/company']);
      }
    );

    this.studentService.getAllFavorites().subscribe(
      res => {
        this.favorites = res['favorites'];
        console.log(this.favorites);
      },
      err => {
      }
    );

  }

  goToEdit() {
    this.editSelected = !this.editSelected;
    this.initForm();
  }

  initForm() {
    const firstName = this.studentDetails.firstName;
    const lastName = this.studentDetails.lastName;
    const email = this.studentDetails.email;

    this.studentUpdateForm = new FormGroup({
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required),
      email: new FormControl(email, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.minLength(8))
    });

  }

  onSubmit(form) {
    this.studentService.updateStudent(form.value).subscribe(
      res => {
        window.location.reload();
      },
      err => {
        console.log("erreur");
      }
    )
  }

}
