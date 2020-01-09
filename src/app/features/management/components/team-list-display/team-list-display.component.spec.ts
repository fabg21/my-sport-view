import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListDisplayComponent } from './team-list-display.component';

describe('TeamListDisplayComponent', () => {
  let component: TeamListDisplayComponent;
  let fixture: ComponentFixture<TeamListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
