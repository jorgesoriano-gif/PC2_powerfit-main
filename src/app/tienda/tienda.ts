import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, Producto } from '../services/product'; // Importamos tu servicio y la interfaz
import { Cart } from '../services/cart'; // Importamos el carrito
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tienda.html',
  styleUrl: './tienda.css',
})
export class Tienda implements OnInit {
  // Lista que almacenará todos los productos que lleguen de la base de datos
  productos: Producto[] = [];

  // Variables de control para la interfaz
  cargando = true;
  mensaje = '';

  // Inyectamos los servicios en el constructor
  constructor(
    private productService: Product,
    private cartService: Cart,
    private cdr: ChangeDetectorRef
  ) { }

  // Al iniciar el componente, llamamos a la API
  ngOnInit(): void {
    this.productService.getProductos().subscribe({
      next: (data) => {
        // A diferencia de las ofertas, aquí guardamos TODO el catálogo
        this.productos = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error cargando el catálogo de la tienda:', error);
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  get productosDestacados(): Producto[] {
    return this.productos
      .filter(producto => producto.stock > 0)
      .slice(0, 4);
  }

  get ofertasDestacadas(): Producto[] {
    return this.productos
      .filter(producto => producto.oferta && producto.stock > 0)
      .slice(0, 3);
  }

  calcularPrecioOferta(producto: Producto): number {
    return producto.precio -
      (producto.precio * producto.descuento / 100);
  }

  private mensajeTimeout: any;

  // Función para agregar al carrito
  agregarAlCarrito(producto: Producto): void {
    this.cartService.agregarProducto(producto);

    // Mostramos un mensaje temporal de éxito
    this.mensaje = `${producto.nombre} agregado al carrito`;
    this.cdr.markForCheck();

    if (this.mensajeTimeout) {
      clearTimeout(this.mensajeTimeout);
    }

    // Ocultamos el mensaje después de 3 segundos
    this.mensajeTimeout = setTimeout(() => {
      this.mensaje = '';
      this.cdr.markForCheck();
    }, 3000);
  }
}
