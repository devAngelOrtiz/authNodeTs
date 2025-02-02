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

# Servicios

Todos los endpoints requieren el encabezado user-agent, el cual debe ser una cadena con una longitud mínima de 5 caracteres.
```json
{
  "user-agent": "string (minLength: 5)"
}
```


## **Sign Up**
Este servicio permite a un usuario registrarse en el sistema proporcionando su nombre, correo electrónico y contraseña.

### **Endpoint:** `POST api/v2/user`

#### Esquema :
Entrada (Body)
```json
{
  "name": "string (longitud minima: 5)",
  "email": "string (formato email)",
  "password": "string (longitud minima: 8, debe contener al menos una mayúscula y un carácter especial)"
}
```

Salida:
```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string (formato email)",
  "token": "string",
  "createdAt": "string (fecha y hora)",
  "updatedAt": "string (fecha y hora)"
}
```

#### Errores:
statusCode - bodyResponse: Descripcion
```json
400 - { msg: "user-agent_required" }: El encabezado user-agent es obligatorio y no se ha proporcionado.

400 - { msg: "name_required" }: El nombre es obligatorio y no se ha proporcionado.
400 - { msg: "email_required" }: El correo electrónico es obligatorio y no se ha proporcionado.
400 - { msg: "password_required" }: La contraseña es obligatoria y no se ha proporcionado.

400 - { msg: "user-agent_minLength" }: El encabezado user-agent debe tener al menos 5 caracteres.
400 - { msg: "password_minLength" }: La contraseña debe tener al menos 8 caracteres.
400 - { msg: "name_minLength" }: El nombre debe tener al menos 5 caracteres.

400 - { msg: "email_format" }: El formato del correo electrónico no es válido.
400 - { msg: "password_format" }: El formato de la contraseña no es valido. Debe contener al menos una letra mayúscula y un carácter especial.

400 - { msg: "email_alredyExists" } : Ya existe un usuario registrado con el correo electrónico proporcionado.
```

##  **Sign In**

Este servicio permite a un usuario iniciar sesión proporcionando su correo electrónico y contraseña.

### **Endpoint:** `POST api/v2/user/log-in`

#### Esquemas
Entrada (Body):
```json
{
  "email": "string (formato email)",
  "password": "string (minLength: 8, debe contener al menos una mayúscula y un carácter especial)"
}
```

Salida:
```json
{
  "token": "string"
}
```

#### Errores:
statusCode - bodyResponse: Descripcion
```json
400 - { msg: "user-agent_required" }: El encabezado user-agent es obligatorio y no se ha proporcionado.
400 - { msg: "email_required" }: El correo electrónico es obligatorio y no se ha proporcionado.
400 - { msg: "password_required" }: La contraseña es obligatoria y no se ha proporcionado.

400 - { msg: "user-agent_minLength" }: El encabezado user-agent debe tener al menos 5 caracteres.
400 - { msg: "password_minLength" }: La contraseña debe tener al menos 8 caracteres.

400 - { msg: "email_format" }: El formato del correo electrónico no es válido.
400 - { msg: "password_format" }: La contraseña debe contener al menos una letra mayúscula y un carácter especial.
400 - { msg: "email/password_notFound" }: No se encuentra el usuario por el correo electrónico o la contraseña proporcionada no es válida.

```

##  **Log out**

Este servicio permite a un usuario cerrar sesión.

### **Endpoint:** `DELETE api/v2/user/log-out`

#### Esquemas
Entrada (Headers):
```json
{
  "authorization": "Bearer {{token}}",
}
```

Salida:
```json
{
  "msj": "string"
}
```

#### Errores:
statusCode - bodyResponse: Descripcion
```json
400 - { msg: "user-agent_required" }: El encabezado user-agent es obligatorio y no se ha proporcionado.

400 - { msg: "user-agent_minLength" }: El encabezado user-agent debe tener al menos 5 caracteres.

400 - { msg: "session_invalid" } : No se encuentra la sesión o el `user-agent` de la sesión no coincide con el `user-agent proporcionado.

401 - { msg: "token_invalid" }: El token de autenticación es inválido o ha expirado.
```

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
