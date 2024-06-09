import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelucheMyComponent } from './peluche-my.component';

describe('PelucheMyComponent', () => {
  let component: PelucheMyComponent;
  let fixture: ComponentFixture<PelucheMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelucheMyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelucheMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
