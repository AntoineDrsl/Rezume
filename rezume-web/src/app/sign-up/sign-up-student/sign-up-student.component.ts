import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HashtagService } from "src/app/shared/hashtag.service";
import { Hashtag } from "src/app/shared/hashtag.model";
import { MatStepper } from "@angular/material/stepper";
import * as moment from "moment";

import { StudentService } from "../../shared/student.service";

@Component({
  selector: "app-sign-up-student",
  templateUrl: "./sign-up-student.component.html",
  styleUrls: ["./sign-up-student.component.css"],
})
export class SignUpStudentComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  allCompetences: string[] = [];
  FormStepId: number = 1;
  secondStepError: boolean = false;
  showErrFname: boolean = false;
  showErrLname: boolean = false;
  showErrBday: boolean = false;

  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private hashtagService: HashtagService
  ) {}

  ngOnInit() {
    const date = new Date();
    console.log(date);
    this.hashtagService.getAllHashtag().subscribe(
      (res) => {
        const hashtagResponse = res["hashtag"];

        hashtagResponse.forEach((hashtag) => {
          console.log("nom: " + hashtag.name);
          this.allCompetences.push(hashtag.name);
        });
        console.log("compétences : " + this.allCompetences);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkFirstStep(stepper: MatStepper) {
    if (
      this.studentService.selectedStudent.firstName == "" ||
      this.studentService.selectedStudent.lastName == ""
      ||
      this.studentService.selectedStudent.birthDate == ""
    ) {
      if (this.studentService.selectedStudent.firstName == "") {
        this.showErrFname = true;
      }
      if (this.studentService.selectedStudent.lastName == "") {
        this.showErrLname = true;
      }
      if (this.studentService.selectedStudent.birthDate == "") {
        this.showErrBday = true;
      }
    } else {
      this.stepper.next();
      this.FormStepId++;
    }
  }

  onSubmit(form: NgForm) {
    this.secondStepError = true;
    var formatBirthDate = moment(
      this.studentService.selectedStudent.birthDate
    ).format("DD/MM/YYYY");
    form.value.birthDate = formatBirthDate;
    console.log(form.value);

    this.studentService.postStudent(form.value).subscribe(
      (res) => {
        this.showSuccessMessage = true;
        setTimeout(() => (this.showSuccessMessage = false), 4000);
        this.resetForm(form);
        // setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      (err) => {
        if (err.status == 422) {
          this.serverErrorMessages = err.error.join("<br/>");
        } else {
          this.serverErrorMessages = "Une erreur est survenue";
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.studentService.selectedStudent = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthDate: "",
      competencies: [],
      password: "",
      confirmPassword: "",
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }
}
