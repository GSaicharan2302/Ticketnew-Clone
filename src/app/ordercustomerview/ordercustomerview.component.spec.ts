import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercustomerviewComponent } from './ordercustomerview.component';

describe('OrdercustomerviewComponent', () => {
  let component: OrdercustomerviewComponent;
  let fixture: ComponentFixture<OrdercustomerviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdercustomerviewComponent]
    });
    fixture = TestBed.createComponent(OrdercustomerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
