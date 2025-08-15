import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../servicios/cart.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  cartCount = 0;
  private cartCountSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }

  goToCart(): void {
    if (this.cartCount > 0) {
      this.router.navigate(['/checkout']);
    } else {
      alert('🛒 Tu carrito espacial está vacío\n\n¡Agrega algunas experiencias para comenzar tu aventura!');
    }
  }
}
