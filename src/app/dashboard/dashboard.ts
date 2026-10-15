import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService, Usuario, Orden } from '../services/user.service';
import { Cart } from '../services/cart';

interface GastoMensual {
  mes: string;
  total: number;
  porcentaje: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  usuarioSesion: any = null;

  perfil: Usuario | null = null;
  historial: Orden[] = [];

  cargando = true;

  totalCompras = 0;
  totalGastado = 0;
  cantidadCarrito = 0;

  ultimaCompra: Orden | null = null;

  graficoMeses: GastoMensual[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private cartService: Cart,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const datosSesion = localStorage.getItem('usuario');

    if (!datosSesion) {
      this.router.navigate(['/']);
      return;
    }

    this.usuarioSesion = JSON.parse(datosSesion);

    this.cargarDashboard(this.usuarioSesion.id);
  }

  cargarDashboard(usuarioId: string): void {
    forkJoin({
      perfil: this.userService.getUsuarioPorId(usuarioId),

      historial: this.userService.getHistorialCompras(usuarioId),
    }).subscribe({
      next: ({ perfil, historial }) => {
        this.perfil = perfil;
        this.historial = historial;

        this.totalCompras = historial.length;

        this.totalGastado = historial.reduce((total, compra) => total + compra.total, 0);

        this.cantidadCarrito = this.cartService.obtenerCantidadTotal();

        this.ultimaCompra = this.obtenerUltimaCompra(historial);

        this.generarGraficoMensual(historial);

        this.cargando = false;

        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('Error cargando dashboard:', error);

        this.cargando = false;

        this.cdr.markForCheck();
      },
    });
  }

  private obtenerUltimaCompra(historial: Orden[]): Orden | null {
    if (historial.length === 0) {
      return null;
    }

    return [...historial].sort(
      (a, b) => this.convertirFecha(b.fecha).getTime() - this.convertirFecha(a.fecha).getTime(),
    )[0];
  }

  private generarGraficoMensual(historial: Orden[]): void {
    const gastosPorMes = new Map<string, number>();

    historial.forEach((compra) => {
      const fecha = this.convertirFecha(compra.fecha);

      const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;

      const acumulado = gastosPorMes.get(clave) ?? 0;

      gastosPorMes.set(clave, acumulado + compra.total);
    });

    const datos = Array.from(gastosPorMes.entries()).sort(([a], [b]) => a.localeCompare(b));

    const mayorGasto = Math.max(...datos.map(([, total]) => total), 0);

    this.graficoMeses = datos.map(([clave, total]) => {
      const [anio, mes] = clave.split('-').map(Number);

      const fecha = new Date(anio, mes - 1, 1);

      const nombreMes = new Intl.DateTimeFormat('es-PE', { month: 'short' })
        .format(fecha)
        .replace('.', '')
        .toUpperCase();

      return {
        mes: nombreMes,
        total,
        porcentaje: mayorGasto > 0 ? (total / mayorGasto) * 100 : 0,
      };
    });
  }

  private convertirFecha(fecha: string): Date {
    // Para fechas YYYY-MM-DD evita problemas
    // de zona horaria del navegador.
    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return new Date(`${fecha}T00:00:00`);
    }

    return new Date(fecha);
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');

    this.router.navigate(['/']);
  }
}
