## 1. Descripción del stack tecnológico

### Tecnologías principales

- Angular 21.2.14
- TypeScript 5.9.3
- HTML5
- CSS3 / Sass
- RxJS 7.8.0
- Angular Material 21.2.14
- Angular CDK 21.2.14
- Angular SSR
- Apollo Angular
- GraphQL
- Bootstrap 5.3.8

### Librerías utilizadas

- @ngx-translate/core 17.0.0
- @ngx-translate/http-loader 8.0.0
- @gilsdav/ngx-translate-router 8.0.0
- @apollo/client 4.0.1
- apollo-angular 13.0.0
- graphql 16.8.1
- express 4.18.2

### Requisitos del entorno

| Componente | Versión |
|------------|----------|
| Node.js | 22.13.0 o superior |
| Angular CLI | 21.2.14 |
| TypeScript | 5.9.3 |
| npm | Compatible con Node.js utilizado |


### Archivos de configuración

- `src/assets/config/config.json`
- Ficheros específicos de entorno que puedan definirse durante el desarrollo.


## 2. Cómo montar el entorno de desarrollo

### 1. Clonar el repositorio

```bash
git clone <url-repositorio>
cd intranet-frontal-asistencial
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar parámetros de entorno

Configurar el fichero:

```text
src/assets/config/config.json
```

con los valores correspondientes al entorno utilizado.

### 4. Arrancar la aplicación

```bash
npm start
```

o alternativamente:

```bash
ng serve
```

La aplicación quedará disponible por defecto en:

```text
http://localhost:4200
```

> El proyecto usa `@gilsdav/ngx-translate-router`, por lo que todas las rutas llevan prefijo de idioma. En desarrollo la ruta base es `http://localhost:4200/es`.


## 3. Funcionalidad implementada

### Flujo de registro

La aplicación implementa un wizard de registro en 3 pasos accesible desde la home en `/`:

1. **Datos personales** — nombre y apellidos con validación de mínimo 2 caracteres.
2. **Datos de contacto** — email, prefijo numérico y teléfono de 8–15 dígitos.
3. **Bases legales** — aceptación obligatoria de términos y política de privacidad.

Al completar el registro se redirige a `/es/register/success` con un resumen de los datos introducidos.

 Si se accede directamente a `/register/success` sin haber completado el formulario, el componente redirige automáticamente a `/register`.

### Para probar el flujo

1. Arrancar la aplicación con `npm start`.
2. Navegar a `http://localhost:4200/es`.
3. Pulsar el botón de acceso al registro.
4. Completar los 3 pasos del formulario.
5. Verificar que la página de confirmación muestra correctamente todos los datos.
6. Pulsar "Ir al inicio" y comprobar que el formulario se reinicia (el servicio llama a `reset()`).
