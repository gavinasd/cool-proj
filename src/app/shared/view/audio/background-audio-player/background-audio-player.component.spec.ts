import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundAudioPlayerComponent } from './background-audio-player.component';

describe('BackgroundAudioPlayerComponent', () => {
  let component: BackgroundAudioPlayerComponent;
  let fixture: ComponentFixture<BackgroundAudioPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundAudioPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
