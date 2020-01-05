import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCvComponent } from './selected-cv.component';

describe('SelectedCvComponent', () => {
  let component: SelectedCvComponent;
  let fixture: ComponentFixture<SelectedCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
