import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntegratedWritingQuestionComponent } from './edit-integrated-writing-question.component';

describe('EditIntegratedWritingQuestionComponent', () => {
  let component: EditIntegratedWritingQuestionComponent;
  let fixture: ComponentFixture<EditIntegratedWritingQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIntegratedWritingQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIntegratedWritingQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
