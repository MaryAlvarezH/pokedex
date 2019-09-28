import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionViewComponent } from './user-selection-view.component';

describe('UserSelectionViewComponent', () => {
  let component: UserSelectionViewComponent;
  let fixture: ComponentFixture<UserSelectionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
