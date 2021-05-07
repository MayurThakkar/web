import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingDescriptionComponent } from './posting-description.component';

describe('PostingDescriptionComponent', () => {
  let component: PostingDescriptionComponent;
  let fixture: ComponentFixture<PostingDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostingDescriptionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
