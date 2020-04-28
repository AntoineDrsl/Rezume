import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  visitorInformation;

  constructor(private studentService: StudentService) { }

  ngOnInit() {

    this.visitorInformation = this.studentService.getStudentPayload();


  }

}
