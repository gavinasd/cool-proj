import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTpospeakingQuestionComponent } from './edit-tpospeaking-question.component';

describe('EditTpospeakingQuestionComponent', () => {
  let component: EditTpospeakingQuestionComponent;
  let fixture: ComponentFixture<EditTpospeakingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTpospeakingQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTpospeakingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
