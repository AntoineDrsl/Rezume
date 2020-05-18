import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CvService } from '../shared/cv.service';
import { StudentService } from '../shared/student.service';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-cv-creation',
  templateUrl: './cv-creation.component.html',
  styleUrls: ['./cv-creation.component.css']
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
  get age() {
    return this.cvForm.get('age');
  }
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
        new FormControl('')
      ]),
      image: new FormControl('')
    });
  }



  getErrorMessage() {
    if (this.age.hasError('required')) {
      return 'Veuillez entrer un âge';
    }
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
