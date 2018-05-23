import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinMessageBoardComponent } from './bulletin-message-board.component';

describe('BulletinMessageBoardComponent', () => {
  let component: BulletinMessageBoardComponent;
  let fixture: ComponentFixture<BulletinMessageBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinMessageBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinMessageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
