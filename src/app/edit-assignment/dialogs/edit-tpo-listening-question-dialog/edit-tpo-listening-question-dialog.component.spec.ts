import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTpoListeningQuestionDialogComponent } from './edit-tpo-listening-question-dialog.component';

describe('EditTpoListeningQuestionDialogComponent', () => {
  let component: EditTpoListeningQuestionDialogComponent;
  let fixture: ComponentFixture<EditTpoListeningQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTpoListeningQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTpoListeningQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
