import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndependentWritingQuestionDialogComponent } from './edit-independent-writing-question-dialog.component';

describe('EditIndependentWritingQuestionDialogComponent', () => {
  let component: EditIndependentWritingQuestionDialogComponent;
  let fixture: ComponentFixture<EditIndependentWritingQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIndependentWritingQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIndependentWritingQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
