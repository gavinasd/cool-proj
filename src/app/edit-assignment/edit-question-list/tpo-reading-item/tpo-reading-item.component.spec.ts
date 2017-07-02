import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoReadingItemComponent } from './tpo-reading-item.component';

describe('TpoReadingItemComponent', () => {
  let component: TpoReadingItemComponent;
  let fixture: ComponentFixture<TpoReadingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoReadingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoReadingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
