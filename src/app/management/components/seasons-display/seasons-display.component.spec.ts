import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsDisplayComponent } from './seasons-display.component';

describe('SeasonsDisplayComponent', () => {
  let component: SeasonsDisplayComponent;
  let fixture: ComponentFixture<SeasonsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
