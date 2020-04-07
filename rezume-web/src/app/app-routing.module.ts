import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component'
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { CvCreationComponent } from './cv-creation/cv-creation.component';
import { CvUpdateComponent } from './student-profile/cvUpdate/cv-update/cv-update.component';
import { CvViewComponent } from './student-profile/cv-view/cv-view.component';
import { JobCreationComponent } from './job-creation/job-creation.component';
import { GetAllCvComponent } from './get-all-cv/get-all-cv.component';
import { SelectedCvComponent } from './get-all-cv/selected-cv/selected-cv.component';
import { GetAllJobComponent } from './get-all-job/get-all-job.component';
import { JobSelectedComponent } from './get-all-job/job-selected/job-selected.component';
import { PostComponent } from './post/post.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentDetailsComponent } from './student-profile/student-details/student-details.component';

export const routes: Routes = [
  // {
  //   path: 'signup', component: StudentComponent,
  //   children: [{ path: '', component: SignUpComponent }]
  // },
  // {
  //   path: 'login', component: StudentComponent,
  //   children: [{ path: '', component: SignInComponent }]
  // },
  {
    path: 'login', component: SignInComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'studentprofile', component: StudentProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'company', component: CompanyProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cvcreation', component: CvCreationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cvupdate', component: CvUpdateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cvview', component: CvViewComponent, canActivate: [AuthGuard]
  },
  {
    path: 'jobcreation', component: JobCreationComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cv', component: GetAllCvComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cvview/:id', component: SelectedCvComponent, canActivate: [AuthGuard]
  },
  {
    path: 'job', component: GetAllJobComponent, canActivate: [AuthGuard]
  },
  {
    path: 'job/:id', component: JobSelectedComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'post', component: PostComponent
  },
  {
    path: 'companydetails', component: CompanyDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'studentdetails', component: StudentDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'navbar', component: NavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
