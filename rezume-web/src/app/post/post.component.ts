import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../shared/post.service';




@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  // Variables
  allPost;
  showMessageError: Boolean;

  constructor(private route: Router, private postservice: PostService) { }

  ngOnInit() {

    this.postservice.getAllPost().subscribe(
      res => {
        this.allPost = res['post'];
        console.log(this.allPost);
      },

      err => {
        this.showMessageError = true;
      }
    )

  }

}
