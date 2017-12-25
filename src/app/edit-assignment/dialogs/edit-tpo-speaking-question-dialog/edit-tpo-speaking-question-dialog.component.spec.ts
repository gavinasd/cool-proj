import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTpoSpeakingQuestionDialogComponent } from './edit-tpo-speaking-question-dialog.component';

describe('EditTpoSpeakingQuestionDialogComponent', () => {
  let component: EditTpoSpeakingQuestionDialogComponent;
  let fixture: ComponentFixture<EditTpoSpeakingQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTpoSpeakingQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTpoSpeakingQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
