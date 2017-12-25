import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoListeningItemComponent } from './tpo-listening-item.component';

describe('TpoListeningItemComponent', () => {
  let component: TpoListeningItemComponent;
  let fixture: ComponentFixture<TpoListeningItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoListeningItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoListeningItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
