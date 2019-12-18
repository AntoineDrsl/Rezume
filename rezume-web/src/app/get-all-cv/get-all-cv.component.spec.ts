import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCvComponent } from './get-all-cv.component';

describe('GetAllCvComponent', () => {
  let component: GetAllCvComponent;
  let fixture: ComponentFixture<GetAllCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
