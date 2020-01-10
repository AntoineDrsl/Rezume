import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CvService } from '../shared/cv.service';
import { StudentService } from '../shared/student.service';


@Component({
  selector: 'app-get-all-cv',
  templateUrl: './get-all-cv.component.html',
  styleUrls: ['./get-all-cv.component.css']
})
export class GetAllCvComponent implements OnInit {


  allCv;
  studentListDetails: string[] = [];
  studentDetails;
  showMessageError: boolean = false;

  constructor(private cvService: CvService, private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.cvService.getAllCV().subscribe(
      res => {
        this.allCv = res['cv'];
        // console.log(this.allCv);
        this.launchFunction();
      },
      err => {
        this.showMessageError = true;
        setTimeout(() => {this.router.navigate(['/companyprofile']);}, 1);
      }
      );
    }

    launchFunction() {

      const size: number = this.allCv.length;

      for (let i = 0; i < size; i++) {
        const id: string = this.allCv[i]._student;
        this.getInformations(id, i);
      }
    }


    getInformations(item, index) {

      this.studentService.getStudentProfileId(item).subscribe(
        res => {
          this.studentDetails = res['student'];
          this.studentListDetails.push(this.studentDetails);
          // console.log(this.studentListDetails);
        },
        err => {
          console.log('Erreur lors de la récupération des données');
        }
        )
      }

    }
