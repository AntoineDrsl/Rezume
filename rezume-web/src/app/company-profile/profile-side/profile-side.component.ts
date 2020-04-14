import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';
import { CompanyProfileComponent } from '../company-profile.component';
import { Router } from '@angular/router';
import { CvService } from 'src/app/shared/cv.service';

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
  cvId;


  constructor(private companyService: CompanyService, private router: Router, private cvService: CvService) { }

  ngOnInit() {

  }

  onLogout() {
  this.companyService.deleteToken();
  this.router.navigate(['/login']);
  }

  getCvId(index) {
    this.cvService.getSelectedCvStudent(this.favorites[index]._id).subscribe(
      res => {
        this.cvId = res["cv"];
        this.router.navigate(['/cvstudent/' + this.cvId._id]);
      },
      err => {
        console.log('Pas id');
      }
    )
  }
}
