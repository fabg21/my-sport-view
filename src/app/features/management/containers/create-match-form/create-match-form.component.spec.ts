import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMatchFormComponent } from './create-match-form.component';

describe('CreateMatchFormComponent', () => {
  let component: CreateMatchFormComponent;
  let fixture: ComponentFixture<CreateMatchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMatchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
