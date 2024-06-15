import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreLoginComponent } from './theatre-login.component';

describe('TheatreLoginComponent', () => {
  let component: TheatreLoginComponent;
  let fixture: ComponentFixture<TheatreLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheatreLoginComponent]
    });
    fixture = TestBed.createComponent(TheatreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
