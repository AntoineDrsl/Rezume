import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
// Importation cvService
import { CvService } from '../../shared/cv.service';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

  cvDetails;


  constructor(private cvService: CvService, private router: Router, private _location: Location) { }

  ngOnInit() {

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res["cv"];
        console.log(this.cvDetails);
      },
      err => {

      }
    );

  }

  backToPage() {
    this._location.back();
  }


}
