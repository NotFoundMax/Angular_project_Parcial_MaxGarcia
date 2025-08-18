import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CartService, CartItem } from '../../../../core/services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
}

interface CardInfo {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  selectedPaymentMethod: string = '';
  qrCodeUrl: string = '';
  
  contactInfo: ContactInfo = {
    fullName: '',
    email: '',
    phone: ''
  };

  cardInfo: CardInfo = {
    cardNumber: '',
    expirationDate: '',
    cvc: ''
  };

  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      if (items.length === 0 && isPlatformBrowser(this.platformId)) {
        this.router.navigate(['/gallery']);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.generateRandomQR();
    }
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  formatCardNumber(event: any): void {
    const input = event.target.value;
    const numbers = input.replace(/[^0-9]/g, '');
    const formatted = numbers.replace(/(.{4})/g, '$1 ');
    this.cardInfo.cardNumber = formatted.trim();
  }

  formatExpirationDate(event: any): void {
    const input = event.target.value;
    const numbers = input.replace(/[^0-9]/g, '');
    this.cardInfo.expirationDate = numbers.length >= 2
      ? numbers.substring(0, 2) + '/' + numbers.substring(2, 4)
      : numbers;
  }

  formatCVC(event: any): void {
    const input = event.target.value;
    this.cardInfo.cvc = input.replace(/[^0-9]/g, '');
  }

  isContactInfoValid(): boolean {
    const hasName = this.contactInfo.fullName.trim().length > 0;
    const hasEmail = this.contactInfo.email.trim().length > 0;
    const emailIsValid = this.isValidEmail(this.contactInfo.email);
    return hasName && hasEmail && emailIsValid;
  }

  isValidEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }

  isCardInfoValid(): boolean {
    const cardNumbers = this.cardInfo.cardNumber.replace(/\s/g, '');
    const hasValidCardNumber = cardNumbers.length >= 16;
    const hasValidDate = this.cardInfo.expirationDate.length === 5;
    const hasValidCVC = this.cardInfo.cvc.length === 3;
    return hasValidCardNumber && hasValidDate && hasValidCVC;
  }

  isFormValid(): boolean {
    const contactValid = this.isContactInfoValid();
    const paymentMethodSelected = this.selectedPaymentMethod !== '';
    if (this.selectedPaymentMethod === 'credit' || this.selectedPaymentMethod === 'debit') {
      return contactValid && paymentMethodSelected && this.isCardInfoValid();
    }
    return contactValid && paymentMethodSelected;
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  getTaxes(): number {
    return this.getCartTotal() * 0.18;
  }

  getFinalTotal(): number {
    return this.getCartTotal() + this.getTaxes();
  }

  generateRandomQR(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const randomId = Math.random().toString(36).substring(2, 15);
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STELLARX_PAYMENT_${randomId}_${this.getFinalTotal().toFixed(2)}`;
  }

  processPayment(): void {
    if (!this.isFormValid()) return;

    const paymentData = {
      contactInfo: this.contactInfo,
      paymentMethod: this.selectedPaymentMethod,
      cardInfo: this.selectedPaymentMethod !== 'mobile' ? this.cardInfo : null,
      total: this.getFinalTotal(),
      items: this.cartItems
    };

    console.log('Procesando pago:', paymentData);

    if (isPlatformBrowser(this.platformId)) {
      Swal.fire({
        title: '🚀 ¡Pago Procesado Exitosamente!',
        html: `
          <div class="text-center">
            <p class="mb-3">Gracias <strong>${this.contactInfo.fullName}</strong>, tu experiencia espacial ha sido confirmada.</p>
            <p class="mb-3">Total pagado: <strong class="text-yellow-400">S/. ${this.getFinalTotal().toFixed(2)}</strong></p>
            <p>¡Prepárate para la aventura de tu vida!</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'Continuar Exploración',
        confirmButtonColor: '#6366f1',
        background: '#1e293b',
        color: '#f1f5f9'
      }).then(() => {
        this.cartService.clearCart();
        this.router.navigate(['/gallery']);
      });
    }
  }

  uploadPaymentScreenshot(): void {
    if (!this.isContactInfoValid() || !isPlatformBrowser(this.platformId)) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Archivo seleccionado:', file.name);
        Swal.fire({
          title: '📸 ¡Captura Recibida!',
          html: `
            <div class="text-center">
              <p class="mb-3">Hemos recibido tu captura de pago por <strong class="text-yellow-400">S/. ${this.getFinalTotal().toFixed(2)}</strong></p>
              <p class="mb-3">Estamos verificando tu pago. Te contactaremos a <strong>${this.contactInfo.email}</strong> en las próximas 24 horas.</p>
              <p>¡Gracias por elegir STELLARX!</p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#6366f1',
          background: '#1e293b',
          color: '#f1f5f9'
        }).then(() => {
          this.cartService.clearCart();
          this.router.navigate(['/gallery']);
        });
      }
    };

    input.click();
  }
}
