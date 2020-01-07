import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JobService } from '../shared/job.service';

@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.css']
})
export class JobCreationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
