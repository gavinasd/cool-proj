import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreMarkerComponent } from './score-marker.component';

describe('ScoreMarkerComponent', () => {
  let component: ScoreMarkerComponent;
  let fixture: ComponentFixture<ScoreMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
