import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path: 'productos',
    renderMode: RenderMode.Client
  },

  {
    path: 'ofertas',
    renderMode: RenderMode.Client
  },

  {
    path: 'carrito',
    renderMode: RenderMode.Client
  },

  {
    path: 'login',
    renderMode: RenderMode.Client
  },

  {
    path: 'dashboard',
    renderMode: RenderMode.Client
  },

  {
    path: 'tienda',
    renderMode: RenderMode.Client
  },
  
  {
    path: 'mi-cuenta',
    renderMode: RenderMode.Client
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
