import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFachComponent } from './app-fach.component';

describe('AppFachComponent', () => {
  let component: AppFachComponent;
  let fixture: ComponentFixture<AppFachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
