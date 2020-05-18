import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/shared/post.model';

@Component({
  selector: 'app-post-side-student',
  templateUrl: './post-side-student.component.html',
  styleUrls: ['./post-side-student.component.css']
})
export class PostSideStudentComponent implements OnInit {

  @Input() student;
  posts;
  serverErrorMessage;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllPost().subscribe(
      res => {
        this.posts = res['posts'];
      },
      err => {
      }
    );
  }

}
