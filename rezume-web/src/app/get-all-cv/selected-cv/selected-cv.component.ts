import { Component, OnInit } from '@angular/core';

import { CvService } from '../../shared/cv.service';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-cv',
  templateUrl: './selected-cv.component.html',
  styleUrls: ['./selected-cv.component.css']
})
export class SelectedCvComponent implements OnInit {

  cvDetails;

  constructor(private route: ActivatedRoute, private cvService: CvService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.cvService.getSelectedCV(id).subscribe(
      res => {
        this.cvDetails = res["cv"];
        console.log(this.cvDetails);
      },
      err => {

      }
    );
    // console.log(id);
  }

}
