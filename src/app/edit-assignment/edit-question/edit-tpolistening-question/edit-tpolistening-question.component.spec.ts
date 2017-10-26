import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTpolisteningQuestionComponent } from './edit-tpolistening-question.component';

describe('EditTpolisteningQuestionComponent', () => {
  let component: EditTpolisteningQuestionComponent;
  let fixture: ComponentFixture<EditTpolisteningQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTpolisteningQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTpolisteningQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
