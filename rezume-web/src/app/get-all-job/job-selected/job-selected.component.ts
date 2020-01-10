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
  showMessageError: boolean = false;

  constructor(private route: ActivatedRoute, private jobService: JobService, private router: Router) { }

  ngOnInit() {

    const id: string = this.route.snapshot.paramMap.get('id');

    this.jobService.getSelectedJob(id).subscribe(
      res => {
        this.jobDetails = res['job'];
        console.log(this.jobDetails);
      },
      err => {
        this.showMessageError = true
        setTimeout(() => {this.router.navigate(['/job']);}, 1500);
      }
    )

  }

}
