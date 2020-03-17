import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSideComponent } from './post-side.component';

describe('PostSideComponent', () => {
  let component: PostSideComponent;
  let fixture: ComponentFixture<PostSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
