import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
// Importation cvService
import { CvService } from '../../shared/cv.service';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

  cvDetails;
  noCv: boolean = true;

  constructor(private cvService: CvService, private router: Router, private _location: Location, private studentService: StudentService) { }

  ngOnInit() {

    if(!(this.studentService.getStudentPayload().statut === 'student')) {
      this.router.navigate(['/company']);
    }

    this.cvService.getCV().subscribe(
      res => {
        if(res["cv"].length === 0 ) {
          this.noCv = true;
          setTimeout(() => {
            this.router.navigateByUrl('/cvcreation');
          }, 4000);
        } else {
          this.noCv = false;
          this.cvDetails = res["cv"];
        }
      },
      err => {

      }
    );

  }

  backToPage() {
    this._location.back();
  }


}
