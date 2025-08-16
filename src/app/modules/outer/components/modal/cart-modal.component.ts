import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CartService, CartItem } from 'src/app/core/services/customers.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  cartItems: CartItem[] = [];
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  closeModal(): void {
    this.close.emit();
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  proceedToCheckout(): void {
    // Redirigir a la página de checkout
    this.closeModal();
    this.router.navigate(['/checkout']);
  }
}
