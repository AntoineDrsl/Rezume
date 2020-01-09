import { Component, OnInit } from '@angular/core';

import { CvService } from '../shared/cv.service';
import { StudentService } from '../shared/student.service';


@Component({
  selector: 'app-get-all-cv',
  templateUrl: './get-all-cv.component.html',
  styleUrls: ['./get-all-cv.component.css']
})
export class GetAllCvComponent implements OnInit {


  allCv;
  userListDetails: string[] = [];
  userDetails;


  constructor(private cvService: CvService, private studentService: StudentService) { }

  ngOnInit() {
    this.cvService.getAllCV().subscribe(
      res => {
        this.allCv = res['cv'];
        // console.log(this.allCv);
        this.launchFunction();
      },
      err => {}
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
          this.userDetails = res['student'];
          this.userListDetails.push(this.userDetails);
          console.log(this.userListDetails);
        },
        err => {
          console.log('Erreur');
        }
        )
      }

    }
