import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  valid = false;

  constructor(private studentService: StudentService, private router: Router, private _location: Location) { }

  ngOnInit() {
    if(this.studentService.isLoggedIn()) {
      this._location.back();
    } else {
      this.valid = true;
    }
  }

}
