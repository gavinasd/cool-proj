import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoSpeakingItemComponent } from './tpo-speaking-item.component';

describe('TpoSpeakingItemComponent', () => {
  let component: TpoSpeakingItemComponent;
  let fixture: ComponentFixture<TpoSpeakingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoSpeakingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoSpeakingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
