import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVocabularyQuestionComponent } from './edit-vocabulary-question.component';

describe('EditVocabularyQuestionComponent', () => {
  let component: EditVocabularyQuestionComponent;
  let fixture: ComponentFixture<EditVocabularyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVocabularyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVocabularyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
