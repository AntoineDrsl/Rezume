import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StudentService } from '../../shared/student.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  selectedValue: number = 0;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    if(this.studentService.isLoggedIn()) {
      this.router.navigateByUrl('/studentprofile');
    }
  }

  isSelected(number){
    this.selectedValue = number;
  }
}
