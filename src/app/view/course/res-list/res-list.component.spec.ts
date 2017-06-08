/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResListComponent } from './res-list.component';

describe('ResListComponent', () => {
  let component: ResListComponent;
  let fixture: ComponentFixture<ResListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
