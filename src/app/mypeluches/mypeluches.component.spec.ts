import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypeluchesComponent } from './mypeluches.component';

describe('MypeluchesComponent', () => {
  let component: MypeluchesComponent;
  let fixture: ComponentFixture<MypeluchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypeluchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MypeluchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
