import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpoListeningQuestionDialogComponent } from './add-tpo-listening-question-dialog.component';

describe('AddTpoListeningQuestionDialogComponent', () => {
  let component: AddTpoListeningQuestionDialogComponent;
  let fixture: ComponentFixture<AddTpoListeningQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTpoListeningQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTpoListeningQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
