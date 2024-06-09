import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelucheItemComponent } from './peluche-item.component';

describe('PelucheItemComponent', () => {
  let component: PelucheItemComponent;
  let fixture: ComponentFixture<PelucheItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelucheItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelucheItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
