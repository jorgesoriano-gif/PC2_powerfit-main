import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product, Producto } from '../services/product';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})
export class Ofertas implements OnInit {

  productos: Producto[] = [];
  categoriaSeleccionada = 'Todas';
  cargando = true;
  mensaje = '';

  constructor(private productService: Product, private cartService: Cart, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.productService.getProductos().subscribe({
      next: (data) => {
        this.productos =
          data.filter(producto => producto.oferta);
        this.cargando = false;
        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error(
          'Error cargando ofertas:',
          error
        );
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  get ofertasFiltradas(): Producto[] {
    if (this.categoriaSeleccionada === 'Todas') {
      return this.productos;
    }

    return this.productos.filter(
      producto => producto.categoria === this.categoriaSeleccionada
    );
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }

  calcularPrecioOferta(producto: Producto): number {
    return producto.precio - (producto.precio * producto.descuento / 100);
  }

  calcularAhorro(producto: Producto): number {
    return producto.precio - this.calcularPrecioOferta(producto);
  }

  agregarAlCarrito(
    producto: Producto
  ): void {

    this.cartService.agregarProducto(producto);
    this.mensaje = `${producto.nombre} agregado al carrito`;

    setTimeout(() => {
      this.mensaje = '';
      this.cdr.markForCheck();
    }, 3000);
  }
}
