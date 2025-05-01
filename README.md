# MCP (Modelo de Contexto de Protocolo)

Este proyecto es una implementación del Modelo de Contexto de Protocolo (MCP) siguiendo buenas prácticas de desarrollo.

## Tecnologías y herramientas

- **Node.js** - Entorno de ejecución
- **TypeScript** - Lenguaje de programación con tipado estático
- **pnpm** - Gestor de paquetes
- **ESLint** - Linter para identificar problemas en el código
- **Prettier** - Formateador de código
- **Zod** - Biblioteca de validación de esquemas

## Configuración de calidad de código

El proyecto está configurado con las siguientes herramientas para asegurar la calidad del código:

### TypeScript

El archivo `tsconfig.json` incluye configuraciones para:
- Modos estrictos habilitados
- Verificación de tipos avanzada
- Soporte para módulos ES

### ESLint

La configuración de ESLint en `eslint.config.mjs` usa el nuevo formato de configuración plana (Flat Config) e incluye:
- Reglas recomendadas para JavaScript y TypeScript
- Plugin de integración con Prettier
- Reglas específicas para buenas prácticas:
  - No usar variables sin usar
  - Preferir const sobre let cuando es posible
  - Siempre usar bloques en estructuras de control
  - Usar comparación estricta (===)

### Prettier

La configuración en `.prettierrc` define:
- Uso de comillas simples
- Punto y coma al final de las declaraciones
- Longitud de línea máxima
- Otras configuraciones para un formato consistente

## Comandos disponibles

```bash
# Iniciar en modo desarrollo
pnpm dev

# Construir el proyecto
pnpm build

# Iniciar en modo producción
pnpm start

# Verificar el código con ESLint
pnpm lint

# Corregir problemas automáticamente con ESLint
pnpm lint:fix

# Formatear el código con Prettier
pnpm format

# Inspeccionar el MCP utilizando el inspector
npx @modelcontextprotocol/inspector npx -y tsx src/main.ts
```

## Estructura del proyecto

- `src/main.ts` - Punto de entrada principal que implementa un servidor MCP con herramientas para consultar el clima
- `src/interfaces.ts` - Definición de interfaces para mejorar la legibilidad y documentación
- `dist/` - Código compilado (generado al ejecutar build)
- `eslint.config.mjs` - Configuración de ESLint en formato moderno (Flat Config)
- `.prettierrc` - Configuración de Prettier
- `tsconfig.json` - Configuración de TypeScript

## Buenas prácticas implementadas

- **Manejo de tipos**: Interfaces para mejorar la legibilidad y documentación
- **Manejo de errores**: Captura de excepciones con try/catch
- **Seguridad**: Escape de parámetros URL con `encodeURIComponent`
- **Código limpio**: Comentarios explicativos, nombres de variables descriptivos
- **Linting y formateo**: Configuración moderna de ESLint y Prettier para mantener consistencia 