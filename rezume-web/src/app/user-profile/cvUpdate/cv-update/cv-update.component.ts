import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CvService } from '../../../shared/cv.service';

@Component({
  selector: 'app-cv-update',
  templateUrl: './cv-update.component.html',
  styleUrls: ['./cv-update.component.css']
})
export class CvUpdateComponent implements OnInit {

  cvDetails;
  coucou = "coucou";
  images;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  cvUpdateForm: FormGroup;

  get age() {
    return this.cvUpdateForm.get('age');
  }
  get research() {
    return this.cvUpdateForm.get('research');
  }

  constructor(private cvService: CvService, private router: Router) {}

  ngOnInit() {

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res['cv'];
      },
      err => {}
      );

    this.cvUpdateForm = new FormGroup({
      age: new FormControl(''),
      research: new FormControl(''),
      experiences: new FormArray([
          new FormControl('')
      ]),
      degrees: new FormArray([
        new FormControl('')
      ]),
      image: new FormControl('')
    });

  }

  defaultValues() {
    this.cvUpdateForm.setValue({age: this.cvDetails.age})
  }

  getCvDetails() {
    return this.cvDetails;
  }

  addExperience() {
    (<FormArray>this.cvUpdateForm.get('experiences')).push(new FormControl(''));
  }
  addDegree() {
    (<FormArray>this.cvUpdateForm.get('degrees')).push(new FormControl(''));
  }

  deleteExperience(index: number) {
    (<FormArray>this.cvUpdateForm.get('experiences')).removeAt(index)
  }
  deleteDegree(index: number) {
    (<FormArray>this.cvUpdateForm.get('degrees')).removeAt(index)
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(form){

    // Upload de l'image
    const formData = new FormData();
    formData.append('file', this.images);

    this.cvService.postFile(formData).subscribe(
      res => {
        this.showSuccessMessage = true;
      },
      err => {
        this.serverErrorMessages = "Une erreur est survenue";
      }
    );

    //Update bdd
    this.cvService.updateCV(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        setTimeout(() => this.router.navigate(['/userprofile']), 4000);
      },
      err => {
        this.serverErrorMessages = "Une erreur est survenue";
      }
    )
  }

}
