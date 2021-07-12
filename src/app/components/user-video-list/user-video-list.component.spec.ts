import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVideoListComponent } from './user-video-list.component';

describe('UserVideoListComponent', () => {
  let component: UserVideoListComponent;
  let fixture: ComponentFixture<UserVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVideoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
