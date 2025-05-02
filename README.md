# Mini Clínica - Proyecto

Este es un proyecto de gestión de citas médicas desarrollado con las siguientes tecnologías:

## Tecnologías Utilizadas

### Frontend
- React Native con soporte para Web (React Native Web)
- Expo
- TypeScript
- React Navigation
- Axios
- Date-fns

### Backend
- Node.js
- Express
- TypeScript
- SQLite
- Express Validator
- UUID

## Estructura del Proyecto

- `frontend/` - Contiene la aplicación del cliente en React Native Web.
- `backend/` - Contiene el servidor y la API REST.

## Endpoints del Backend

- `POST /appointments` - Crear una nueva cita médica.
- `GET /appointments` - Listar todas las citas médicas.
- `GET /appointments/:id` - Obtener una cita médica por ID.
- `PUT /appointments/:id` - Actualizar una cita médica por ID.
- `DELETE /appointments/:id` - Eliminar una cita médica.

## Instalación del Proyecto

### Clonar el repositorio

```bash
git clone https://github.com/ABEL0S0/mini-clinica.git
cd mini-clinica
```

### Instalación de dependencias

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

## Scripts disponibles

### Frontend

```bash
npm run dev       # Iniciar en modo desarrollo web
npm run build     # Generar build para producción web
npm start         # Alias de dev
```
Accede al Frontend desde:
[http://localhost:8081](http://localhost:8081/)

### Backend

```bash
npm start         # Iniciar servidor backend
```
Accede al backend desde:
[http://localhost:3000](http://localhost:3000/)

## Autor

Proyecto Mini Clínica – Gestión de Citas Médicas
