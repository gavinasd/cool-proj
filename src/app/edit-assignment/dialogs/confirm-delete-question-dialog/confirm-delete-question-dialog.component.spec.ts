import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteQuestionDialogComponent } from './confirm-delete-question-dialog.component';

describe('ConfirmDeleteQuestionDialogComponent', () => {
  let component: ConfirmDeleteQuestionDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
