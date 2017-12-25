import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntegratedWritingQuestionDialogComponent } from './edit-integrated-writing-question-dialog.component';

describe('EditIntegratedWritingQuestionDialogComponent', () => {
  let component: EditIntegratedWritingQuestionDialogComponent;
  let fixture: ComponentFixture<EditIntegratedWritingQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIntegratedWritingQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIntegratedWritingQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
