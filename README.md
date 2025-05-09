# <center>TOURISPLAN </center>

 <center>Planes turisticos por COLOMBIA 
 <center>Realiza tu reserva facil y sencillo sin salir de tu casa.  🏖️

Aplicación web para la consulta y reserva de planes turísticos en Colombia, desarrollada con Next.js y enfocada en prácticas ágiles, CI/CD y seguridad.

## Tabla de Contenido

- [Descripción](#descripción)
- [Características Principales](#características-principales)
- [Stack Tecnológico](#stack-tecnológico)
- [Empezando](#empezando)
  - [Pre-requisitos](#pre-requisitos)
  - [Instalación](#instalación)
  - [Variables de Entorno](#variables-de-entorno)
  - [Ejecutar en Desarrollo](#ejecutar-en-desarrollo)
- [Ejecutar con Docker](#ejecutar-con-docker)
- [Ejecutar Pruebas](#ejecutar-pruebas)
- [Construcción para Producción](#construcción-para-producción)
- [CI/CD](#cicd)
- [Seguridad](#seguridad)
- [Documentación Adicional](#documentación-adicional)
- [Licencia](#licencia)

## Descripción

TourisPlan permite a los usuarios descubrir emocionantes planes turísticos en Colombia, ofrecidos a través de la integración con `api-colombia`. Los usuarios pueden registrarse, autenticarse, explorar los detalles de cada plan y realizar reservas de forma sencilla y segura.

El proyecto se desarrolla siguiendo un enfoque ágil, con integración continua y despliegue continuo (CI/CD) a través de GitHub Actions, e incorpora prácticas de seguridad robustas, incluyendo análisis de vulnerabilidades con GitHub code security y evaluación con CVSS 4.0.

## Características Principales

- ✅ **Autenticación de Usuarios:** Registro e Inicio de Sesión seguros (potenciado por NextAuth.js/Auth.js).
- 🔎 **Exploración de Planes:** Visualización de planes turísticos obtenidos desde `api-colombia`.
- ℹ️ **Vista Detallada:** Información completa de cada plan turístico.
- 📅 **Sistema de Reservas:** Funcionalidad para que usuarios autenticados reserven planes.
- 🔒 **Seguridad:** Implementación de prácticas estándar de seguridad web.
- 🔄 **CI/CD:** Pipeline automatizado para integración, pruebas y despliegue.
- 🐳 **Contenerización:** Configuración para ejecutar la aplicación con Docker.

## Stack Tecnológico

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#) [![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#) [![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white)](#) [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](#) [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#) [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)

- **Framework Frontend/Backend:** [Next.js](https://nextjs.org/) (React)
- **Lenguaje:** JavaScript / TypeScript (Opcional)
- **Autenticación:** [NextAuth.js / Auth.js](https://next-auth.js.org/)
- **Base de Datos:** Externa (Ej. [PostgreSQL](https://www.postgresql.org/), [MongoDB](https://www.mongodb.com/)) - Configurada vía `DATABASE_URL`.
  - **ORM :** [Prisma](https://www.prisma.io/)
- **API Externa:** [api-colombia](https://api-colombia.com/)
- **Contenerización:** [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)
- **Estilos (Ejemplo):** [Tailwind CSS](https://tailwindcss.com/)

## Pasos para correr el proyecto en desarrollo

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Pre-requisitos

- [Node.js](https://nodejs.org/) (Versión LTS recomendada), `package.json`.
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) y [Docker Compose](https://docs.docker.com/compose/install/) (Recomendado para un entorno consistente)

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/tourisplan.git
    cd tourisplan
    ```

2.  **Instala los módulos necesarios de node:**
    ```bash
    npm install
    ```
3.  **Hacer migracion de prisma:**

```
npx prisma migrate dev
```

4.  **generar el cliente**

```
npx prisma generate
```

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y configura las siguientes variables. **Nunca subas este archivo a Git si contiene secretos o maneja secretos en el mismo Github.**

```bash
# Base de Datos (Ejemplo para PostgreSQL con Prisma)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Autenticación (NextAuth.js / Auth.js)
# Genera un secreto seguro con: openssl rand -hex 32
NEXTAUTH_SECRET="TU_NEXTAUTH_SECRET_AQUI"
NEXTAUTH_URL="http://localhost:3000" # Cambiar en producción

# Configuración de Proveedores OAuth (si usas Google, GitHub, etc.)
# GOOGLE_CLIENT_ID="..."
# GOOGLE_CLIENT_SECRET="..."
```

### Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Ejecutar con Docker

Para ejecutar la aplicación con Docker:

```bash
# Construir la imagen
docker build -t tourisplan .

# Ejecutar el contenedor
docker run -p 3000:3000 tourisplan
```

O con Docker Compose:

```bash
docker-compose up
```

## CI/CD

Este proyecto utiliza GitHub Actions para CI/CD. Los flujos de trabajo incluyen:

- Pruebas automatizadas en cada Pull Request
- Análisis de seguridad y calidad de código
- Despliegue automático a entornos de staging y producción

## Seguridad

- Implementación de HTTPS
- Protección contra ataques comunes (XSS, CSRF, etc.)
- Análisis de vulnerabilidades con GitHub code security
- Evaluación de riesgos con CVSS 4.0

## Documentación Adicional

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
