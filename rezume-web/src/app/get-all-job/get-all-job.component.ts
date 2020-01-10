import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobService } from '../shared/job.service';
import { CompanyService } from '../shared/company.service';

@Component({
  selector: 'app-get-all-job',
  templateUrl: './get-all-job.component.html',
  styleUrls: ['./get-all-job.component.css']
})
export class GetAllJobComponent implements OnInit {

  allJob;
  companyListDetails: string[] = [];
  companyDetails;

  showMessageError: boolean = false;

  constructor(private jobService: JobService, private companyService: CompanyService, private router: Router) { }

  ngOnInit() {

    this.jobService.getAllJob().subscribe(
      res => {
        this.allJob = res['job'];
        this.launchFunction();
        // console.log(this.allJob);
      },
      err => {
        this.showMessageError = true
        setTimeout(() => {this.router.navigate(['/studentprofile']);}, 1500);
      }
    )

  }



  launchFunction(){
    const size: number = this.allJob.length;

    for (let i = 0; i < size; i++) {
      const id: string = this.allJob[i]._company;
      this.getInformations(id);
    }
  }

  getInformations(item) {
    this.companyService.getCompanyProfileId(item).subscribe(
      res => {
        this.companyDetails = res['company'];
        this.companyListDetails.push(this.companyDetails);
        console.log(this.companyListDetails);
      },
      err => {
        console.log('erreur');
      }
    );
  }

}
