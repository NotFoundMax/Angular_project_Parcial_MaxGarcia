import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService, CartItem } from '../../servicios/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      // Si el carrito está vacío, redirigir a la galería
      if (items.length === 0) {
        this.router.navigate(['/gallery']);
      }
    });

    // Generar QR Code aleatorio
    this.generateRandomQR();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  // Formatear número de tarjeta
  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    this.cardInfo.cardNumber = formattedValue;
  }

  // Formatear fecha de vencimiento
  formatExpirationDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.cardInfo.expirationDate = value;
  }

  // Formatear CVC
  formatCVC(event: any): void {
    let value = event.target.value.replace(/[^0-9]/gi, '');
    this.cardInfo.cvc = value;
  }

  // Validar información de contacto
  isContactInfoValid(): boolean {
    return this.contactInfo.fullName.trim() !== '' && 
           this.contactInfo.email.trim() !== '' &&
           this.isValidEmail(this.contactInfo.email);
  }

  // Validar email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validar información de tarjeta
  isCardInfoValid(): boolean {
    const cardNumberDigits = this.cardInfo.cardNumber.replace(/\s/g, '');
    const isCardNumberValid = cardNumberDigits.length >= 16;
    const isExpirationValid = this.isValidExpirationDate(this.cardInfo.expirationDate);
    const isCvcValid = this.cardInfo.cvc.length === 3;

    return isCardNumberValid && isExpirationValid && isCvcValid;
  }

  // Validar fecha de vencimiento
  isValidExpirationDate(date: string): boolean {
    if (date.length !== 5 || !date.includes('/')) return false;
    
    const [month, year] = date.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt('20' + year, 10);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return false;
    }
    
    return true;
  }

  // Validar formulario completo
  isFormValid(): boolean {
    const contactValid = this.isContactInfoValid();
    const paymentMethodSelected = this.selectedPaymentMethod !== '';
    
    if (this.selectedPaymentMethod === 'credit' || this.selectedPaymentMethod === 'debit') {
      return contactValid && paymentMethodSelected && this.isCardInfoValid();
    }
    
    return contactValid && paymentMethodSelected;
  }

  // Obtener total del carrito
  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  // Calcular impuestos (18% IGV)
  getTaxes(): number {
    return this.getCartTotal() * 0.18;
  }

  // Obtener total final
  getFinalTotal(): number {
    return this.getCartTotal() + this.getTaxes();
  }

  // Generar QR Code aleatorio
  generateRandomQR(): void {
    // Simulamos un QR code con una imagen de placeholder
    const randomId = Math.random().toString(36).substring(2, 15);
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STELLARX_PAYMENT_${randomId}_${this.getFinalTotal().toFixed(2)}`;
  }

  // Procesar pago con tarjeta
  processPayment(): void {
    if (!this.isFormValid()) return;

    // Simulación del proceso de pago
    const paymentData = {
      contactInfo: this.contactInfo,
      paymentMethod: this.selectedPaymentMethod,
      cardInfo: this.selectedPaymentMethod !== 'mobile' ? this.cardInfo : null,
      total: this.getFinalTotal(),
      items: this.cartItems
    };

    console.log('Procesando pago:', paymentData);

    // Mostrar mensaje de éxito
    alert(`🚀 ¡Pago procesado exitosamente!\n\nGracias ${this.contactInfo.fullName}, tu experiencia espacial ha sido confirmada.\n\nTotal pagado: S/. ${this.getFinalTotal().toFixed(2)}\n\n¡Prepárate para la aventura de tu vida!`);

    // Limpiar carrito y redirigir
    this.cartService.clearCart();
    this.router.navigate(['/gallery']);
  }

  // Subir captura de pago
  uploadPaymentScreenshot(): void {
    if (!this.isContactInfoValid()) return;

    // Simulación de subida de archivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Archivo seleccionado:', file.name);
        
        // Simulación de procesamiento
        alert(`📸 ¡Captura recibida!\n\nHemos recibido tu captura de pago por S/. ${this.getFinalTotal().toFixed(2)}\n\nEstamos verificando tu pago. Te contactaremos a ${this.contactInfo.email} en las próximas 24 horas.\n\n¡Gracias por elegir STELLARX!`);
        
        // Limpiar carrito y redirigir
        this.cartService.clearCart();
        this.router.navigate(['/gallery']);
      }
    };
    
    input.click();
  }
}
