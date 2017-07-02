/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TpoReadingQuestionDetailComponent } from './tpo-reading-question-detail.component';

describe('TpoReadingQuestionDetailComponent', () => {
  let component: TpoReadingQuestionDetailComponent;
  let fixture: ComponentFixture<TpoReadingQuestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoReadingQuestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoReadingQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
