//built-in imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//component imports
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { SignUpComponent } from './student/sign-up/sign-up.component';

//routes
import { AppRoutingModule } from './app-routing.module';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { SignInComponent } from './student/sign-in/sign-in.component';
import { StudentService } from './shared/student.service';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CvCreationComponent } from './cv-creation/cv-creation.component';
import { CvUpdateComponent } from './student-profile/cvUpdate/cv-update/cv-update.component';
import { CvViewComponent } from './student-profile/cv-view/cv-view.component';
import { GetAllCvComponent } from './get-all-cv/get-all-cv.component';
import { SelectedCvComponent } from './get-all-cv/selected-cv/selected-cv.component';
import { SignUpStudentComponent } from './student/sign-up/sign-up-student/sign-up-student.component';
import { SignUpCompanyComponent } from './student/sign-up/sign-up-company/sign-up-company.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    SignUpComponent,
    StudentProfileComponent,
    SignInComponent,
    CvCreationComponent,
    CvUpdateComponent,
    CvViewComponent,
    GetAllCvComponent,
    SelectedCvComponent,
    SignUpStudentComponent,
    SignUpCompanyComponent,
    CompanyProfileComponent,
    ErrorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  AuthGuard,
  StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
