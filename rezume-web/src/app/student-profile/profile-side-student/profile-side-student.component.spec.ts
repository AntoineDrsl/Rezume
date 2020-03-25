import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSideStudentComponent } from './profile-side-student.component';

describe('ProfileSideStudentComponent', () => {
  let component: ProfileSideStudentComponent;
  let fixture: ComponentFixture<ProfileSideStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSideStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSideStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
