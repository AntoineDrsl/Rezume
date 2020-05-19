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
import { MatSnackBar } from '@angular/material';

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
  errorMessage;

  cvForm: FormGroup;

  get research() {
    return this.cvForm.get('research');
  }
  get description() {
    return this.cvForm.get('description');
  }
  get experiences() {
    return <FormArray>this.cvForm.get('experiences');
  }
  get degrees() {
    return <FormArray>this.cvForm.get('degrees');
  }

  constructor(private cvService: CvService, private studentService: StudentService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    if(!(this.studentService.getStudentPayload().statut === 'student')) {
      this.router.navigate(['/company']);
    }

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
      description: new FormControl('', Validators.required),
      research: new FormControl('', Validators.required),
      experiences: new FormArray([
        new FormGroup({
          experienceName: new FormControl('', Validators.required),
          experienceCompany: new FormControl('', Validators.required),
          experienceStart: new FormControl(moment(), Validators.required),
          experienceEnd: new FormControl(moment(), Validators.required),
          experienceDescription: new FormControl('', Validators.required)
        })
      ]),
      degrees: new FormArray([
        new FormGroup({
          degreeName: new FormControl('', Validators.required),
          degreeDate: new FormControl(moment(), Validators.required),
          degreeSchool: new FormControl('', Validators.required)
        })
      ]),
      image: new FormControl('', Validators.required)
    });
  }

  addExperience() {
    if((<FormArray>this.cvForm.get('experiences')).length < 10) {
      (<FormArray>this.cvForm.get('experiences')).push(new FormGroup({
        experienceName: new FormControl('', Validators.required),
        experienceCompany: new FormControl('', Validators.required),
        experienceStart: new FormControl(moment(), Validators.required),
        experienceEnd: new FormControl(moment(), Validators.required),
        experienceDescription: new FormControl('', Validators.required)
      }));
    }
  }
  addDegree() {
    if((<FormArray>this.cvForm.get('degrees')).length < 10) {
      (<FormArray>this.cvForm.get('degrees')).push(new FormGroup({
        degreeName: new FormControl('', Validators.required),
        degreeDate: new FormControl(moment(), Validators.required),
        degreeSchool: new FormControl('', Validators.required)
      }));
    }
  }

  deleteExperience(index: number) {
    (<FormArray>this.cvForm.get('experiences')).removeAt(index);
  }
  deleteDegree(index: number) {
    (<FormArray>this.cvForm.get('degrees')).removeAt(index);
  }

  //Degree Date
  degreeYear(normalizedYear: Moment, index) {
    const ctrlValue = this.cvForm.get('degrees').value[index].degreeDate;
    ctrlValue.year(normalizedYear.year());
    (<FormGroup>(<FormArray>this.cvForm.get('degrees')).at(index)).controls.degreeDate.setValue(ctrlValue);
  }

  degreeMonth(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index) {
    const ctrlValue = this.cvForm.get('degrees').value[index].degreeDate;
    ctrlValue.month(normalizedMonth.month());
    (<FormGroup>(<FormArray>this.cvForm.get('degrees')).at(index)).controls.degreeDate.setValue(ctrlValue);
    datepicker.close();
  }

  //Experience start date
  experienceStartYear(normalizedYear: Moment, index) {
    const ctrlValue = this.cvForm.get('experiences').value[index].experienceStart;
    ctrlValue.year(normalizedYear.year());
    (<FormGroup>(<FormArray>this.cvForm.get('experiences')).at(index)).controls.experienceStart.setValue(ctrlValue);
  }

  experienceStartMonth(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index) {
    const ctrlValue = this.cvForm.get('experiences').value[index].experienceStart;
    ctrlValue.month(normalizedMonth.month());
    (<FormGroup>(<FormArray>this.cvForm.get('experiences')).at(index)).controls.experienceStart.setValue(ctrlValue);
    datepicker.close();
  }

  //Experience end date
  experienceEndYear(normalizedYear: Moment, index) {
    const ctrlValue = this.cvForm.get('experiences').value[index].experienceEnd;
    ctrlValue.year(normalizedYear.year());
    (<FormGroup>(<FormArray>this.cvForm.get('experiences')).at(index)).controls.experienceEnd.setValue(ctrlValue);
  }

  experienceEndMonth(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, index) {
    const ctrlValue = this.cvForm.get('experiences').value[index].experienceEnd;
    ctrlValue.month(normalizedMonth.month());
    (<FormGroup>(<FormArray>this.cvForm.get('experiences')).at(index)).controls.experienceEnd.setValue(ctrlValue);
    datepicker.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(form) {

    if(form.valid) {

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

    } else {
      this.errorMessage = "Veuillez remplir tous les champs";
      this.openSnackBar(this.errorMessage, 'Fermer');
    }

  }

}
