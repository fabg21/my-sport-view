import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListDisplayComponent } from './player-list-display.component';

describe('PlayerListComponent', () => {
  let component: PlayerListDisplayComponent;
  let fixture: ComponentFixture<PlayerListDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerListDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
