import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionDialogComponent } from './add-question-dialog.component';

describe('AddQuestionDialogComponent', () => {
  let component: AddQuestionDialogComponent;
  let fixture: ComponentFixture<AddQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
