import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMarkerComponent } from './question-marker.component';

describe('QuestionMarkerComponent', () => {
  let component: QuestionMarkerComponent;
  let fixture: ComponentFixture<QuestionMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
