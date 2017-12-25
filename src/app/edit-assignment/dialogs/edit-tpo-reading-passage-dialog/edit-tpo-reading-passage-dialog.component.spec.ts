import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassageDialogComponent } from './edit-tpo-reading-passage-dialog.component';

describe('EditPassageDialogComponent', () => {
  let component: EditPassageDialogComponent;
  let fixture: ComponentFixture<EditPassageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPassageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
