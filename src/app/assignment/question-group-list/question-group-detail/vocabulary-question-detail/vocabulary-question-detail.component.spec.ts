import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyQuestionDetailComponent } from './vocabulary-question-detail.component';

describe('VocabularyQuestionDetailComponent', () => {
  let component: VocabularyQuestionDetailComponent;
  let fixture: ComponentFixture<VocabularyQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
