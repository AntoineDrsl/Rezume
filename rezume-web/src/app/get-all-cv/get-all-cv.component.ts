import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CvService } from '../shared/cv.service';

@Component({
  selector: 'app-get-all-cv',
  templateUrl: './get-all-cv.component.html',
  styleUrls: ['./get-all-cv.component.css']
})
export class GetAllCvComponent implements OnInit {


  allCv: {_id: string, research: string, updatedAt: Date}[];
  showMessageError: boolean = false;

  constructor(private cvService: CvService, private location: Location) { }

  ngOnInit() {
    this.cvService.getAllCV().subscribe(
      res => {
        this.allCv = res['cv'];
      },
      err => {
        this.showMessageError = true;
        setTimeout(() => this.location.back(), 1000);
      }
    );

  }




}
