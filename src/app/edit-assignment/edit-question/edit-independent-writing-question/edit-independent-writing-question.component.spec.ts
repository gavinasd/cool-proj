import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndependentWritingQuestionComponent } from './edit-independent-writing-question.component';

describe('EditIndependentWritingQuestionComponent', () => {
  let component: EditIndependentWritingQuestionComponent;
  let fixture: ComponentFixture<EditIndependentWritingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIndependentWritingQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIndependentWritingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
