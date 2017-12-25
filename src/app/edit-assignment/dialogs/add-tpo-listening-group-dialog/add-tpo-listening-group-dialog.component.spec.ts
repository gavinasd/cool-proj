import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTpoListeningGroupDialogComponent } from './add-tpo-listening-group-dialog.component';

describe('AddTpoListeningGroupDialogComponent', () => {
  let component: AddTpoListeningGroupDialogComponent;
  let fixture: ComponentFixture<AddTpoListeningGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTpoListeningGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTpoListeningGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
