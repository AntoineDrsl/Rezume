import { Component, OnInit } from '@angular/core';

import { JobService } from '../../shared/job.service';
import { StudentService } from '../../shared/student.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-selected',
  templateUrl: './job-selected.component.html',
  styleUrls: ['./job-selected.component.css']
})
export class JobSelectedComponent implements OnInit {

  jobDetails;
  studentDetails;
  showMessageError: boolean = false;

  buttonAdd: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private studentService: StudentService) { }

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

    addFavorite() {
    const id = this.route.snapshot.paramMap.get('id');

    this.studentService.addFavorite(id).subscribe(
      res => {
        // // console.log('Success');
        this.buttonAdd = false;
      },
      err => {
        // console.log('Err');
      }
    );
  }

  removeFavorite() {
    const id = this.route.snapshot.paramMap.get('id');

    this.studentService.removeFavorite(id).subscribe(
      res => {
        this.buttonAdd = true;
      },
      err => {

      }
    );
  }

  checkIfFavorite() {
    const id = this.route.snapshot.paramMap.get('id');

    this.studentService.getStudentProfile().subscribe(
      res => {
        this.studentDetails = res['student'];

        this.studentDetails.forEach(element => {
          if(element === id){
            this.buttonAdd = false;
          }
          else{
            this.buttonAdd = true;
          }
        });
      },
      err => {
        console.log('Student not found');
      }
    );
  }
}
