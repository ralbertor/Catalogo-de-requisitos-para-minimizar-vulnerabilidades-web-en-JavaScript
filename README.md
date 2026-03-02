# Catálogo de Requisitos para Minimizar Vulnerabilidades Web en JavaScript
## 📌 Descripción del Proyecto

Este repositorio contiene el prototipo de validación técnica desarrollado en el marco del Trabajo Fin de Grado titulado:

“Catálogo de requisitos para minimizar vulnerabilidades web en JavaScript”

El objetivo del proyecto es diseñar, estructurar y validar un catálogo sistemático de requisitos de seguridad orientado a mitigar las vulnerabilidades más comunes en aplicaciones web desarrolladas con JavaScript, tanto en cliente como en servidor.

El catálogo ha sido elaborado a partir del análisis de estándares internacionales como:

**OWASP**

**National Institute of Standards and Technology**

y alineado con marcos de referencia como:

**OWASP Top 10**

**NIST SP 800-53**

## 🎯 Objetivo del Repositorio

Este repositorio no contiene únicamente código funcional, sino una implementación práctica de validación del catálogo de requisitos de seguridad propuesto en el TFG.

El propósito es demostrar empíricamente que los requisitos definidos:

Son técnicamente viables.

Pueden integrarse en un entorno real.

Mitigan vulnerabilidades frecuentes como:

- XSS

- CSRF

- Inyección de código

- Gestión insegura de sesiones

- Uso de dependencias vulnerables

## 🧠 Marco Conceptual

El catálogo se fundamenta en los principios clásicos de seguridad:

- Confidencialidad

- Integridad

- Disponibilidad

- Autenticación

- Autorización

Y organiza los requisitos en tres bloques principales:

- Requisitos en fase de desarrollo

- Requisitos en implementación

- Requisitos en despliegue y mantenimiento

## 🛠 Tecnologías Utilizadas

El prototipo ha sido desarrollado con:

- Node.js

- Express

- bcrypt (hash de contraseñas)

- Helmet (cabeceras de seguridad)

- Middleware de protección CSRF

- Validación y sanitización de entradas

- Rate limiting

- Gestión segura de sesiones

## 🔐 Medidas de Seguridad Implementadas en el Prototipo

El entorno implementa múltiples requisitos del catálogo, entre ellos:

- Validación y Sanitización de Entradas

  - Control estricto de input del usuario.

  - Prevención de inyección de código.

  - Mitigación de XSS mediante escape contextual.

- Gestión Segura de Autenticación

  - Hashing de contraseñas con bcrypt.

  - Protección contra fuerza bruta mediante rate limiting.

  - Comparaciones en tiempo constante.

- Protección contra CSRF

  - Implementación de tokens CSRF.

  - Configuración segura de cookies.

- Seguridad en Cabeceras HTTP

  - Content-Security-Policy

  - X-Frame-Options

  - Strict-Transport-Security

  - X-Content-Type-Options

- Gestión Segura de Sesiones

  - Cookies HTTPOnly

  - Configuración SameSite

  - Expiración controlada

- Gestión de Dependencias

  - Auditoría periódica de librerías

  - Reducción de superficie de ataque

## 🧪 Validación del Catálogo

El catálogo fue validado mediante:

- Prototipo funcional desarrollado en Node.js

- Pruebas unitarias e integración

- Evaluación cualitativa asistida por modelo de IA generativa (GPT-4.5)

- Contraste con estándares OWASP y NIST

Los resultados confirmaron:

- Coherencia estructural del catálogo

- Cobertura adecuada frente a OWASP Top 10

- Aplicabilidad real en entornos de desarrollo

## 🚀 Instalación y Ejecución
Requisitos previos

Node.js (v18 o superior)

npm

Instalación:
`git clone https://github.com/ralbertor/Catalogo-de-requisitos-para-minimizar-vulnerabilidades-web-en-JavaScript.git
cd Catalogo-de-requisitos-para-minimizar-vulnerabilidades-web-en-JavaScript
npm install
Ejecución
npm start`

El servidor se iniciará en:

`http://localhost:3000`
## 📊 Alcance Académico

- Este proyecto forma parte del Grado en Ingeniería Informática y constituye una contribución en el ámbito de:

  - Ingeniería de requisitos de seguridad

  - Seguridad en aplicaciones JavaScript

  - Integración de buenas prácticas en el ciclo de vida del software

  - Validación empírica de controles de seguridad

- El catálogo no pretende sustituir auditorías profesionales, sino servir como:

  - Guía estructurada para desarrolladores

  - Herramienta formativa

  - Servir de base para futuras investigaciones

## 🔮 Trabajo Futuro

Las líneas de evolución incluyen:

Adaptación del catálogo a frameworks modernos (React, Angular, Vue).

Integración automática en pipelines CI/CD.

Desarrollo de herramienta automatizada de verificación de requisitos.

Extensión hacia APIs REST y GraphQL.

## 👨‍🎓 Autor

Alberto Robles Reina
Grado en Ingeniería Informática
Universidad de Murcia

## 📄 Licencia

Este proyecto se distribuye con fines académicos y educativos.
