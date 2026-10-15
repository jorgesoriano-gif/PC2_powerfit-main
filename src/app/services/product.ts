import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Producto {
  id: string;
  nombre: string;
  imagen: string;
  categoria: string;
  precio: number;
  stock: number;
  oferta: boolean;
  descuento: number;
}

@Injectable({
  providedIn: 'root',
})
export class Product {
  private apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
