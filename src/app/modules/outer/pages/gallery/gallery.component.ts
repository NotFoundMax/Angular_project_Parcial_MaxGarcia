import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
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
      Swal.fire({
        title: 'Tu carrito espacial está vacío',
        text: '¡Agrega algunas experiencias para comenzar tu aventura!',
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6366f1',
        background: '#1e293b',
        color: '#f1f5f9'
      });
    }
  }
}
