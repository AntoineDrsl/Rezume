import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { CvService } from '../shared/cv.service';
import { Router } from '@angular/router';

import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  studentDetails;
  favorites;
  cvDetails;
  serverErrorMessage: string;
  valid = false;

  options: AnimationOptions = {
    path: '/assets/lottie/data.json',
    loop: true,
    autoplay: true
  };

  animationCreated(animationItem: AnimationItem): void {
    animationItem.setSpeed(0.5);
  }

  constructor(private studentService: StudentService, private router: Router, private cvService: CvService) { }

  ngOnInit() {

    if(!(this.studentService.getStudentPayload().statut === 'student')) {
      this.router.navigate(['/company']);
    }

    this.studentService.getStudentProfile().subscribe(
      res => {
        this.studentDetails = res['student'];
        this.valid = true;
      },
      err => {
        this.serverErrorMessage = "L'étudiant n'a pas été trouvé";
      }
    );

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res['cv'];
      },
      err => {}
    );

    this.studentService.getAllFavorites().subscribe(
      res => {
        this.favorites = res['favorites'];
        console.log(this.favorites);
      },
      err => {
        this.serverErrorMessage = "Aucun favoris n'a été trouvé";
      }
    );
  }

  onLogout() {
    this.studentService.deleteToken();
    this.router.navigate(['/login']);
  }


}
