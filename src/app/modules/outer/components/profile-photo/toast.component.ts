import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, Toast } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeToast(id: string): void {
    this.toastService.remove(id);
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🔔';
    }
  }

  getToastClass(type: string): string {
    const baseClass = 'toast-notification cosmic-card border-l-4 transform transition-all duration-300 ease-in-out';
    switch (type) {
      case 'success': return `${baseClass} border-green-500 bg-green-500/10`;
      case 'error': return `${baseClass} border-red-500 bg-red-500/10`;
      case 'warning': return `${baseClass} border-yellow-500 bg-yellow-500/10`;
      case 'info': return `${baseClass} border-blue-500 bg-blue-500/10`;
      default: return `${baseClass} border-indigo-500 bg-indigo-500/10`;
    }
  }

  trackByToastId(index: number, toast: Toast): string {
    return toast.id;
  }
}
