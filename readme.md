# mi-proyecto-adso

Repositorio de prueba y desarrollo para el programa **ADSO** (Análisis y Desarrollo de Software). El proyecto está organizado de forma modular entre cliente, servidor y capa de datos (relacional con PostgreSQL/PLpgSQL y documental con MongoDB).

## Tecnologías principales

- **JavaScript** (70.6%) — Lógica de aplicación en cliente y/o servidor.
- **PLpgSQL** (29.4%) — Funciones, procedimientos y scripts de base de datos en **PostgreSQL**.
- **MongoDB** — Almacenamiento de documentos/colecciones (ideal para logs, registros flexibles o datos no relacionales según el módulo).
- **Bruno** — Colecciones y archivos `.yml` para pruebas/documentación de endpoints en el servidor.

## Estructura del repositorio

```text
mi-proyecto-adso/
├── client/      # Aplicación o interfaz de cliente
├── database/    # Scripts, esquemas, objetos PLpgSQL y configuraciones de BD
├── server/      # Servicios / API, conexión a BD y archivos de pruebas (.yml para Bruno)
└── readme.md    # Documentación del proyecto