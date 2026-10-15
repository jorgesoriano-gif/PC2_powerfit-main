import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  Cart,
  ItemCarrito
} from '../services/cart';

@Component({
  selector: 'app-carrito',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {
  items: ItemCarrito[] = [];
  total = 0;
  cantidadTotal = 0;

  constructor(
    private cartService: Cart
  ) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }


  cargarCarrito(): void {
    this.items =
      this.cartService.obtenerItems();
    this.total =
      this.cartService.obtenerTotal();
    this.cantidadTotal =
      this.cartService.obtenerCantidadTotal();
  }


  aumentarCantidad(
    id: number | string
  ): void {
    this.cartService
      .aumentarCantidad(id);

    this.cargarCarrito();
  }


  disminuirCantidad(
    id: number | string
  ): void {
    this.cartService
      .disminuirCantidad(id);

    this.cargarCarrito();
  }


  eliminarProducto(
    id: number | string
  ): void {
    this.cartService
      .eliminarProducto(id);

    this.cargarCarrito();
  }


  vaciarCarrito(): void {
    this.cartService
      .vaciarCarrito();

    this.cargarCarrito();
  }


  obtenerPrecio(
    item: ItemCarrito
  ): number {
    return this.cartService
      .calcularPrecioUnitario(
        item.producto
      );
  }


  obtenerSubtotal(
    item: ItemCarrito
  ): number {
    return this.cartService
      .calcularSubtotal(item);
  }
}