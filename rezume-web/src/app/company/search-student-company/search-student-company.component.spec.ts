import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStudentCompanyComponent } from './search-student-company.component';

describe('SearchStudentCompanyComponent', () => {
  let component: SearchStudentCompanyComponent;
  let fixture: ComponentFixture<SearchStudentCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStudentCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStudentCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
