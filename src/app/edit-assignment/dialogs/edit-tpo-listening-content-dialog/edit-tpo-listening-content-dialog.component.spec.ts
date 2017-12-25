import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTpoListeningContentDialogComponent } from './edit-tpo-listening-content-dialog.component';

describe('EditTpoListeningContentDialogComponent', () => {
  let component: EditTpoListeningContentDialogComponent;
  let fixture: ComponentFixture<EditTpoListeningContentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTpoListeningContentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTpoListeningContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
