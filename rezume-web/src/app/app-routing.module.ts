import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { SignUpComponent } from './student/sign-up/sign-up.component';
import { SignInComponent } from './student/sign-in/sign-in.component'
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { CvCreationComponent } from './cv-creation/cv-creation.component';
import { CvUpdateComponent } from './student-profile/cvUpdate/cv-update/cv-update.component';
import { CvViewComponent } from './student-profile/cv-view/cv-view.component';
import { GetAllCvComponent } from './get-all-cv/get-all-cv.component';
import { SelectedCvComponent } from './get-all-cv/selected-cv/selected-cv.component';


export const routes: Routes = [
  {
    path: 'signup', component: StudentComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: StudentComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'studentprofile', component: StudentProfileComponent, canActivate: [AuthGuard]
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
    path: 'cv', component: GetAllCvComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cvview/:id', component: SelectedCvComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
