import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CvService } from '../shared/cv.service';
import { StudentService } from '../shared/student.service';

@Component({
  selector: 'app-cv-creation',
  templateUrl: './cv-creation.component.html',
  styleUrls: ['./cv-creation.component.css']
})
export class CvCreationComponent implements OnInit {

  images;
  showSuccessMessage: boolean;
  serverErrorMessage: string;
  studentDetails;
  valid = false;

  cvForm: FormGroup;
  get age() {
    return this.cvForm.get('age');
  }
  get research() {
    return this.cvForm.get('research');
  }

  constructor(private cvService: CvService, private studentService: StudentService, private router: Router) { }

  ngOnInit() {

    this.studentService.getStudentProfile().subscribe(
      res => {
        this.studentDetails = res['student'];
        this.valid = true;
      },
      err => {
        this.serverErrorMessage = 'Student Details couldn\'t be find, you will be redirected to another page.';
        this.router.navigate(['/companyprofile']);
      }
    );

    this.cvForm = new FormGroup({
      age: new FormControl('', Validators.required),
      research: new FormControl('', Validators.required),
      experiences: new FormArray([
        new FormControl('')
      ]),
      degrees: new FormArray([
        new FormControl('')
      ]),
      image: new FormControl('')
    });
  }

  addExperience() {
    (<FormArray>this.cvForm.get('experiences')).push(new FormControl(''));
  }
  addDegree() {
    (<FormArray>this.cvForm.get('degrees')).push(new FormControl(''));
  }

  deleteExperience(index: number) {
    (<FormArray>this.cvForm.get('experiences')).removeAt(index);
  }
  deleteDegree(index: number) {
    (<FormArray>this.cvForm.get('degrees')).removeAt(index);
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

    console.log(form.value, formData);

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
        setTimeout(() => this.showSuccessMessage = false, 3000);
        setTimeout(() => this.router.navigate(['/studentprofile']), 1000);

        form.reset()
      },
      err => {
        this.serverErrorMessage = "Une erreur est survenue";
      }
    )
  }

}
