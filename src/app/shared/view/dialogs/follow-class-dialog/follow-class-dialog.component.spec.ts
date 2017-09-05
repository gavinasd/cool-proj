import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowClassDialogComponent } from './follow-class-dialog.component';

describe('FollowClassDialogComponent', () => {
  let component: FollowClassDialogComponent;
  let fixture: ComponentFixture<FollowClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
