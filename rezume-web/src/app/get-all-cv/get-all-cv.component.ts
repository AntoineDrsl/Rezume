import { Component, OnInit } from '@angular/core';

import { CvService } from '../shared/cv.service';

@Component({
  selector: 'app-get-all-cv',
  templateUrl: './get-all-cv.component.html',
  styleUrls: ['./get-all-cv.component.css']
})
export class GetAllCvComponent implements OnInit {


  allCv: {_id: string, research: string, updatedAt: Date}[];

  constructor(private cvService: CvService) { }

  ngOnInit() {
    this.cvService.getAllCV().subscribe(
      res => {
        this.allCv = res['cv'];
        // console.log(this.allCv);
      },
      err => {}
    );

  }




}
