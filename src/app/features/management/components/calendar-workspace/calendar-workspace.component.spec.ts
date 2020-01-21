import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWorkspaceComponent } from './calendar-workspace.component';

describe('CalendarWorkspaceComponent', () => {
  let component: CalendarWorkspaceComponent;
  let fixture: ComponentFixture<CalendarWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
