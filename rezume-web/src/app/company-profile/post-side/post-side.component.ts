import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-side',
  templateUrl: './post-side.component.html',
  styleUrls: ['./post-side.component.css']
})
export class PostSideComponent implements OnInit {

 @Input() company;

  showMessageSuccess: boolean = false;
  companyPost;


  constructor(private postService: PostService) { }

  ngOnInit() {


  }


  onSubmit(form: NgForm){

    console.log(form.value);

    this.postService.addPost(form.value).subscribe(
      res => {
        form.reset();
        this.showMessageSuccess = true;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      err => {
        console.log('non');
      }
    )
  }
}
