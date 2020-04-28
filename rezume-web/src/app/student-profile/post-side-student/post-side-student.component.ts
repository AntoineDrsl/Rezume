import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { PostService } from 'src/app/shared/post.service';

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
        this.posts = res['post'];
        console.log(this.posts);
      },
      err => {
        this.serverErrorMessage = 'Aucune entreprise suivie n\'a été trouvée';
      }
    );
  }

}
