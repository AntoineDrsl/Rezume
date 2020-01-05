import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { CvService } from '../shared/cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails;
  cvDetails;
  serverErrorMessage: string;

  constructor(private userService: UserService, private router: Router, private cvService: CvService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        this.serverErrorMessage = 'User Details couldn\'t be find, you will be redirected to another page.';
        setTimeout(() => this.router.navigate(['/cvview']), 3000);
      }
    );

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res['cv'];
      },
      err => {}
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


}
