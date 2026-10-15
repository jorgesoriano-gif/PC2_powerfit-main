import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- Vital para usar routerLink

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // <-- Agrégalo aquí
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}