import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegratedWritingItemComponent } from './integrated-writing-item.component';

describe('IntegratedWritingItemComponent', () => {
  let component: IntegratedWritingItemComponent;
  let fixture: ComponentFixture<IntegratedWritingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegratedWritingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegratedWritingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
