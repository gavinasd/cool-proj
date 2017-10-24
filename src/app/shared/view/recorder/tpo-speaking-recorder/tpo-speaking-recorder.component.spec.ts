import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoSpeakingRecorderComponent } from './tpo-speaking-recorder.component';

describe('TpoSpeakingRecorderComponent', () => {
  let component: TpoSpeakingRecorderComponent;
  let fixture: ComponentFixture<TpoSpeakingRecorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoSpeakingRecorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoSpeakingRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
