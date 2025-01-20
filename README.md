# Proyecto 7: API REST con Autenticación

Este proyecto es una API REST que permite la gestión de usuarios, discos y órdenes. Implementa autenticación con JWT y roles para restringir el acceso a ciertas rutas.

---

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB** con Mongoose
- **JWT (Json Web Token)** para autenticación
- **bcrypt** para el manejo seguro de contraseñas

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL-del-repositorio>
   ```

2. Accede a la carpeta del proyecto:

   ```bash
   cd Proyecto-7-API-REST-AUTH
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   DB_URL=<tu-URL-de-MongoDB>
   JWT_SECRET=<tu-clave-secreta-JWT>
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

   O usa nodemon para desarrollo:

   ```bash
   npm run dev
   ```

---

## Estructura del proyecto

```plaintext
src/
├── api/
│   ├── controllers/
│   │   ├── user.js
│   │   ├── disco.js
│   │   └── order.js
│   ├── models/
│   │   ├── user.js
│   │   ├── disco.js
│   │   └── order.js
│   └── routes/
│       ├── user.js
│       ├── disco.js
│       └── order.js
├── config/
│   └── db.js
├── middlewares/
│   └── isAuth.js
└── utils/
    └── jwt.js
```

---

## Endpoints principales

### **Usuarios** (`/api/v1/users`)

#### **POST** `/register`

- **Descripción**: Registrar un nuevo usuario.
- **Cuerpo**:
  ```json
  {
    "userName": "Nombre del usuario",
    "password": "Contraseña",
    "rol": "user"
  }
  ```

#### **POST** `/login`

- **Descripción**: Autenticar un usuario.
- **Cuerpo**:
  ```json
  {
    "userName": "Nombre del usuario",
    "password": "Contraseña"
  }
  ```

#### **GET** `/`

- **Descripción**: Obtener todos los usuarios (Solo para admins).

#### **PUT** `/:id`

- **Descripción**: Actualizar un usuario.

#### **DELETE** `/:id`

- **Descripción**: Eliminar un usuario.

---

### **Discos** (`/api/v1/discos`)

#### **GET** `/`

- **Descripción**: Obtener todos los discos.

#### **GET** `/:id`

- **Descripción**: Obtener un disco por su ID.

#### **POST** `/`

- **Descripción**: Crear un nuevo disco (Solo para admins).
- **Cuerpo**:
  ```json
  {
    "title": "Título del disco",
    "label": "Sello",
    "catalogue": "Número de catálogo",
    "img": "URL de la imagen"
  }
  ```

#### **PUT** `/:id`

- **Descripción**: Actualizar un disco (Solo para admins).

#### **DELETE** `/:id`

- **Descripción**: Eliminar un disco (Solo para admins).

---

### **Órdenes** (`/api/v1/orders`)

#### **POST** `/`

- **Descripción**: Crear una nueva orden.
- **Cuerpo**:
  ```json
  {
    "userId": "ID del usuario",
    "discos": [{ "discoId": "ID del disco", "quantity": 1 }],
    "total": 100.0
  }
  ```

#### **GET** `/:id`

- **Descripción**: Obtener las órdenes de un usuario.

#### **PUT** `/:id`

- **Descripción**: Actualizar el estado de una orden (Solo para admins).
- **Cuerpo**:
  ```json
  {
    "status": "shipped"
  }
  ```

#### **DELETE** `/:id`

- **Descripción**: Eliminar una orden.

---

## Middleware

### **isAuth**

- Verifica si el usuario está autenticado mediante un token JWT.

### **isAdmin**

- Verifica si el usuario tiene rol de administrador.

---

## Modelos principales

### **User**

- **Campos**:
  - `userName`: String, requerido.
  - `password`: String, requerido (almacenado encriptado con bcrypt).
  - `rol`: Enum (`admin`, `user`), por defecto `user`.

### **Disco**

- **Campos**:
  - `title`: String, requerido.
  - `label`: String, requerido.
  - `catalogue`: String, requerido.
  - `img`: URL de la imagen.

### **Order**

- **Campos**:
  - `userId`: Referencia a `User`.
  - `discos`: Array de discos con cantidad.
  - `total`: Número.
  - `status`: Enum (`pending`, `shipped`, `completed`, `cancelled`).

---

## Pruebas

Puedes probar los endpoints usando herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/). Asegúrate de incluir el token de autenticación para rutas protegidas.

---

## Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo libremente para fines educativos o comerciales.
