import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { CvService } from '../shared/cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  studentDetails;
  cvDetails;
  serverErrorMessage: string;
  valid = false;

  constructor(private studentService: StudentService, private router: Router, private cvService: CvService) { }

  ngOnInit() {
    this.studentService.getStudentProfile().subscribe(
      res => {
        this.studentDetails = res['student'];
        this.valid = true;
      },
      err => {
        this.serverErrorMessage = 'Student Details couldn\'t be find, you will be redirected to another page.';
        setTimeout(() => this.router.navigate(['/companyprofile']), 1);
      }
    );

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res['cv'];
      },
      err => {}
    );
  }

  onLogout() {
    this.studentService.deleteToken();
    this.router.navigate(['/login']);
  }


}
