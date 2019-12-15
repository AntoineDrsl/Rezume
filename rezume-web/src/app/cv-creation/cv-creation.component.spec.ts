import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCreationComponent } from './cv-creation.component';

describe('CvCreationComponent', () => {
  let component: CvCreationComponent;
  let fixture: ComponentFixture<CvCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
