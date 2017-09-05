import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentWritingQuestionDetailComponent } from './independent-writing-question-detail.component';

describe('IndependentWritingQuestionDetailComponent', () => {
  let component: IndependentWritingQuestionDetailComponent;
  let fixture: ComponentFixture<IndependentWritingQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentWritingQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentWritingQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
