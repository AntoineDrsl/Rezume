import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { JobService } from '../shared/job.service';
import { CompanyService } from '../shared/company.service';

@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.css']
})
export class JobCreationComponent implements OnInit {

  images;
  showSuccessMessage: boolean;
  serverErrorMessage: string;
  currentJobId;
  companyDetails;
  valid = false;

  jobForm: FormGroup
  get sector() {
    return this.jobForm.get('sector');
  }
  get description() {
    return this.jobForm.get('description');
  }
  get experience() {
    return this.jobForm.get('experience');
  }

  constructor(private jobService: JobService, private companyService: CompanyService, private router: Router) { }

  ngOnInit() {

    this.companyService.getCompanyProfile().subscribe(
      res => {
        this.companyDetails = res['student'];
        this.valid = true;
      },
      err => {
        this.serverErrorMessage = 'Company Details couldn\'t be find, you will be redirected to another page.';
        this.router.navigate(['/studentprofile']);
      }
    );

    this.jobForm = new FormGroup({
      sector: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      degrees: new FormArray([
        new FormControl('')
      ]),
      image: new FormControl('', Validators.required)
    });
  }

  addDegree() {
    (<FormArray>this.jobForm.get('degrees')).push(new FormControl(''));
  }
  deleteDegree(index: number) {
    (<FormArray>this.jobForm.get('degrees')).removeAt(index);
  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(form) {

    // Stockage des infos dans la bdd
    this.jobService.postJob(form.value).subscribe(
      (res: any) => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 1000);
        setTimeout(() => this.router.navigate(['/companyprofile']), 1000);
        form.reset()

        // Upload de l'image
        const formData = new FormData();
        formData.append('file', this.images, res._id);

        this.jobService.postFile(formData).subscribe(
          res => {
            this.showSuccessMessage = true;
          },
          err => {
            this.serverErrorMessage = "Une erreur est survenue";
          }
        );

      },
      err => {
        this.serverErrorMessage = "Une erreur est survenue";
      }
    )
  }

}
