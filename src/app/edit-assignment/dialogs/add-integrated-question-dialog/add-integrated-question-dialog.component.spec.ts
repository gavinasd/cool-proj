import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntegratedQuestionDialogComponent } from './add-integrated-question-dialog.component';

describe('AddIntegratedQuestionDialogComponent', () => {
  let component: AddIntegratedQuestionDialogComponent;
  let fixture: ComponentFixture<AddIntegratedQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIntegratedQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntegratedQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
