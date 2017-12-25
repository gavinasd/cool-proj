import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTpoReadingQuestionDialogComponent } from './edit-tpo-reading-question-dialog.component';

describe('EditTpoReadingQuestionDialogComponent', () => {
  let component: EditTpoReadingQuestionDialogComponent;
  let fixture: ComponentFixture<EditTpoReadingQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTpoReadingQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTpoReadingQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
