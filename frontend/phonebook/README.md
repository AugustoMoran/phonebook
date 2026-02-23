# Phonebook Frontend - Full Stack Open Part 2

Aplicación de agenda telefónica con React y Vite.

## Ejercicios Completados

- ✅ 2.6-2.10: Phonebook - Formularios y estados
- ✅ 2.11: Phonebook - Filtrado de contactos
- ✅ 2.12-2.14: Phonebook - Datos en servidor con axios
- ✅ 2.15-2.18: Phonebook - CRUD completo
- ✅ 2.19-2.20: Phonebook - Notificaciones y manejo de errores

## Características

- ✨ Agregar nuevos contactos
- 🔍 Buscar y filtrar contactos
- ✏️ Actualizar números de teléfono
- 🗑️ Eliminar contactos
- 📢 Notificaciones de éxito y error
- 🔄 Integración completa con backend

## Desarrollo Local

### Opción 1: Con json-server (modo desarrollo simple)

```bash
npm install
npm run dev        # Frontend en puerto 5173
npm run server     # JSON Server en puerto 3001 (en otra terminal)
```

### Opción 2: Con backend real (recomendado)

1. Iniciar el backend (desde `part 3/phonebook-backend`):
```bash
npm run dev        # Backend en puerto 3001
```

2. Iniciar el frontend:
```bash
npm run dev        # Frontend en puerto 5173
```

El proxy de Vite redirigirá las peticiones `/api/*` al backend en `localhost:3001`.

## Producción

Para construir para producción:

```bash
npm run build
```

Los archivos se generarán en `/dist`. Estos archivos deben copiarse al directorio `dist/` del backend.

## Estructura

```
phonebook/
├── src/
│   ├── App.jsx              # Componente principal
│   ├── components/
│   │   ├── Filter.jsx       # Componente de búsqueda
│   │   ├── PersonForm.jsx   # Formulario para agregar/editar
│   │   ├── Persons.jsx      # Lista de personas
│   │   ├── Person.jsx       # Item individual
│   │   └── Notification.jsx # Mensajes al usuario
│   └── services/
│       └── persons.js       # Servicio axios para API
├── db.json                  # Base de datos local (json-server)
└── vite.config.js           # Configuración con proxy
```

## Tecnologías

- React 19.2.0
- Vite 7.2.4
- Axios 1.13.2
- json-server 1.0.0 (dev)
- ESLint 9.39.1
