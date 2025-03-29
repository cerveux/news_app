# News API - Mindfactory Backend Challenge

## Descripción

Esta API REST desarrollada con Node.js, TypeScript y PostgreSQL permite gestionar un sistema de noticias con autenticación JWT. Implementa los requerimientos del desafío técnico de Mindfactory, incluyendo CRUD de artículos y autenticación de usuarios.

## Características principales

- Autenticación JWT para operaciones protegidas
- CRUD completo de artículos de noticias
- Búsqueda de artículos
- Documentación Swagger/OpenAPI
- Dockerizado con PostgreSQL
- Pruebas de integración con Jest
- Validación de datos
- Seguridad básica implementada

## Requisitos

- Node.js v18+
- Docker y Docker Compose
- PostgreSQL (incluido en Docker)

## Endpoints disponibles

### Autenticación
- `POST /api/user` - Registro de nuevo usuario
- `POST /api/auth/login` - Autenticación de usuario

### Artículos 
- `POST /api/article` - Crear nuevo artículo (requieren autenticación)
- `GET /api/article` - Listar todos los artículos (cuenta con paginación)
- `GET /api/article/:id` - Obtener detalle de artículo
- `PUT /api/article/:id` - Actualizar artículo (requieren autenticación)
- `DELETE /api/article/:id` - Eliminar artículo (requieren autenticación)

## Instalación y configuración

### 1. Desarrollo local (sin Docker)

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno (crear archivo `.env`):
   ```
   PORT=3000
   SECRET=tu_secreto_jwt
   HOST_DATABASE=localhost
   NAME_DATABASE=mindfactory
   USER_DATABASE=mindfactory
   PASSWORD_DATABASE=mindfactory
   NODE_ENV=development
   ```
4. Configurar variables de entorno de test (crear archivo `.env.test`):
   ```
   HOST_DATABASE = localhost
   USER_DATABASE = mindfactory
   NAME_DATABASE = mindfactory_test
   PASSWORD_DATABASE = mindfactory
   NODE_ENV = test
   ```
5. Iniciar base de datos PostgreSQL local
6. Crear base de datos de desarrollo mindfactory
7. Crear base de datos de desarrollo mindfactory_test
8. Ejecutar la aplicación:
   ```bash
   npm tests
   ```
9. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

### 2. Ejecución con Docker Compose

1. Asegurarse de tener Docker y Docker Compose instalados
2. Desde la raíz del proyecto ejecutar:
   ```bash
   docker compose up --build
   ```
3. La API estará disponible en `http://localhost:3000`

### Variables de entorno en Docker

Las siguientes variables están configuradas en el docker-compose.yml:

- `SECRET`: Secreto para JWT
- `PORT`: Puerto de la aplicación (3000)
- `HOST_DATABASE`: Host de la base de datos (db)
- `NAME_DATABASE`: Nombre de la base de datos (mindfactory)
- `USER_DATABASE`: Usuario de la base de datos (mindfactory)
- `PASSWORD_DATABASE`: Contraseña de la base de datos (mindfactory)
- `NODE_ENV`: Entorno de ejecución (production)


## Documentación de la API

La API incluye documentación Swagger/OpenAPI disponible en:

```
http://localhost:3000/docs
```

## Consideraciones de seguridad

- Las rutas de creación, modificación y borrado de artículos requieren autenticación JWT
- Las contraseñas se almacenan hasheadas con bcrypt
- Validación de datos en todos los endpoints
- Configuración segura de JWT

## Arquitectura

La aplicación sigue una arquitectura por capas:

1. **Capa de rutas**: Maneja las solicitudes HTTP
2. **Capa de controladores**: Gestiona la lógica de la API
3. **Capa de modelos**: Interactúa con la base de datos

## Mejoras futuras

- Implementar paginación en los listados
- Añadir filtros avanzados de búsqueda
- Sistema de roles y permisos
- Logging más detallado
- Rate limiting
- Sistema de caché

## Contacto

Diego Guzman  
[mailto:guzman.diego@outlook.com.ar](mailto:guzman.diego@outlook.com.ar)  
[LinkedIn](https://www.linkedin.com/in/diego-guzman-cerveux/)