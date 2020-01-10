import { Component, OnInit } from '@angular/core';

import { JobService } from '../../shared/job.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-selected',
  templateUrl: './job-selected.component.html',
  styleUrls: ['./job-selected.component.css']
})
export class JobSelectedComponent implements OnInit {

  jobDetails;

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {

    const id: string = this.route.snapshot.paramMap.get('id');

    this.jobService.getSelectedJob(id).subscribe(
      res => {
        this.jobDetails = res['job'];
        console.log(this.jobDetails);
      },
      err => {
        console.log('Impossible de recup le job');
      }
    )

  }

}
