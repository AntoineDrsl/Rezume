import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-side-student',
  templateUrl: './profile-side-student.component.html',
  styleUrls: ['./profile-side-student.component.css']
})
export class ProfileSideStudentComponent implements OnInit {

  @Input() student;
  @Input() favorites;

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.companyService.deleteToken();
    this.router.navigate(['/login']);
    }

}
