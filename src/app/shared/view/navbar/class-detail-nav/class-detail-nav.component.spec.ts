import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailNavComponent } from './class-detail-nav.component';

describe('ClassDetailNavComponent', () => {
  let component: ClassDetailNavComponent;
  let fixture: ComponentFixture<ClassDetailNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassDetailNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDetailNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
