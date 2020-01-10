import { Component, OnInit } from '@angular/core';

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

  constructor(private jobService: JobService, private companyService: CompanyService) { }

  ngOnInit() {

    this.jobService.getAllJob().subscribe(
      res => {
        this.allJob = res['job'];
        this.launchFunction();
        // console.log(this.allJob);
      },
      err => {

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