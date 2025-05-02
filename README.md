# Hotelinking

Una pequeña plataforma web donde los usuarios pueden registrarse, acceder a una lista de ofertas, generar códigos promocionales únicos y canjearlos. Está desarrollada con React + Vite en el frontend, y se conecta con una API backend para gestionar autenticación, generación y canjeo de códigos promocionales.

## Funcionalidades

- Registro y login de usuarios.
- Visualización de una lista de ofertas una vez logueado.
- Generación de códigos promocionales únicos por cada oferta.
- Visualización de los códigos generados por el usuario.
- Canjeo de códigos promocionales (marcado como canjeado).
- Feedback visual para todas las acciones del usuario.

## Autenticación y rutas protegidas

Para acceder a la mayoría de las funcionalidades, **es obligatorio estar autenticado**.

### Rutas protegidas:

- `/offer-list`: muestra la lista de ofertas disponibles para generar un código promocional.
- `/promotional-codes`: muestra el listado de códigos promocionales generados por el usuario y permite canjearlos.

Estas rutas están protegidas mediante lógica de frontend, por lo tanto:

1. Primero, el usuario debe **registrarse**.
2. Luego debe **iniciar sesión** (login).
3. Al autenticarse correctamente, se accede al contenido protegido mediante el token almacenado.



## Tecnologías utilizadas

- **React** 19
- **Vite** 6
- **TypeScript**
- **Redux Toolkit** para manejo de estado
- **React Router Dom** para navegación
- **TailwindCSS** para estilos
- **Axios** para peticiones HTTP
- **React Toastify** para notificaciones

## Instalación y ejecución en local

### Prerrequisitos

- Node.js ≥ 18
- npm ≥ 9

### 1. Clona el repositorio

```bash
git clone https://github.com/Javierdigital85/hotelinking-frontend
cd hotelinking
```

### 2. Clona el repositorio

```bash
npm install

```

### 3. Levanta el servidor de desarrollo

```bash
 npm run dev
```
