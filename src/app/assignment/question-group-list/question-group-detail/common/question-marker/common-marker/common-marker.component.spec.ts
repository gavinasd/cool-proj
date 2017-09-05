import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMarkerComponent } from './common-marker.component';

describe('CommonMarkerComponent', () => {
  let component: CommonMarkerComponent;
  let fixture: ComponentFixture<CommonMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
