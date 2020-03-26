import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSideStudentComponent } from './post-side-student.component';

describe('PostSideStudentComponent', () => {
  let component: PostSideStudentComponent;
  let fixture: ComponentFixture<PostSideStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSideStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSideStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
