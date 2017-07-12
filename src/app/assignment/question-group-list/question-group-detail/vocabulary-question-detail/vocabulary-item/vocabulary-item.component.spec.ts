import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyItemComponent } from './vocabulary-item.component';

describe('VocabularyItemComponent', () => {
  let component: VocabularyItemComponent;
  let fixture: ComponentFixture<VocabularyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocabularyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
