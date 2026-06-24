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
