import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoReviewPlayerComponent } from './tpo-review-player.component';

describe('TpoReviewPlayerComponent', () => {
  let component: TpoReviewPlayerComponent;
  let fixture: ComponentFixture<TpoReviewPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoReviewPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoReviewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
