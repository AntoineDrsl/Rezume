import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { CvCreationComponent } from './cv-creation/cv-creation.component';
import { CvUpdateComponent } from './student-profile/cvUpdate/cv-update/cv-update.component';
import { CvViewComponent } from './student-profile/cv-view/cv-view.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchStudentCompanyComponent } from './company/search-student-company/search-student-company.component';
import { SelectedCvTwoComponent } from './company/selected-cv-two/selected-cv-two.component';
import { StudentDetailsComponent } from './student-profile/student-details/student-details.component';
import { ChatComponent } from './chat/chat.component';


export const routes: Routes = [
  {
    path: 'login', component: SignInComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'student', component: StudentProfileComponent, canActivate: [AuthGuard]
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
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'companydetails', component: CompanyDetailComponent, canActivate: [AuthGuard]
  },
  {
    path: 'studentdetails', component: StudentDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cvstudent/:id', component: SelectedCvTwoComponent, canActivate: [AuthGuard]
  },
  {
    path: 'chat', component: ChatComponent,canActivate: [AuthGuard]
  },



  // Pour CREATION COMPONENTS
  {
    path: 'navbar', component: NavbarComponent
  },
  {
    path: 'search', component: SearchStudentCompanyComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
