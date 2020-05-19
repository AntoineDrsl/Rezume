import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CvService } from '../shared/cv.service';
import { StudentService } from '../shared/student.service';
import { isEmpty } from 'rxjs/operators';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-cv-creation',
  templateUrl: './cv-creation.component.html',
  styleUrls: ['./cv-creation.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class CvCreationComponent implements OnInit {

  images;
  showSuccessMessage: boolean;
  serverErrorMessage: string;
  getCvErrorMessage: string;
  isCvCreated;
  valid = false;
  getCvCreated;

  cvForm: FormGroup;

  get research() {
    return this.cvForm.get('research');
  }

  constructor(private cvService: CvService, private studentService: StudentService, private router: Router) { }

  ngOnInit() {

    this.cvService.getCV().subscribe(
      res => {
        this.isCvCreated = res["cv"]

        if (this.isCvCreated.length === 0) {
          this.valid = true;
        } else {
          this.router.navigate(['/studentprofile']);
          this.valid = false;
        }
      },

      err => {

        this.getCvErrorMessage = 'Impossible de recuperer les données de la base de données';

      }
    )

    this.cvForm = new FormGroup({
      age: new FormControl('', Validators.required),
      description: new FormControl(''),
      research: new FormControl('', Validators.required),
      experiences: new FormArray([
        new FormControl('')
      ]),
      degrees: new FormArray([
        new FormGroup({
          degreeName: new FormControl(''),
          degreeDate: new FormControl(moment()),
          degreeSchool: new FormControl('')
        })
      ]),
      image: new FormControl('')
    });
  }

  getErrorMessage() {
  }

  addExperience() {
    if((<FormArray>this.cvForm.get('experiences')).length < 10) {
      (<FormArray>this.cvForm.get('experiences')).push(new FormControl(''));
    }
  }
  addDegree() {
    if((<FormArray>this.cvForm.get('degrees')).length < 10) {
      (<FormArray>this.cvForm.get('degrees')).push(new FormGroup({
        degreeName: new FormControl(''),
        degreeDate: new FormControl(moment()),
        degreeSchool: new FormControl('')
      }));
    }
  }

  deleteExperience(index: number) {
    if((<FormArray>this.cvForm.get('experiences')).length > 1) {
      (<FormArray>this.cvForm.get('experiences')).removeAt(index);
    }
  }
  deleteDegree(index: number) {
    console.log(<FormArray>this.cvForm.get('degrees'))
    if((<FormArray>this.cvForm.get('degrees')).length > 1) {
      (<FormArray>this.cvForm.get('degrees')).removeAt(index);
    }
  }

  //DEGREEDATE
  degreeYear(normalizedYear: Moment) {
    console.log(this.cvForm.get('degrees').value[1]);
    const ctrlValue = this.cvForm.get('degrees').value[1];
    ctrlValue.year(normalizedYear.year());
    this.cvForm.get('degrees').setValue(ctrlValue);
  }

  degreeMonth(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.cvForm.get('degrees').value;
    ctrlValue.month(normalizedMonth.month());
    this.cvForm.get('degrees').setValue(ctrlValue);
    datepicker.close();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(form) {

    // Upload de l'image
    const formData = new FormData();
    formData.append('file', this.images);

    this.cvService.postFile(formData).subscribe(
      res => {
        this.showSuccessMessage = true;
      },
      err => {
        this.serverErrorMessage = "Une erreur est survenue";
      }
    );

    // Stockage des infos dans la bdd

    this.cvService.postCV(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        this.getCvCreated = res["doc"];
        this.router.navigate(['/cvview']);

        form.reset();
      },
      err => {
        this.serverErrorMessage = "Une erreur est survenue";
      }
    )
  }

}
