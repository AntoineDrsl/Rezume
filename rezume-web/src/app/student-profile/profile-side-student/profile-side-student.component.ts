import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';
import { Router } from '@angular/router';
import { CvService } from 'src/app/shared/cv.service';



@Component({
  selector: 'app-profile-side-student',
  templateUrl: './profile-side-student.component.html',
  styleUrls: ['./profile-side-student.component.css']
})
export class ProfileSideStudentComponent implements OnInit {

  @Input() student;
  @Input() favorites;

  isCvCreated;
  showBtn: boolean;

  constructor(private companyService: CompanyService, private router: Router, private cvService: CvService) { }

  ngOnInit() {
    console.log(this.favorites);
    this.cvService.getCV().subscribe(
      res => {
        this.isCvCreated = res['cv'];

        if (this.isCvCreated.length === 0) {
          this.showBtn = true;
        } else {
          this.showBtn = false;
        }
      },

      err => {

      }
    );
  }

  onLogout() {
    this.companyService.deleteToken();
    this.router.navigate(['/login']);
  }

}
