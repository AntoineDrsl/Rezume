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

  constructor(private userService: UserService, private router: Router, private cvService: CvService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {}
    );

    this.cvService.getCV().subscribe(
      res => {
        this.cvDetails = res['cv'];
        console.log(this.cvDetails);
      },
      err => {}
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


}
