import { Component, OnInit } from '@angular/core';

// Importation cvService
import { CvService } from '../../shared/cv.service';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

  cvDetails;

  constructor(private cvService: CvService) { }

  ngOnInit() {

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res["cv"];
        // console.log(this.cvDetails);
      },
      err => {

      }
    );

  }




}
