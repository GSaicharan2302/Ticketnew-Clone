import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreOwnerHomeComponent } from './theatre-owner-home.component';

describe('TheatreOwnerHomeComponent', () => {
  let component: TheatreOwnerHomeComponent;
  let fixture: ComponentFixture<TheatreOwnerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheatreOwnerHomeComponent]
    });
    fixture = TestBed.createComponent(TheatreOwnerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
