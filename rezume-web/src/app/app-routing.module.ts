import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { CvCreationComponent } from './cv-creation/cv-creation.component';
import { CvUpdateComponent } from './user-profile/cvUpdate/cv-update/cv-update.component';
import { CvViewComponent } from './user-profile/cv-view/cv-view.component';
import { GetAllCvComponent } from './get-all-cv/get-all-cv.component';

export const routes: Routes = [
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
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
    path: '', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
