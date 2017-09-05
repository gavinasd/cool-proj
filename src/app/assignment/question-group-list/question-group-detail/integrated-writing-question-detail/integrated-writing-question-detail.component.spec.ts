import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratedWritingQuestionDetailComponent } from './integrated-writing-question-detail.component';

describe('IntegratedWritingQuestionDetailComponent', () => {
  let component: IntegratedWritingQuestionDetailComponent;
  let fixture: ComponentFixture<IntegratedWritingQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratedWritingQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratedWritingQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
