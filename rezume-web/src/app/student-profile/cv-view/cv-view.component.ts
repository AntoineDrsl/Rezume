import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Importation cvService
import { CvService } from '../../shared/cv.service';

@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {

  cvDetails;
  serverErrorMessage;
  valid = false;

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit() {

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res["cv"];
        this.valid = true;
      },
      err => {
        this.serverErrorMessage = 'Your CV can\'t be loaded';
        this.router.navigate(['/companyprofile']);
      }
    );

  }




}
