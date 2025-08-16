import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../interfaces/user.model';
import { UserRole } from '../../../interfaces/user-role.enum';
import { Subscription } from 'rxjs';

// Registrar los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  currentUser: User | null = null;
  currentDate = new Date();
  private userSubscription!: Subscription;
  
  // Charts
  private salesChart!: Chart;
  private trafficChart!: Chart;
  private revenueChart!: Chart;

  // Datos simulados
  dashboardData = {
    totalUsers: 15847,
    totalSales: 28450,
    totalRevenue: 185920,
    activeExperiences: 42,
    monthlySales: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 41000, 28450],
    dailyTraffic: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 6000, 3200, 2800, 4100, 5200, 3800, 4200],
    experiencePopularity: {
      labels: ['Experiencia 1', 'Experiencia 2', 'Experiencia 3', 'Experiencia 4', 'Experiencia 5'],
      data: [30, 25, 20, 15, 10]
    },
    userRoles: {
      labels: ['Usuario', 'Ventas', 'Manager', 'Administrador'],
      data: [65, 20, 10, 5]
    }
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngAfterViewInit(): void {
    // Esperar un tick para asegurar que el DOM esté renderizado
    setTimeout(() => {
      this.createCharts();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    
    // Destruir los charts para evitar memory leaks
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    if (this.trafficChart) {
      this.trafficChart.destroy();
    }
    if (this.revenueChart) {
      this.revenueChart.destroy();
    }
  }

  private createCharts(): void {
    this.createSalesChart();
    this.createTrafficChart();
    this.createRevenueChart();
  }

  private createSalesChart(): void {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (ctx) {
      this.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: 'Ventas Mensuales',
            data: this.dashboardData.monthlySales,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#f8fafc'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    }
  }

  private createTrafficChart(): void {
    const ctx = document.getElementById('trafficChart') as HTMLCanvasElement;
    if (ctx) {
      this.trafficChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.dashboardData.experiencePopularity.labels,
          datasets: [{
            data: this.dashboardData.experiencePopularity.data,
            backgroundColor: [
              '#6366f1',
              '#8b5cf6',
              '#0891b2',
              '#fbbf24',
              '#ef4444'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#f8fafc',
                padding: 20
              }
            }
          }
        }
      });
    }
  }

  private createRevenueChart(): void {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (ctx) {
      this.revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Últimos 14 días'],
          datasets: [{
            label: 'Tráfico Diario',
            data: this.dashboardData.dailyTraffic,
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderColor: '#6366f1',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#f8fafc'
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              ticks: {
                color: '#94a3b8'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    }
  }

  // Métodos utilitarios
  formatNumber(num: number): string {
    return new Intl.NumberFormat('es-PE').format(num);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  // Getter para UserRole enum (para usar en template)
  get UserRole() {
    return UserRole;
  }
}
