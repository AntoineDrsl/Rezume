import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-side',
  templateUrl: './post-side.component.html',
  styleUrls: ['./post-side.component.css']
})
export class PostSideComponent implements OnInit {

  showMessageSuccess: boolean = false;
  companyPost;


  constructor(private postService: PostService) { }

  ngOnInit() {

    this.postService.getCompanyPost().subscribe(
      res => {
        this.companyPost = res['post'];
        console.log(this.companyPost);
      },

      err => {
        console.log('Probleme');
      }
    )

  }


  onSubmit(form: NgForm){

    console.log(form.value);

    this.postService.addPost(form.value).subscribe(
      res => {
        form.reset();
        this.showMessageSuccess = true;
        setTimeout(() => {
          this.showMessageSuccess = false;
        }, 2000);
      },
      err => {
        console.log('non');
      }
    )
  }
}
