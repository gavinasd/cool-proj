import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpoReadingQuestionDialogComponent } from './add-tpo-reading-question-dialog.component';

describe('AddTpoReadingQuestionDialogComponent', () => {
  let component: AddTpoReadingQuestionDialogComponent;
  let fixture: ComponentFixture<AddTpoReadingQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTpoReadingQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTpoReadingQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
