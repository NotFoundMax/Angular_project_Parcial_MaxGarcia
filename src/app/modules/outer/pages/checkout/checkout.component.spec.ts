import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { CartService, CartItem } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';  // <- Importa FormsModule
import { By } from '@angular/platform-browser';


describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    cartServiceMock = {
      cartItems$: of([]), // carrito vacío por defecto
      getCartTotal: jasmine.createSpy('getCartTotal').and.returnValue(100),
      clearCart: jasmine.createSpy('clearCart')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

   await TestBed.configureTestingModule({
  declarations: [CheckoutComponent],
  imports: [FormsModule], // <- Añadido
  providers: [
    { provide: CartService, useValue: cartServiceMock },
    { provide: Router, useValue: routerMock }
  ]
}).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should call processPayment when form is valid', () => {
  component.contactInfo = {
    fullName: 'Alex Tester',
    email: 'alex@test.com',
    phone: '123456789'
  };
  component.selectedPaymentMethod = 'credit';
  component.cardInfo = {
    cardNumber: '4111 1111 1111 1111',
    expirationDate: '12/25',
    cvc: '123'
  };

  spyOn(component, 'processPayment');

  fixture.detectChanges(); // importante

  const btn = fixture.debugElement.query(By.css('button'));
  btn.triggerEventHandler('click', null);

  expect(component.processPayment).toHaveBeenCalled();
});

});
