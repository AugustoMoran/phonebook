# Phonebook Frontend

Frontend de la aplicación Phonebook con React + Vite.

## Demo en producción

- URL: https://phonebook-ausar.fly.dev/

## Tecnologías

- React
- Vite
- Axios
- ESLint
- Vitest + Testing Library
- Playwright

## Funcionalidades

- Crear contactos
- Buscar y filtrar por nombre
- Editar número de un contacto existente
- Eliminar contactos
- Notificaciones de éxito/error
- Manejo de errores cuando el recurso ya no existe en backend

## Estructura principal

- `src/App.jsx` → composición de UI
- `src/hooks/usePersons.js` → lógica de negocio (fetch + CRUD + notificaciones)
- `src/components/` → componentes presentacionales
- `src/services/persons.js` → llamadas HTTP con Axios
- `e2e/` → pruebas end-to-end (Playwright)

## Ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar frontend:

```bash
npm run dev
```

Disponible en: `http://localhost:5173`

> Nota: para funcionamiento completo necesitás el backend corriendo en `http://localhost:3001`.

## Scripts

- `npm run dev` → servidor de desarrollo
- `npm run build` → build de producción
- `npm run preview` → vista previa del build
- `npm test` → pruebas unitarias/componentes (`vitest run src`)
- `npm run test:e2e` → pruebas E2E con Playwright
- `npm run test:e2e:ui` → modo UI de Playwright
- `npm run test:e2e:report` → abrir reporte HTML de Playwright

## Testing

### Unitarias / componentes

Se ejecutan con Vitest + Testing Library y cubren componentes clave de la interfaz.

### End-to-end

Para ejecutar E2E correctamente:

1. Levantar backend (`backend`, idealmente en modo test si usás reset endpoint).
2. Levantar frontend (`npm run dev`).
3. Ejecutar:

```bash
npm run test:e2e
```

## Integración con backend

El frontend consume rutas `/api/*` y Vite las redirige al backend mediante proxy (`vite.config.js`).

## Estado del proyecto

- Frontend funcional ✅
- Tests unitarios/componentes pasando ✅
- Suite E2E disponible y operativa ✅
