import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-side-student',
  templateUrl: './post-side-student.component.html',
  styleUrls: ['./post-side-student.component.css']
})
export class PostSideStudentComponent implements OnInit {

  @Input() student;

  constructor() { }

  ngOnInit() {
  }

}
