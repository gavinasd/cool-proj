import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpoTableForViewComponent } from './tpo-table-for-view.component';

describe('TpoTableForViewComponent', () => {
  let component: TpoTableForViewComponent;
  let fixture: ComponentFixture<TpoTableForViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpoTableForViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpoTableForViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
