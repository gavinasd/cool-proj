import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoListeningQuestionDetailComponent } from './tpo-listening-question-detail.component';

describe('TpoListeningQuestionDetailComponent', () => {
  let component: TpoListeningQuestionDetailComponent;
  let fixture: ComponentFixture<TpoListeningQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoListeningQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoListeningQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
