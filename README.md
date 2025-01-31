# API de Autenticación con Arquitectura Screaming

Este proyecto es una API de backend para autenticación construida utilizando la Arquitectura Screaming. La estructura del proyecto está diseñada para que los nombres de los archivos y carpetas "griten" su propósito, haciendo que el flujo de la aplicación sea claro y fácil de entender.

## Estructura del Proyecto

La estructura del proyecto sigue los principios de la Arquitectura Screaming basando en las funcionalidades, donde cada carpeta y archivo refleja claramente su funcionalidad. Aquí está la organización principal:

```
src/
│
├── config/       # Configuración del proyecto
│   └── env.ts
│
├── server/                                 # Configuración del servidor
│   ├── server.ts
│
├── utils/     # Utilidades globales
│
├── __tests__/                              # Pruebas de integración y endpoints
│   └── server.test.ts                  # Pruebas para el servidor
│
└── app.ts                                  # Punto de entrada de la aplicación
```
   
## Principios de la Arquitectura Screaming

- **Claridad y Propósito**: Los nombres de los archivos y carpetas deben reflejar claramente su funcionalidad.
- **Organización por Funcionalidad**: El código se organiza en torno a las funcionalidades principales de la aplicación.
- **Facilidad de Mantenimiento**: Una estructura clara facilita la comprensión y mantenimiento del código.

## Funcionalidades Implementadas


## Cómo Ejecutar

1. Clona el Repositorio:

   ```bash
   git clone https://github.com/devAngelOrtiz/authNodeTs.git
   cd tu-repositorio
   ```

2. Instala las Dependencias:

   ```bash
   npm install
   ```

3. Configura las Variables de Entorno:

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```env
   JWT_SECRET=Y3D*1m9B$#Aqz!8Lp^t@hWx+7VfGj&KoR
   JWT_EXPIRES=1d
   AWS_CONNECTION_STRING=postgres://<user>:<password>@<domain>:<port>/<database>
   CORS=*
   RATE_MAX=2
   RATE_TIME=1 second
   LOG_LEVEL=debug
   ```

   Si deseas generar un nuevo secret ejecuta el siguiente comando
   ```bash
   npm run secret
   ```

4. Ejecuta el Proyecto:

   ```bash
   npm start
   ```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **TypeScript**: Para tipado estático y mejor organización del código.
- **Fastify**: Framework para construir APIs RESTful.

### Scripts en `package.json`

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

### Ejecución de las Pruebas

Ejecutar todas las pruebas con reporte de cobertura:

```bash
npm test
```

## Licencia

Este proyecto está bajo la licencia MIT. Siéntete libre de usarlo y modificarlo según tus necesidades.

## Autor

- **Nombre**: Angel Ortiz Olivera
- **Email**: dev.angel.ortiz@gmail.com
- **GitHub**: [https://github.com/devAngelOrtiz](https://github.com/devAngelOrtiz)


¡Espero que este proyecto te sea útil! 😊