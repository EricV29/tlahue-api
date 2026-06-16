<div align="center">
    <img width="80" src="https://skillicons.dev/icons?i=express" alt="Express Logo"/>

# Tlahue API

API RESTful encargada de la lógica de negocio, validación de datos y persistencia de información para el ecosistema del proyecto Tlahue.

</div>

#

<p align="center" >
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,ts,postgres,pnpm" />
    <img src="https://skills.syvixor.com/api/icons?i=drizzle" />

  </a>
  <br />
  <img src="https://img.shields.io/badge/Express_5-000000?logo=express&logoColor=fff" />
  <img src="https://img.shields.io/badge/TypeScript_6.0-3178C6?logo=typescript&logoColor=fff" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=000" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff" />
  <img src="https://img.shields.io/badge/pnpm_11-F69220?logo=pnpm&logoColor=fff" />
</p>

## 📋 Tabla de contenidos

- [Tlahue API](#tlahue-api)
- [](#)
  - [📋 Tabla de contenidos](#-tabla-de-contenidos)
  - [📖 Descripción](#-descripción)
  - [🛠️ Tecnologías](#️-tecnologías)
  - [✅ Requisitos previos](#-requisitos-previos)
  - [🔗 Repositorios relacionados](#-repositorios-relacionados)
  - [🚀 Instalación](#-instalación)
  - [⚙️ Configuración](#️-configuración)
  - [💻 Uso](#-uso)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [📄 Licencia](#-licencia)

---

## 📖 Descripción

Servicio backend desarrollado con Express 5 y TypeScript enfocado en proveer servicios API seguros y escalables. La arquitectura implementa capas esenciales de robustez como validación estricta de datos con Zod, registro de actividad centralizado por medio de Winston, y protección perimetral usando Helmet, CORS y políticas distribuidas de límite de peticiones (Express Rate Limit).

---

## 🛠️ Tecnologías

| Capa / Componente              | Tecnología                       |
| ------------------------------ | -------------------------------- |
| Core Framework                 | Express 5                        |
| Lenguaje                       | TypeScript 6.0                   |
| ORM                            | Drizzle ORM                      |
| Driver de Base de Datos        | Postgres.js                      |
| Validación de Esquemas         | Zod                              |
| Seguridad y Middleware         | Helmet, CORS, Express Rate Limit |
| Registro e Historial (Logging) | Winston, Morgan                  |
| Entorno de Ejecución en Dev    | tsx (TypeScript Execute)         |
| Administrador de Paquetes      | pnpm 11                          |

---

## ✅ Requisitos previos

Antes de inicializar el proyecto, asegúrate de contar con los siguientes elementos instalados en tu entorno de desarrollo:

- Node.js
- pnpm
- Una cuenta en [Supabase](https://www.supabase.com)

---

## 🔗 Repositorios relacionados

| Proyecto  | Repositorio                                            | Live                                                         |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| Front-End | [TlahueWeb](https://github.com/EricV29/tlahue-web.git) | [tlahuelilpan.netlify.app](https://tlahuelilpan.netlify.app) |

---

## 🚀 Instalación

```bash
# 1. Clona el repositorio
git clone git clone https://github.com/EricV29/tlahue-api.git

# 2. Dirígete a la carpeta raíz del proyecto
cd tlahue-api

# 3. Instala las dependencias declaradas
pnpm install

# 4. Prepara el archivo de configuración local
cp .env.example .env
```

---

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con tus credenciales:

```env
DATABASE_URL="URL OF SUPABASE DATABASE"
API_KEY="KEY FOR YOUR API ACCESS"
CORS_ORIGIN="URL OF FRONTEND (e.g. https://tlahue.netlify.app)"
```

---

## 💻 Uso

```bash
# Iniciar el servidor en modo desarrollo
pnpm dev

# Transpilar el código TypeScript hacia código JavaScript listo para producción
pnpm build

# Ejecutar el build de JavaScript nativo
pnpm start

# Generar archivos de migración basados en los esquemas de código TypeScript
pnpm db:generate

# Sincronizar y aplicar las migraciones pendientes en la db
pnpm db:migrate

# Empujar cambios de manera directa a la db
pnpm db:push
```

> ⚠️ Antes de iniciar el servidor por primera vez, asegúrate de haber ejecutado `pnpm db:migrate` para aplicar los esquemas en la base de datos.

Accede a la app en `http://localhost:3000`.

---

## 📁 Estructura del Proyecto

```
├── src/
│   ├── config/                # Configuraciones iniciales (Winston, variables de entorno)
│   ├── db/                    # Conexión a la base de datos y esquemas relacionales
│   │   ├── schema.ts          # Declaración de tablas y esquemas de Drizzle
│   │   └── index.ts           # Inicialización del cliente Postgres
│   ├── middlewares/           # Controladores intermedios (Manejo de errores, Rate limits)
│   ├── routes/                # Rutas de la API estructuradas por submódulos
│   ├── controllers/           # Controladores que procesan la lógica de negocio
│   ├── utils/                 # Validaciones auxiliares de Zod y utilidades globales
│   └── index.ts               # Punto de arranque principal de la API
├── drizzle.config.ts          # Configuración del motor Drizzle Kit
├── .env.example               # Plantilla de variables de entorno del servidor
├── package.json
├── tsconfig.json              # Configuración interna del compilador de TypeScript
└── README.md
```

## 📄 Licencia

Este proyecto es de código abierto. Consulta el archivo `LICENSE` para más detalles.
