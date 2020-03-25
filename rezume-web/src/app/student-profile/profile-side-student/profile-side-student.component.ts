import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-side-student',
  templateUrl: './profile-side-student.component.html',
  styleUrls: ['./profile-side-student.component.css']
})
export class ProfileSideStudentComponent implements OnInit {

  @Input() student;
  @Input() favorites;

  constructor() { }

  ngOnInit() {
  }

}
