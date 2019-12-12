import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CvService } from '../shared/cv.service';

@Component({
  selector: 'app-cv-creation',
  templateUrl: './cv-creation.component.html',
  styleUrls: ['./cv-creation.component.css']
})
export class CvCreationComponent implements OnInit {
  images
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private cvService: CvService) { }

  ngOnInit() {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(form : NgForm) {

    //Upload de l'image
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

    //Stockage des infos dans la bdd
    this.cvService.postCV(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        this.serverErrorMessages = "Une erreur est survenue";
      }
    )
  }
  
  resetForm(form: NgForm) {
    this.cvService.selectedCV = {
      age: '',
      research: '',
      experience: '',
      degree: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
