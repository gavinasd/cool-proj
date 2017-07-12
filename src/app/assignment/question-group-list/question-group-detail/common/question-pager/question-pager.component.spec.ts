import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPagerComponent } from './question-pager.component';

describe('QuestionPagerComponent', () => {
  let component: QuestionPagerComponent;
  let fixture: ComponentFixture<QuestionPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
