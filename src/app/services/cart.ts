import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Producto } from './product';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {

  private storageKey = 'carrito';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  obtenerItems(): ItemCarrito[] {

    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    const carritoGuardado =
      localStorage.getItem(this.storageKey);

    if (!carritoGuardado) {
      return [];
    }

    try {

      const datos = JSON.parse(carritoGuardado);

      if (!Array.isArray(datos)) {
        return [];
      }

      if (
        datos.length > 0 &&
        !datos[0].producto
      ) {

        const carritoMigrado: ItemCarrito[] =
          datos.map((producto: Producto) => ({
            producto,
            cantidad: 1
          }));

        this.guardarCarrito(carritoMigrado);
        return carritoMigrado;
      }
      return datos as ItemCarrito[];
    } catch (error) {
      console.error(
        'Error leyendo el carrito:',
        error
      );
      return [];
    }
  }

  agregarProducto(producto: Producto): void {
    const carrito = this.obtenerItems();
    const itemExistente = carrito.find(
      item =>
        String(item.producto.id) ===
        String(producto.id)
    );

    if (itemExistente) {
      if (
        itemExistente.cantidad <
        producto.stock
      ) {
        itemExistente.cantidad++;
      }
    } else {
      carrito.push({
        producto,
        cantidad: 1
      });

    }
    this.guardarCarrito(carrito);
  }

  aumentarCantidad(id: number | string): void {
    const carrito = this.obtenerItems();
    const item = carrito.find(
      item =>
        String(item.producto.id) ===
        String(id)
    );

    if (
      item &&
      item.cantidad < item.producto.stock
    ) {
      item.cantidad++;
      this.guardarCarrito(carrito);
    }
  }


  disminuirCantidad(id: number | string): void {
    const carrito = this.obtenerItems();
    const item = carrito.find(
      item =>
        String(item.producto.id) ===
        String(id)
    );

    if (
      item &&
      item.cantidad > 1
    ) {
      item.cantidad--;
      this.guardarCarrito(carrito);
    }
  }


  eliminarProducto(id: number | string): void {
    const carrito = this.obtenerItems();
    const carritoActualizado =
      carrito.filter(
        item =>
          String(item.producto.id) !==
          String(id)
      );
    this.guardarCarrito(
      carritoActualizado
    );
  }


  vaciarCarrito(): void {
    this.guardarCarrito([]);
  }


  calcularPrecioUnitario(
    producto: Producto
  ): number {

    if (
      producto.oferta &&
      producto.descuento > 0
    ) {

      return producto.precio -
        (
          producto.precio *
          producto.descuento /
          100
        );
    }

    return producto.precio;
  }


  calcularSubtotal(
    item: ItemCarrito
  ): number {
    return (
      this.calcularPrecioUnitario(
        item.producto
      ) *
      item.cantidad
    );
  }


  obtenerCantidadTotal(): number {
    return this.obtenerItems()
      .reduce(
        (total, item) =>
          total + item.cantidad,
        0
      );
  }


  obtenerTotal(): number {
    return this.obtenerItems()
      .reduce(
        (total, item) =>
          total +
          this.calcularSubtotal(item),
        0
      );
  }


  private guardarCarrito(
    carrito: ItemCarrito[]
  ): void {

    if (
      isPlatformBrowser(
        this.platformId
      )
    ) {

      localStorage.setItem(
        this.storageKey,
        JSON.stringify(carrito)
      );
    }
  }
}