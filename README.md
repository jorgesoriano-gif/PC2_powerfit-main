# PowerFit Market — E-Commerce de Alto Rendimiento

Proyecto desarrollado para la evaluación **PC2 – JavaScript Avanzado**. Consiste en una aplicación web tipo e-commerce completa desarrollada en **Angular**, con arquitectura orientada a componentes, estilos responsivos con **Bootstrap**, consumo de API REST simulada con **JSON Server**, y autenticación simulada con persistencia en **LocalStorage** y rutas protegidas.

---

## 🛠️ Tecnologías Utilizadas

- **Angular (v21)**: Framework principal basado en componentes standalone.
- **TypeScript**: Tipado estático y modelos fuertemente tipados.
- **Bootstrap (v5.3) & Bootstrap Icons**: Sistema de grid responsivo, tarjetas, botones y componentes visuales.
- **JSON Server**: Base de datos simulada y API REST local (`http://localhost:3000`).
- **HTML5 & CSS3**: Estructura semántica y diseño personalizado con variables CSS (Dark Theme táctico con acentos azul pastel).
- **RxJS**: Manejo reactivo de peticiones HTTP (`HttpClient`, `Observable`, `forkJoin`).

---

## 📋 Cumplimiento de Requerimientos PC2

| # | Requerimiento | Estado | Detalle de Implementación |
|---|---|:---:|---|
| **1** | **Estructura general** | ✅ Cumple | Navbar reutilizable (`app-navbar`), Footer reutilizable (`app-footer`) y arquitectura modular basada en componentes standalone. |
| **2** | **Páginas mínimas requeridas** | ✅ Cumple | `Home`, `Productos`, `Ofertas`, `Tienda`, `Contacto`, `Mi Cuenta`, `Login`, `Dashboard` y `Página 404 personalizada` (`NotFoundComponent`). |
| **3** | **Navegación y Routing** | ✅ Cumple | Enrutamiento con `app.routes.ts`, `routerLink`, `routerLinkActive`, ruta comodín `**` para error 404, y `authGuard` que redirige al Home (`/`) si se intenta acceder directamente a `/dashboard` sin sesión activa. |
| **4** | **Simulación de Login** | ✅ Cumple | Formulario con validaciones y `[(ngModel)]`, almacenamiento de sesión en `LocalStorage`, validación contra `db.json`, redirección automática y opción de cerrar sesión en Navbar, Dashboard y Mi Cuenta. |
| **5** | **Uso obligatorio de Angular** | ✅ Cumple | **Data Binding**: Interpolación `{{ }}`, Property Binding `[src]`, Event Binding `(click)`, Two-Way Data Binding `[(ngModel)]`.<br>**Directivas estructurales**: `*ngFor` y `*ngIf`.<br>**Directivas de atributos**: `[ngClass]` y `[ngStyle]`.<br>**Pipes aplicados**: `CurrencyPipe`, `DatePipe`, `UpperCasePipe`. |
| **6** | **Bootstrap** | ✅ Cumple | Grid responsive (`col-sm-6`, `col-lg-4`, etc.), Cards, Navbar colapsable con toggler móvil, Formularios, Alertas y Botones adaptados para desktop y móvil. |
| **7** | **Base de datos con JSON Server** | ✅ Cumple | Archivo `db.json` con colecciones `productos` (id, nombre, imagen, categoria, precio, stock, oferta, descuento), `usuarios` e `historial_compras`. |
| **8** | **Consumo de Servicios REST** | ✅ Cumple | Inyección de `HttpClient` en `Product` (`product.ts`) y `UserService` (`user.service.ts`) para consumir endpoints `/productos`, `/usuarios` e `/historial_compras`. |
| **9** | **Página de Productos** | ✅ Cumple | Catálogo dinámico con imagen, nombre, categoría, precio y stock. Incluye buscador reactivo por texto, filtro interactivo por categorías y badge condicional de oferta/agotado. |
| **10** | **Dashboard protegido** | ✅ Cumple | Bienvenida personalizada con avatar y nombre, estadísticas personales (compras, gasto total, puntos acumulados, items en carrito), gráfico de evolución de gastos y restricción de acceso vía `LocalStorage` y `authGuard`. |
| **11** | **Despliegue del Proyecto** | ✅ Cumple | Preparado para build de producción y despliegue en Vercel / Netlify / Firebase. |

---

## 👥 Credenciales de Acceso (Pruebas de Login)

Puedes iniciar sesión con cualquiera de los usuarios registrados en el `db.json`:

| Correo Electrónico | Contraseña | Nombre | Nivel |
|---|---|---|---|
| `carlos@powerfit.com` | `123456` | Carlos Mendoza | ATLETA ÉLITE |
| `diego@powerfit.com` | `456123` | Diego Verastegui | ATLETA PRO |

---

## 🚀 Instrucciones de Ejecución Local

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone <URL_DEL_REPOSITORIO>
cd PC2_powerfit-main
npm install
```

### 2. Iniciar el Servidor REST (JSON Server)

En una terminal independiente, ejecuta:

```bash
npm run server
```

> El servidor iniciará en `http://localhost:3000`.

### 3. Iniciar la Aplicación Angular

En otra terminal, ejecuta:

```bash
npm start
```

Abre tu navegador en `http://localhost:4200/`.

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── carrito/         # Carrito de compras y cálculo de totales
│   ├── contacto/        # Formulario de contacto y datos tácticos
│   ├── dashboard/       # Panel privado de métricas y compras del usuario
│   ├── footer/          # Pie de página reutilizable con datos de contacto
│   ├── guards/          # authGuard para proteger rutas privadas
│   ├── home/            # Portada principal, marcas y accesos rápidos
│   ├── login/           # Inicio de sesión con ngModel y LocalStorage
│   ├── mi-cuenta/       # Edición de perfil de usuario e historial
│   ├── navbar/          # Barra de navegación responsiva con badge de carrito
│   ├── not-found/       # Página 404 personalizada con enlaces rápidos
│   ├── ofertas/         # Zona de ofertas y liquidación
│   ├── productos/       # Catálogo con buscador, filtros y pipes
│   ├── services/        # Servicios REST (Product, UserService, Cart)
│   ├── tienda/          # Hub de categorías y selección destacada
│   ├── app.routes.ts    # Configuración de rutas y guards
│   └── app.ts           # Componente raíz
├── styles.css           # Tokens CSS globales y estilos de diseño
└── db.json              # Base de datos simulada para JSON Server
```

---

## 🌐 Instrucciones para Despliegue en la Nube

Para generar el paquete de producción:

```bash
npm run build
```

Los artefactos listos para producción se generarán en la carpeta `dist/powerfit-market/browser`.

### Opciones recomendadas de despliegue:
- **Vercel**: Importar el repositorio desde GitHub seleccionando el framework Angular y configurando la salida en `dist/powerfit-market/browser`.
- **Netlify**: Conectar repositorio o arrastrar la carpeta `dist/powerfit-market/browser` con redirección `/*  /index.html  200` en `_redirects`.
- **Firebase Hosting**: Ejecutar `firebase init hosting` y seleccionar `dist/powerfit-market/browser` como public directory con reescritura para SPA.
