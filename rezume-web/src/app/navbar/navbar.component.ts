import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/student.service';
import { MessageService } from '../shared/message.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  visitorInformation;

  isUnreadMessage: boolean;

  constructor(private studentService: StudentService, private messageService: MessageService) {
    setInterval(()=>this.reloadPage(), 1000);
  }

  ngOnInit() {

    this.visitorInformation = this.studentService.getStudentPayload();

    if(this.studentService.getStudentPayload() !== null) {
      this.messageService.getMessages().subscribe(
        res => {
          this.isUnreadMessage = res['isUnread'];
        }
      )
    }



  }

  reloadPage() {
    this.ngOnInit();
  }

}
