import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndependentQuestionDialogComponent } from './add-independent-question-dialog.component';

describe('AddIndependentQuestionDialogComponent', () => {
  let component: AddIndependentQuestionDialogComponent;
  let fixture: ComponentFixture<AddIndependentQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndependentQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndependentQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
