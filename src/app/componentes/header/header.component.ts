import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../servicios/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount = 0;
  showCartModal = false;
  private cartCountSubscription: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }

  toggleCartModal(): void {
    this.showCartModal = !this.showCartModal;
  }

  closeCartModal(): void {
    this.showCartModal = false;
  }
}
