import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoSpeakingQuestionDetailComponent } from './tpo-speaking-question-detail.component';

describe('TpoSpeakingQuestionDetailComponent', () => {
  let component: TpoSpeakingQuestionDetailComponent;
  let fixture: ComponentFixture<TpoSpeakingQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoSpeakingQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoSpeakingQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
