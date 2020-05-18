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

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.socket.on('coucou', () => {
      console.log('coucou');
    })
  }

}
