import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvUpdateComponent } from './cv-update.component';

describe('CvUpdateComponent', () => {
  let component: CvUpdateComponent;
  let fixture: ComponentFixture<CvUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
