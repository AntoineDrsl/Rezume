import { CompanyService } from 'src/app/shared/company.service';
import { Router } from '@angular/router';
import { StudentService } from './../shared/student.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user;
  socket;
  userInfos;
  companies;
  students;
  textContent;

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

        this.studentService.getStudentProfile().subscribe(
          res => {
            this.user = res['student'];
          }
        );

        // this.companyService.getCompanies().subscribe(
        //   res => {
        //     this.companies = res['companies'];
        //   }
        // );

        // RECUPERER LES COMPANIES EN FAVORIS

        this.studentService.getAllFavorites().subscribe(
          res => {
            this.companies = res['favorites'];
            console.log(this.companies);
          }
        );


      } else if(this.userInfos.statut == "company") {

        this.companyService.getCompany().subscribe(
          res => {
            this.user = res['company'];
          }
        );

        // this.studentService.getStudents().subscribe(
        //   res => {
        //     this.students = res['students'];
        //   }
        // )

        // RECUPERER LES STUDENTS EN FAVORIS
        this.companyService.getAllFavorites().subscribe(
          res => {
            this.students = res['favorites'];
          }
        );


      } else {
        this.router.navigateByUrl('/login');
      }
    })

    this.socket.on('emitChannel', (channel) => {

      if(channel.previousChannel) {
        document.getElementById(channel.previousChannel).classList.remove('inChannel');
      }
      document.getElementById(channel.newChannel).classList.add('inChannel');
    })

    this.socket.on('newMessageAll', (content, sender) => {
      this.createMessage('newMessageAll', {message: content, sender: sender});
    })

    this.socket.on('oldMessages', (messages) => {
      messages.forEach(message => {
        if(message.sender === this.user._id) {
          this.createMessage('oldMessagesMe', message.content);
        } else {
          this.createMessage('oldMessages', {message: message.content, sender: message.sender_name});
        }
      });
    })

    document.getElementById('chatForm').addEventListener('submit', (e) => {

      e.preventDefault();

      if(this.textContent.length > 0) {
        const sender = this.user._id;
        const status = this.userInfos.statut;

        this.socket.emit('newMessage', this.textContent, sender, status);

        this.createMessage('newMessageMe', this.textContent);

        this.textContent = '';
      }

    })


  }

  joinRoom(elementId) {
    document.getElementById('msgContainer').innerHTML = '';
    if(this.userInfos.statut == "student") {
      this.socket.emit('changeChannel', {studentId: this.user._id, companyId: elementId, status: 'student'});
    } else if (this.userInfos.statut == "company") {
      this.socket.emit('changeChannel', {companyId: this.user._id, studentId: elementId, status: 'company'});
    }
  }

  createMessage(element, content) {
    const newContainer = document.createElement('div');
    const newSpan = document.createElement('span');
    const newElement = document.createElement('div');

    switch(element) {

      case 'newMessageMe':
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content;
        document.getElementById('msgContainer').appendChild(newElement);
        break;

      case 'newMessageAll':
        newSpan.innerHTML = content.sender;
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content.message;
        newContainer.appendChild(newSpan);
        newContainer.appendChild(newElement);
        newContainer.classList.add('msgItemContainer');
        document.getElementById('msgContainer').appendChild(newContainer);
        break;

      case 'oldMessages':
        newSpan.innerHTML = content.sender;
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content.message;
        newContainer.appendChild(newSpan);
        newContainer.appendChild(newElement);
        newContainer.classList.add('msgItemContainer');
        document.getElementById('msgContainer').appendChild(newContainer);
        break;

      case 'oldMessagesMe':
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content;
        document.getElementById('msgContainer').appendChild(newElement);
        break;

    }
  }


  deleteChannel(elementId){
    this.companyService.removeFavorite(elementId).subscribe(
      res => {
        window.location.reload();
      }
    )
  }

}
