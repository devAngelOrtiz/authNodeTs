# API de Autenticación con Arquitectura Screaming

Este proyecto es una API de backend para autenticación construida utilizando la Arquitectura Screaming. La estructura del proyecto está diseñada para que los nombres de los archivos y carpetas "griten" su propósito, haciendo que el flujo de la aplicación sea claro y fácil de entender.

## Estructura del Proyecto

La estructura del proyecto sigue los principios de la Arquitectura Screaming basando en las funcionalidades, donde cada carpeta y archivo refleja claramente su funcionalidad. Aquí está la organización principal:

```
src/
│
├── app.ts
│
├── config/
│   ├── db.ts
│   └── env.ts
│
├── server/
│   ├── __test__/
│   │   └── server.test.ts
│   │
│   ├── routes.ts
│   └── server.ts
│
├── utils/
│   └── util.ts
│
├── services/
│   ├── session/
│   │   ├── session.model.ts
│   │   └── session.repository.ts
│   │
│   ├── user/
│   │   ├── logout/
│   │   │   ├── logout.controller.ts
│   │   │   ├── logout.repository.ts
│   │   │   └── logout.service.ts
│   │   │
│   │   ├── signin/
│   │   │   ├── signin.controller.ts
│   │   │   ├── signin.repository.ts
│   │   │   ├── signin.schema.ts
│   │   │   └── signin.service.ts
│   │   │
│   │   ├── signup/
│   │   │   ├── __test__/
│   │   │   ├── signup.controller.ts
│   │   │   ├── signup.repository.ts
│   │   │   ├── signup.schema.ts
│   │   │   └── signup.service.ts
│   │   │
│   │   ├── user.model.ts
│   │   ├── user.repository.ts
│   │   └── user.routes.ts
```

## Principios de la Arquitectura Screaming

-   **Claridad y Propósito**: Los nombres de los archivos y carpetas deben reflejar claramente su funcionalidad.
-   **Organización por Funcionalidad**: El código se organiza en torno a las funcionalidades principales de la aplicación.
-   **Facilidad de Mantenimiento**: Una estructura clara facilita la comprensión y mantenimiento del código.

## Funcionalidades Implementadas

-   **SignUp**: Registro de nuevos usuarios.
-   **SignIn**: Inicio de sesión y generación de tokens JWT.
-   **Logout**: Cierre de sesión e invalidación de tokens.

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
    npm run dev
    ```

## Tecnologías Utilizadas

-   **Node.js**: Entorno de ejecución para JavaScript.
-   **TypeScript**: Para tipado estático y mejor organización del código.
-   **Fastify**: Framework para construir APIs RESTful.
-   **JWT (JSON Web Tokens)**: Para la autenticación y autorización.
-   **Bcrypt**: Para el hashing de contraseñas.

### Scripts en `package.json`

```json
"scripts": {
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --detectOpenHandles",
	"dev": "nodemon",
	"secret": "node ./scripts/jwt_secret.js"
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

-   **Nombre**: Angel Ortiz Olivera
-   **Email**: dev.angel.ortiz@gmail.com
-   **GitHub**: [https://github.com/devAngelOrtiz](https://github.com/devAngelOrtiz)

¡Espero que este proyecto te sea útil! 😊
