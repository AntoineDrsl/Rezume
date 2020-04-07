import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-cv-two',
  templateUrl: './selected-cv-two.component.html',
  styleUrls: ['./selected-cv-two.component.css']
})
export class SelectedCvTwoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    const id = JSON.stringify(this.route.snapshot.paramMap.get('id'));
    console.log(id);
  }

}
