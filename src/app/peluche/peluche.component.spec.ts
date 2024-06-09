import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelucheComponent } from './peluche.component';

describe('PelucheComponent', () => {
  let component: PelucheComponent;
  let fixture: ComponentFixture<PelucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelucheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
