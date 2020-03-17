import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';
import { CompanyProfileComponent } from '../company-profile.component';

@Component({
  selector: 'app-profile-side',
  templateUrl: './profile-side.component.html',
  styleUrls: ['./profile-side.component.css']
})
export class ProfileSideComponent implements OnInit {

  @Input() company;

  constructor() { }

  ngOnInit() {


  }

}
