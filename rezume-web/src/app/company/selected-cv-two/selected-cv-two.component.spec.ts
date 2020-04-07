import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCvTwoComponent } from './selected-cv-two.component';

describe('SelectedCvTwoComponent', () => {
  let component: SelectedCvTwoComponent;
  let fixture: ComponentFixture<SelectedCvTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCvTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCvTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
