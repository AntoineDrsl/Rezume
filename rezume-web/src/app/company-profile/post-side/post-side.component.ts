import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-side',
  templateUrl: './post-side.component.html',
  styleUrls: ['./post-side.component.css']
})
export class PostSideComponent implements OnInit {

 @Input() company;

  showMessageSuccess: boolean = false;
  showImgMessageSuccess: boolean = false;

  companyPost;

  addPost: FormGroup;
  images;


  constructor(private postService: PostService) { }

  ngOnInit() {
    this.addPost = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      image: new FormControl('')
    });

  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(form: NgForm) {


    // Upload de l'image
    const formData = new FormData();
    formData.append('file', this.images);

    console.log(form.value, formData);

    this.postService.postFile(formData).subscribe(
      res => {
        this.showImgMessageSuccess = true;
      },
      err => {
        console.log('pas upload');
      }
    );

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
