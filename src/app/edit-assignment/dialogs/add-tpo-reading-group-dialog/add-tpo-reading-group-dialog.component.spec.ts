import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpoReadingGroupDialogComponent } from './add-tpo-reading-group-dialog.component';

describe('AddTpoReadingGroupDialogComponent', () => {
  let component: AddTpoReadingGroupDialogComponent;
  let fixture: ComponentFixture<AddTpoReadingGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTpoReadingGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTpoReadingGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
