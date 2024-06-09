import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelucheTopComponent } from './peluche-top.component';

describe('PelucheTopComponent', () => {
  let component: PelucheTopComponent;
  let fixture: ComponentFixture<PelucheTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelucheTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelucheTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
