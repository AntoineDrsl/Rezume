import { CompanyService } from 'src/app/shared/company.service';
import { Router } from '@angular/router';
import { StudentService } from './../shared/student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket;
  userInfos;
  companies;
  students;

  constructor
  (
    private http: HttpClient,
    private studentService: StudentService,
    private companyService: CompanyService,
    private router: Router
  )
  {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.userInfos = this.studentService.getStudentPayload();

    this.socket.on('newUser', () => {

      if(this.userInfos.statut == "student") {
        this.companyService.getCompanies().subscribe(
          res => {
            this.companies = res['companies'];
          }
        )

      } else if(this.userInfos.statut == "company") {
        this.studentService.getStudents().subscribe(
          res => {
            this.students = res['students'];
          }
        )

      } else {
        this.router.navigateByUrl('/login');
      }
    })
  }

}
