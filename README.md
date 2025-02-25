# WebPlayer - Reproductor de Música

WebPlayer es una aplicación web moderna para reproducir música, desarrollada con **React**, **TypeScript**, **Vite**, **TailwindCSS**, **Zustand** en el frontend, y **Node.js**, **Express**, **MongoDB/MySQL**, **JWT** en el backend. La aplicación permite a los usuarios autenticarse, buscar canciones, reproducir música, marcar canciones como favoritas y, si tienen permisos de administrador, gestionar el catálogo de canciones (subir, editar y eliminar).


## Características principales

### Frontend
- **Reproducción de música**: Reproduce canciones con controles básicos (play/pause, siguiente, anterior, volumen).
- **Autenticación**: Los usuarios pueden registrarse e iniciar sesión.
- **Búsqueda**: Busca canciones por nombre o artista.
- **Favoritos**: Los usuarios pueden marcar canciones como favoritas y filtrar la lista para ver solo sus favoritas.
- **Panel de administración**: Los usuarios con rol de administrador pueden subir, editar y eliminar canciones.
- **Diseño responsive**: La aplicación está optimizada para dispositivos móviles y desktop.

### Backend
- **Autenticación JWT**: Registro, inicio de sesión y renovación de tokens.
- **Gestión de canciones**: CRUD completo para canciones, incluyendo la posibilidad de marcar como favoritas.
- **Gestión de archivos**: Subida y eliminación de archivos de audio e imágenes.
- **Swagger**: Documentación de la API disponible en `/api-docs`.
- **Pruebas unitarias**: Pruebas automatizadas para endpoints clave.

---

## Tecnologías utilizadas

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **Zustand** (gestión de estado)
- **React Router** (enrutamiento)
- **Axios** (peticiones HTTP)
- **React Query** (gestión de datos)
- **Lucide React** (iconos)

### Backend
- **Node.js**
- **Express**
- **MongoDB** o **MySQL** (según configuración)
- **JWT** (autenticación)
- **Multer** (gestión de archivos)
- **Swagger** (documentación de la API)
- **Jest** (pruebas unitarias)

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (v16 o superior)
- **npm** o **yarn** (gestor de paquetes)
- **MongoDB** o **MySQL** (dependiendo de la configuración del backend)

---

## Configuración del proyecto

### Frontend

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/carloscarrete-sp-music.git
   cd carloscarrete-sp-music
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env-template`.
   - Define la variable `VITE_API_URL` con la URL de tu API backend.

   Ejemplo:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   ```

4. **Ejecuta el proyecto**:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

   La aplicación estará disponible en `http://localhost:5173`.

### Backend

1. **Clona el repositorio del backend**:
   ```bash
   git clone https://github.com/carloscarrete/backend-tracks.git
   cd backend-tracks
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env-template`.
   - Define las variables necesarias, como `DB_URI`, `JWT_SECRET`, etc.

   Ejemplo:
   ```env
   NODE_ENV=dev
   PORT=3000
   DB_URI=mongodb://localhost:27017/webplayer
   JWT_SECRET=mysecretkey
   ```

4. **Ejecuta el proyecto**:
   ```bash
   npm start
   # o
   yarn start
   ```

   El backend estará disponible en `http://localhost:3000`.

---

## Estructura del proyecto

### Frontend
```
carloscarrete-sp-music/
├── public/                 # Archivos públicos (imágenes, etc.)
├── src/                    # Código fuente de la aplicación
│   ├── actions/            # Acciones para interactuar con la API
│   ├── api/                # Configuración de la API (Axios)
│   ├── assets/             # Recursos estáticos (imágenes, fuentes, etc.)
│   ├── auth/               # Lógica de autenticación
│   ├── entities/           # Entidades del dominio (modelos de datos)
│   ├── helpers/            # Funciones de utilidad
│   ├── interfaces/         # Interfaces de TypeScript
│   ├── mappers/            # Mapeadores para transformar datos
│   ├── router/             # Configuración de rutas (React Router)
│   ├── store/              # Gestión de estado (Zustand)
│   ├── webplayer/          # Componentes y páginas del reproductor
│   ├── App.css             # Estilos globales
│   ├── main.tsx            # Punto de entrada de la aplicación
│   └── vite-env.d.ts       # Tipos de Vite
├── .env-template           # Plantilla para variables de entorno
├── eslint.config.js        # Configuración de ESLint
├── index.html              # Página principal de la aplicación
├── package.json            # Dependencias y scripts del proyecto
├── tailwind.config.ts      # Configuración de TailwindCSS
├── tsconfig.json           # Configuración de TypeScript
├── vite.config.ts          # Configuración de Vite
└── README.md               # Este archivo
```

### Backend
```
carloscarrete-backend-tracks/
├── app.js                  # Punto de entrada del backend
├── config/                 # Configuración de la base de datos
├── controllers/            # Controladores para manejar las rutas
├── docs/                   # Documentación de la API (Swagger)
├── middleware/             # Middlewares personalizados
├── models/                 # Modelos de datos (MongoDB/MySQL)
├── routes/                 # Definición de rutas
├── storage/                # Almacenamiento de archivos subidos
├── tests/                  # Pruebas unitarias
├── utils/                  # Utilidades y helpers
├── validators/             # Validadores para las solicitudes
├── .env-template           # Plantilla para variables de entorno
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación del backend
```

---

## Scripts disponibles

### Frontend
- **`npm run dev`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Compila el proyecto para producción.
- **`npm run lint`**: Ejecuta ESLint para verificar el código.
- **`npm run preview`**: Sirve la versión de producción localmente.

### Backend
- **`npm start`**: Inicia el servidor de backend.
- **`npm run dev`**: Inicia el servidor en modo desarrollo con nodemon.
- **`npm test`**: Ejecuta las pruebas unitarias.

---

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature o corrección: `git checkout -b mi-feature`.
3. Realiza tus cambios y haz commit: `git commit -m 'Añadir nueva feature'`.
4. Sube tus cambios: `git push origin mi-feature`.
5. Abre un Pull Request en GitHub.

---

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
