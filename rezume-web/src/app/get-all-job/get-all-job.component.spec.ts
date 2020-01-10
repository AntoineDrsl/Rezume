import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllJobComponent } from './get-all-job.component';

describe('GetAllJobComponent', () => {
  let component: GetAllJobComponent;
  let fixture: ComponentFixture<GetAllJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
