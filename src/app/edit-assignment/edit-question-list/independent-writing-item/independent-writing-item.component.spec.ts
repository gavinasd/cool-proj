import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentWritingItemComponent } from './independent-writing-item.component';

describe('IndependentWritingItemComponent', () => {
  let component: IndependentWritingItemComponent;
  let fixture: ComponentFixture<IndependentWritingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentWritingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentWritingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
