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
  showMessageError: boolean= false;

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit() {

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res["cv"];
      },
      err => {
        this.showMessageError = true;
        setTimeout(() => this.router.navigate(['/studentprofile']), 2000);
      }
    );

  }




}
