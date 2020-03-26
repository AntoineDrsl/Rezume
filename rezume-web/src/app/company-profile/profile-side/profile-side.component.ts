import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';
import { CompanyProfileComponent } from '../company-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.css']
})
export class ProfileSideComponent implements OnInit {

  @Input() company;
  @Input() favorites;

  posY: number;
  posDetail;


  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {

  }

  onLogout() {
  this.companyService.deleteToken();
  this.router.navigate(['/login']);
  }

}
