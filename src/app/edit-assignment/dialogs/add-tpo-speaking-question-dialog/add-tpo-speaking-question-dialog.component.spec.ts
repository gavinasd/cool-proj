import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpoSpeakingQuestionDialogComponent } from './add-tpo-speaking-question-dialog.component';

describe('AddTpoSpeakingQuestionDialogComponent', () => {
  let component: AddTpoSpeakingQuestionDialogComponent;
  let fixture: ComponentFixture<AddTpoSpeakingQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTpoSpeakingQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTpoSpeakingQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
