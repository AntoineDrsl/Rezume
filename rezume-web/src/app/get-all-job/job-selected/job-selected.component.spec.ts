import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSelectedComponent } from './job-selected.component';

describe('JobSelectedComponent', () => {
  let component: JobSelectedComponent;
  let fixture: ComponentFixture<JobSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
