# <center>TOURISPLAN </center>

 <center>Planes turisticos por COLOMBIA 
 <center>Realiza tu reserva facil y sencillo sin salir de tu casa.  🏖️

Aplicación web para la consulta y reserva de planes turísticos en Colombia, desarrollada con Next.js y enfocada en prácticas ágiles, CI/CD y seguridad.

## Tabla de Contenido

- [Descripción:](#descripción)
- [Características Principales:](#características-principales)
- [Stack Tecnológico:](#stack-tecnológico)
- [Pasos para correr el proyecto:](#pasos-para-correr-el-proyecto)
  - [Pre-requisitos](#pre-requisitos)
  - [Instalación](#instalación)
  - [Ejecutar el Proyecto:](#correr-el-proyecto)
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

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#) [![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#) [![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white)](#) [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#) [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)

- **Framework Frontend/Backend:** [Next.js](https://nextjs.org/) (React)
- **Lenguaje:** JavaScript / TypeScript
- **Autenticación:** [NextAuth.js](https://next-auth.js.org/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/).
  - **ORM :** [Prisma](https://www.prisma.io/)
- **API Externa:** [api-colombia](https://api-colombia.com/)
- **Contenerización:** [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)

## Pasos para correr el proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Pre-requisitos

- [Node.js](https://nodejs.org/) (Versión LTS recomendada), `package.json`.
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) y [Docker Compose](https://docs.docker.com/compose/install/) (Recomendado para un entorno consistente)

### Instalación

1.  **Clona el repositorio:**

```bash
git clone https://github.com/ciscojuan/tourisplan.git
cd tourisplan
```

2. **Crea un archivo** `.env` en la raíz del proyecto y configura las siguientes variables.

```bash
# Base de Datos
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Autenticación (NextAuth.js)
# Genera un secreto seguro con: openssl rand -hex 32
NEXTAUTH_SECRET="TU_NEXTAUTH_SECRET_AQUI"

# Configuración de Proveedores OAuth (si usas Google, GitHub, etc.)

NOGITHUB_ID="***"
NOGITHUB_SECRET=""

GOOGLE_CLIENT_ID="***"
GOOGLE_CLIENT_SECRET="***"
```

Para crear las credenciales OAuth de google y github, Ver [documentacion del proyecto](https://github.com/ciscojuan/tourisplan/wiki#configuraci%C3%B3n-de-oauth)

3. ### Correr el proyecto

```bash
docker-compose up -d
```

3. **Acceder a la Aplicación:**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## CI/CD

Este proyecto utiliza GitHub Actions para CI/CD. Los flujos de trabajo incluyen:

- Pruebas automatizadas en cada Pull Request
- Análisis de seguridad y calidad de código
- Despliegue automático a entornos de staging y producción

## Seguridad

- Protección contra ataques comunes (XSS, CSRF, etc.)
- Análisis de vulnerabilidades con GitHub code security, Snyk
- Evaluación de riesgos con CVSS 4.0

## Documentación Adicional

- Documentacion del proyecto: arquitectura, seguridad, etc [Accede a la WIKI del Proyecto](https://github.com/ciscojuan/tourisplan/wiki#configuraci%C3%B3n-de-oauth)
- Archivo SBOM (lista de materiales de software) [Ver archivo](https://github.com/ciscojuan/tourisplan/blob/develop/tourisplan-sbom.json)
- Video demostrativo de la aplicación
- Contenedor desde [DockerHub](https://hub.docker.com/repository/docker/jrami1519/tourisplan/general)

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

```

```
