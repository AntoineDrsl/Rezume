import { Component, OnInit } from '@angular/core';
//Importation module pour formulaire
import { NgForm } from '@angular/forms';

//Importation Cv Service
import {CvService} from '../../../shared/cv.service';

@Component({
  selector: 'app-cv-update',
  templateUrl: './cv-update.component.html',
  styleUrls: ['./cv-update.component.css']
})
export class CvUpdateComponent implements OnInit {

  cvDetails;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(private cvService: CvService) { }

  ngOnInit() {

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res['cv'];
        // console.log(this.cvDetails);
      },
      err => {}
      );



    // this.cvService.selectedCV = {
    //   age: this.cvDetails.age,
    //   research: this.cvDetails.research,
    //   experience: this.cvDetails.experience,
    //   degree: this.cvDetails.degree
    // }

  }

  onSubmit(form: NgForm){
    // console.log(form.value)
    this.cvService.updateCV(form.value).subscribe(
      res => {
        console.log('coucou');
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        this.onReset(form);
      },
      err => {
        this.serverErrorMessages = "Une erreur est survenue";
      }
    )
  }


  // onReset(form: NgForm){
  //   this.cvService.selectedCV = {
  //     age: '',
  //     research: '',
  //     experience: '',
  //     degree: ''
  //   };
  //   form.onReset();

  // }


}
