### Mis Apuntes de Nest JS
By: Ronal Forero


<p align="center"><img src="https://github.com/l337quez/nest-js-mis-notas/blob/main/images/nest-js.png"></p>  

 <br/>

todo lo referente a nest js, cada vez que se cree un controlador, lo va crear dentro de la carpeta src, sino le indicas otro directorio. 
Documentacion Oficial https://docs.nestjs.com/  

 <br/>
 
 Vea las nuevas noticias del Framework NestJs
https://trilon.io/blog/

 <br/>
 
 #### llamar a un servicio en el tiempo de ejecucion  
 
 A) Lifecycle Event
Use a Lifecycle Event (similar to change detection hooks in Angular) to run code and inject the services needed for it, e.g.:

```bash
Service
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log(`Initialization...`);
    this.doStuff();
  }
}
Module
export class ApplicationModule implements OnModuleInit {
  
  constructor(private appService: AppService) {
  }

  onModuleInit() {
    console.log(`Initialization...`);
    this.appService.doStuff();
  }
}
```

  <br/>
  
B) Execution Context
Use the Execution Context to access any service in your main.ts:
```bash
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const appService = app.get(AppService);
}
``` 

  <br/>
 
### Índice 
* [Obtener ayuda de Nest](#item1)
* [Crear un Nuevo Proyecto](#item1.1)
* [Configurar Debuger en VsCode](#debuger)
* [Arrancar proyecto en modo de auto reinicio con algun cambio efectuado](#item2)
* [Crear un monorepo](#monorepo)
* [Generar todo con un solo comando](#gen_all)
* [Generar un Controlador](#item3)
* [Generar un modulo](#item4)
* [Generar un servicio](#item5)
* [Variables de Entorno](#env)
* [Crear un Middleware](#middleware)
* [Crear un Middleware con Express](#middleware_express)
* [Crear un Middleware con Fastify](#middleware_fastify)
* [Crear un Middleware con GraphQl](#middleware_graphql)
* [Crear Cron Job](#cron_job)
* [Interfaces](#item6)
* [Schemas](#item7)
* [Data Object Transfer (DTO)](#item8)
* [Decoradores](#Decoradores)
* * [Decoradores para Validaciones](#DecoradoresValidation)
* [Mongoose paginate V2](#Mongoose_paginate)
* [GraphQl](#graphql)
* [Trabajando con Redis](#redis)
* [Informacion Adicional](#info_adicional)
* * [Que es una Interface](#interface)
* * [Que es un DTO](#dto)
* * [Que es una Entity](#entity)
* [Como usar Axios](#Axios)
* * [Crear varias Interfaz de un JSON con diferentes tipos de dato de forma Facil](#interfaz-extencion)
* [Implementar loggin con wiston](#wiston)

 <br/>

#### TypeOrm
* [Conexion de TypeOrm](#conexion_typeorm)
* * [Cargar las Entidades desde un path](#typeorm_path)

 <br/>

#### Que es una entity
* [librerias para Nest](#Libraries)
* [Resolviendo Problemas](#resolve_problems)
* [Fuentes](#Fuentes)
* [Extenciones que uso en VsCode](#vscode-extencions)

 <br/>
 
#### Que es un Pipe 
* [class validators](#pipe)
* [Pipes en Microservicios](#pipe_ms)
 <br/>
 
#### Testing
* [Pruebas en Nest](#testing-nest)

 <br/>
 
<a name="item1"></a>
#### Obtener ayuda de Nest
```
nest --help
```

<br/>

<a name="debuger"></a>
#### Como debugear en VsCode
Hace un tiempo vscode no craba la carpeta .vscode, pero ahora si lo hace. para el dia de hoy Mayo del 2020 esta tomando la configuracion del archivo launch.json.  Vamos a crear un archivo dentro de la carpeta .vscode  llamado launch.json y dentro del archivo vamos a pegar la siguiente
configuracion

```
{
    // Use IntelliSense para saber los atributos posibles.
    // Mantenga el puntero para ver las descripciones de los existentes atributos.
    // Para más información, visite: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        
      {
        "type": "node",
        "request": "launch",
        "name": "Debug Nest Framework",
        "runtimeArgs": ["--nolazy", "-r", "ts-node/register"],
        "args": ["${workspaceFolder}/src/main.ts"],
        "autoAttachChildProcesses": true
      }
    ]
}
```

Para conocer como usar el debuger ver este video

https://www.youtube.com/watch?v=_3SeqNyPLeM

<br/>

<a name="item1.1"></a>
#### Crear un Nuevo Proyecto
Podremos escoger el manejador de paquetes de nuestro proyecto, puede ser Yarm o Npm.
```
nest new nombre_del_proyecto
```

<br/>

<a name="item2"></a>
#### Arrancar proyecto en modo de auto reinicio con algun cambio efectuado
```
nest start --watch
```

<br/>


#### Estructura de carpetas
Esta es la estructura basica, que uso para un controlador. Por ejemplo el entidad Subject (materia), tiene su servicio, modulo, schema, entre otros, tal como se muestra en la imagen

<p align="center"><img src="https://github.com/l337quez/nest-js-mis-notas/blob/main/images/estructura_basica.png"></p>  

<br/>


<br/>


<a name="monorepo"></a>
#### Crear un monorepo
monorepo es una estrategia de desarrollo de software donde el código de muchos proyectos se almacena en el mismo repositorio.
```
nest new my-project
```
Esto va crear un proyecto normal, ahora entramos en la carpeta del proyecto y convertimos el proyecto en monorepo
```
cd my-project
```
vamos a convertir el proyecto en monorepo y ya luego podemos crear una aplicacion dentro del proyecto

```
nest g app otra-aplication
```

<br/>

Como podemos crear una Gateway. La Gateway es la que podra Orquestar todos los micorservicios, para mas explicaion al respecto en la pagina oficial de Nest explican. La gateway es otro microservicio mas, es decir podremos ponerle cualquier nombre. Vamos a llamarle gateway

```
nest g app gateway
```

Ahora nos vamos al archivo nest-cli.json y vamos a colocar como root al gateway
```
  "monorepo": true,
  "root": "apps/gateway",
```

Al estar la gateway como root, podremos correla gateway sin escribir su nombre "gateway". Ejemplo
```
nest start --watch
```

Pero si por ejemplo tenemos el microservicio user entonces lo debemos correr asi
```
nest start user --watch
```

<br/>


<a name="gen_all"></a>
#### Generar todo con un comando
Generar controlador, servicio, dto y entitie con un solo comando. para rest, graphql...

<br/>

instalar
```
npm i @nestjs/schematics --save
```
```
nets g resource nombre_del_compunente
```

<br/>

<a name="item3"></a>
#### Generar un Controlador
Si queremos que nest te cree un CRUD del controlador, debes tener el siguiente paquete instalado
```
nest install @nestjs/schematics --save
```
ahora si podremos crear el controlador con el siguiente comando
```
nest g controller nombre_del_servicio
```

<br/>


<a name="item4"></a>
#### Generar un modulo
Un módulo es una clase anotada con un @Module() decorador. El @Module()decorador proporciona metadatos que Nest utiliza para organizar la estructura de la aplicación.
```
nest g mo nombre_del_modulo
```

<br/>

<a name="item5"></a>
#### Generar un servicio
Si vas a generar un servicio dentro de un microservicio, solo escriba el nombre de la carpeta/nombre_del_servicio luego nest te pide que inques a que microservico vas a generar el servicio.
```
nest g service nombre_del_servicio
```
Si deseamos crear un servicio y evitar que genere el archivo de pruebas, entonces debemos typear este comando y no el anterior.
```
nest g service nombre_del_servicio --no-spec
```

<br/>

<a name="env"></a>
#### Variables de Entorno
 Debemos instalar el paquete que indican en la documentacion oficial, crear la carpeta config, crear el archivo .env, ya podremos usar el .env. Para base de datos TypeOrm hay que hacer un procedimiento...
 
 <br/>

**Multiples Ambientes**
Para tener multiples Ambientes debemos hacer uso de NODE_ENV, esto una variable de entorno propia de NodeJS y del framework Express que se encuentra preseteada en tu aplicación. y tambien vamos a crear un archivo en el folder config

```bash
# env.config.ts name file
export const enviroments = {
    dev: '.env',
    test: '.test.env',
    prod: '.prod.env',
  };
```
En el archivo .env debe estar la variable NODE_ENV ejemplo
```bash
# .prod.env  name file

NODE_ENV=test
# GENERAL
HOST=localhost
# DB
DB_HOST=
DB_PORT=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DATABASE_URL=
```

<br/>

Vamos a crear tres archivos .env porque solo vamos a usar 3 ambientes..
Importante debemos importar debtro de los imports el ConfigModule y que este al preincipio de todas las imprtaciones. Esto quiere decir que va buscar en el archivo que tenga el valor del NODE_ENV que le indiquen y que si no se encuentra entonces tome las variables del archiv .env, el valor de esta variable NODE_ENV se envia con el comando de ejecucion
```bash
# module principal de la app o del microservicio
   ConfigModule.forRoot(
     {envFilePath:  enviroments[process.env.NODE_ENV] || '.env'},
   ),
```

<br/>

El truco esta en correr la aplicacion, debemos usar otro comando, para que tome el .env dependiendo del ambiente, eso lo vamos a configurar en el package.json
```bash
# dentro del objecto "scrips" agregamos las siguientes lineas
    "start:prod": "NODE_ENV=prod nest start",
    "start:test": "NODE_ENV=test nest start",
    "start:local": "NODE_ENV=local nest start",
```

Ejemplo: como correr el ambiente en un microservicio para ejecutra ambiente de desarrollo del microservicio base
```bash
NODE_ENV=test npm run start:dev base --watch
```

```bash
npm run start:test base
```

<br/>
<br/>

<a name="middleware"></a>
####  Middleware 
https://docs.nestjs.com/middleware
Las funciones de middleware pueden realizar las siguientes tareas:

* ejecutar cualquier código.
* realizar cambios en la solicitud y los objetos de respuesta.
* terminar el ciclo de solicitud-respuesta.
* llame a la siguiente función de middleware en la pila.
  si la función de middleware actual no finaliza el ciclo de solicitud-respuesta, debe llamar next()para pasar el control a la siguiente función de    middleware. De lo contrario, la solicitud quedará pendiente.  

**Nota:** un middlware no funciona en microservicios, ya que el moddleware funciona solo en http, y los microservicios usan trasnport que no son http

<br/>

Podemos usar el middleware con una ruta con una ruta, tambien con una ruta y un metodo en especifico. Tambien podemos excluir rutas

<br/>

<a name="middleware_express"></a>
#### Crear un Middleware con Express
Ejemplo vamos a crear un archivo logger.middleware.ts 

```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
```

<br/>

<a name="middleware_fastify"></a>
#### Crear un Middleware con Fastify
Ejemplo vamos a crear un archivo app.middleware.ts, en el caso de Fastify usa codigo vanila de JS

```js
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ServerResponse, IncomingMessage } from 'http';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: ServerResponse, next: Function) {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.write(JSON.stringify({ test: "test" }))
    res.end()
  }
}
```

<br/>

<a name="middleware_graphql"></a>
#### Crear un Middleware con GraphQl

Este ejemplo funciona tanto en Express como en Fastify. El ejemplo imprime la request y la informacion solicitada con GraphQl. Aqui se esta usando fieldMiddleware, esto es ideal para hacer algun tipo de restriction. Por ejemplo la req se va imprimir tantas veces como campos se esten consultando. Lo que realmente hace es que va pasando field por field, si deseas poner una condicion entonces muy facil hacerlo.
```js
export const checkRole: FieldMiddleware = async (
    ctx: MiddlewareContext,
    next: NextFn,
  ) => {
    const { info } = ctx;
    const { extensions } = info.parentType.getFields()[info.fieldName];
    const value = await next();
    const {context} = ctx;
    const request = context.req
    console.log("Request",request.user);
    console.log("informacion que estas consultando",info);
    return value;
  };
```

<br/>

Dentro del Module agregamos este codigo
```js
 imports: [
 buildSchemaOptions: {
   fieldMiddleware: [FieldMiddleware],
 }
 ]
```
<br/>


<a name="cron_job"></a>
#### Crear Cron Job
Crear un cron Job es sencillo en Nest. Pero quiero dejar documentado algo que me sucedio. Resulta que el cron job se ejecutaba y no paraba. Por mas que hacia cualquier cambio, eso no cambiaba el comportamiento del cron job. SOlucion: borrar la carpeta dist y volver a levantar el proyecto


<br/>

<a name="item6"></a>
#### Interfaces
Una Interface es un medio común para que los objetos no relacionados se comuniquen entre sí. Aqui unejemplo: 

```js
export interface Task {
 id: string;
 title: string;
 description: TaskStatus;
}

export enum TaskStatus{
OPEN = "OPEN",
IN_PROGRESS = "IN_PROGRESS"
DONE = "DONE"
}
``` 

<br/>

#### Generar proyecto para Produccion
```
npm run build
```

<br/>

 
 <br/>

<a name="Decoradores"></a>
#### Decoradores
Un decorador es el nombre de un patrón de diseño. Los decoradores alteran de manera dinámica la funcionalidad de una función, método o clase sin tener que hacer subclases o cambiar el código fuente de la clase decorada.

<br/>

<a name="DecoradoresValidation"></a>
#### Decoradores para Validaciones
Este tipo de decoradores los podremos usar en los DTO para validar los campos.

<br/>

**@IsNotEmpty()** 
&nbsp;
Este decorador es para validar que el campo no puede estar en blanco, es decir no puede ser nulo.

<br/>

**@IsEmail()** 
&nbsp;
Decorador para validar que el campo es de tipo email.

<br/>

**@MinLength(6)**
&nbsp;
Decorador para validar un minimo de caracteres, por ejemplo en este caso se limitara por 6 caracteres.

<br/> 
 
<a name="Mongoose_paginate"></a>
#### Mongoose paginate V2
Este plugin por defecto devuelve 10 datos
Se debe agregar en el esquema
```
const mongoosePaginate = require('mongoose-paginate-v2');
SubjectSchema.plugin(mongoosePaginate);
```

<br/>

El paginate se usa para hacer un get, si por ejemplo queremos implementar el paginado a una tienda de productos
```
const products = await Product.paginate({name:laptop})
```
Lo que hicimos en la linea anterior es usar la funcion asincrona wait para hacer un get de productos, Product es el eschema del controlador y paginate llamar al
plugin. Dentro de los coorchetes escribimos la query del GET.  No es necesario escribir GET, ya que eso lo hace la funcion paginate

<br/>

Si deseamos editar las propiedades del paginate y si no debemos buscar por ningun campo entonces dejamos los primeros {} como vacio. En los siguientes coorchetes 
pondremos las opciones que deseamos editar.
```
const products = await Product.paginate({},{limit:7})
```

https://www.npmjs.com/package/mongoose-paginate-v2

 
  <br/>
 
 <a name="redis"></a>
 #### Instalacion de Redis
```
npm i --save redis
```
Instalamos dependencias

```
npm i cache-manager cache-manager-redis-store --save
```

Creamos un modulo para almacenar en cache
```
nest g module redis-cache
```
 Creamos un servicio para el almacenamiento del cache
```
nest g service redis-cache
```

mas informacion: https://javascript.plainenglish.io/what-is-redis-and-how-to-use-it-with-nest-js-3cd1de0fe13b

 <br/>

REDIS_HOST : Especifica el host de nuestra base de datos de Redis (por ejemplo: localhost)
REDIS_PORT : El valor del puerto predeterminado es 6479
CACHE_TTL : Especifica la cantidad de tiempo en segundos antes de que se invalide un valor
MAX_ITEM_IN_CACHE : Especifica el número máximo de elementos que se deben mantener en la caché.
 
 <br/>
  
 <a name="info_adicional"></a>
 #### Informacion Adicional
 
 Esta esn una sesion con informacional adicional que todo programador debemos conocer y no esta de mas explicarlo.

  <br/>

  <a name="graphql"></a>
 #### GraphQl

GraphQL es un lenguaje de consulta y manipulación de datos para APIs, y un entorno de ejecución para realizar consultas con datos existentes.​ GraphQL fue desarrollado internamente por Facebook en 2012 antes de ser liberado públicamente en 2015.

  <br/>

 #### GraphQL (code first) 
 
   <br/>
 
 #### GraphQL (schema first) 
 
 https://blog.logrocket.com/code-first-vs-schema-first-development-graphql/
 
  <br/>

  <a name="Axios"></a>
 #### Como usar Axios
 
 Axios es un Cliente HTTP basado en promesas para node. js y el navegador. Es isomorfico (= puede ejecutarse en el navegador y nodejs con el mismo código base). En el lado del servidor usa el modulo nativo http de node. A modo de ejemplo usaremos la siguiente url: https://hn.algolia.com/api/v1/search_by_date?query=nodejs
 
 Otra cosa importante es que debemos importar el modulo de HttpModule, en el modulo donde vamos a trabajar con Axios
 
 ```js
import { HttpService } from '@nestjs/axios';

const response= await lastValueFrom(this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs'))
``` 
 
   <br/>
   
   
  <a name="interfaz-extencion"></a>
 #### Crear varias Interfaz de un JSON con diferentes tipos de dato de forma Facil

Debemos crear un archivo donde vamos agregar las interfaces (es opcional). Luego estando en archivo donde vamos agregar las interfaces, vamos a copiar el Json, luego tecleamos ctrl + p, visualcode mostrara un modal con un imput donde escribiremos el nombre de la extencion paste JSON as code, la extencion nos pedira el nombre de nivel superior, escribimos un nombre alucivo al JSON y ya. la extencion hara todo el trabajo.
   
   

  <a name="vscode-extencions"></a>
 #### Extenciones que uso en VsCode

**Paste JSON as Code**  :  Extension de quicktype, excelente extencion que nos ayuda a crear una interfaz de un JSON. Es decir crea tantas interfaces necearias como tipos de datos tenga el JSON.

Para usarla debemos tener el JSON en el porta papeles, osea debemos hacer copiado el json, luego hacemo control +p  y buscamos la extencion y ya nos genera la interfaz

  <br/>
  
**Windows Colors**  : Extension de Stuart Robinson, es ideal para cuando abres mas de un proyecto en Vscode y quieres distinguir entre una ventan que pertenece a un proyecto con otra ventana que pertenece a otro proyecto, esta extencion le pone un color en la franja del menu ixquierdo y eso nos ayudara a tener una referencia.


  <br/>
  
**GitLens**  : Extension de GitKraken, es una extencion que esta vinculada con git, contiene muchas opciones, pero entre la mas resaltantes para mi. Es que si estas trabajando en un proyecto grupal, mostrara el usuario que hizo el commit en cada linea del codigo.  

  <br/>
  
**Prettier**  : Extension de Prettier, es una extencion que nos ayudara a formatear el codigo para que sea mas legible, debemos hacerle algunas configuraciones...  

  <br/>
  
**Better Comments**  : Extension de Aaron Bond. Hay una practia que he tomado y es que cuando me hace falta agregar cierta funcionalidad o en otras palabras tengo algo pendiente por hacer, hago un comentario y escribo "// TODO "  asi en mayuscula. En otros IDE's como Android studio, este comentario lo resalta. bueno para hacer algo parecido en vscode... esta extencion nos ayudara ha resaltar todos los comentarios con la palabra TODO.

  <br/>
  
**Excel Viewer**  : Extension de GrapeCity, es una extencion que nos ayudara a previsualizar archivos excell dentro vscode, algo parecido con los archivos smarkdownk, que vscode nos ayuda a previsualizar. Muy util para cuando trabajamos con Data y para no abrir un editor de Excell.

  <br/>

  <a name="interface"></a>
 #### Que es una Interface
 
 En español se traduce a interfaz, tecnicamente son un mecanismo de la programacion orientada a objetos (POO) que trata de suplir la carencia
 de herencia múñtiple.  
 La diferencia de las clases que extiendes con respecto a las interfaces es que las interfaces no contienen implementación de sus métodos, por lo que la clase que implementa una interfaz debe escribir el código de todos los métodos que contiene. Por este motivo, se dice que las interfaces son como un contrato, en el que se especifica las cosas que debe contener una clase para que pueda implementar una interfaz o cumplir el contrato declarado por esa interfaz.
 
   <br/>
 
   <a name="dto"></a>
 #### Que es un DTO
El patrón DTO (Data Transfer Object) tiene como finalidad la creación de objetos planos (POJO) con una serie de atributos que puedan ser enviados o recuperados del servidor en una sola invocación, de tal forma que un DTO puede contener información de múltiples fuentes o tablas y concentrarlas en una única clase simple.  
Esto es ideal para solo enviar lo que se desea y no enviar datos de mas. Por ejemplo En la comunicacion entre microservicios, si deseamos enviar un objecto desde la gateway al microservicios user si en las dos partes el objecto esta definido como un tipo dto, entonces cada campo debe ser del tipo que se declaro en el DTO, esto tambien obliga a no enviar datos de otro tipo. Ejmplo si hay un campo que se declaro como string, debe ser string estrictamente.
 
  <br/>
 
   <a name="entity"></a>
 #### Que es una entity
  las entidades son clases que representa al modelo de datos, o mapea directamente contra una tabla de la base de datos. Dicho esto, las entidades son clases que fueron diseñadas para mapear contra la base de datos, no para ser una vista para una pantalla o servicio determinado, lo que provoca que muchos de los campos no puedan ser serializables, no contengan todos los campos necesarios un servicio, ya sea que tengan de más o de menos.
 
  <br/>
 

  ### Conexion TypeOrm
    <a name="typeorm_path"></a>
  #### Cargar las Entidades desde un path
  
  Para poder usar el path debemos tener disponibles las entidades en cada modulo. Si vamos a trabajar con relaciones que implican dos o mas entidades deben estar disponibles en el modulo. Si se estamos trabajando con el patron repository entonces deben estar los repository que se relacionan con cada entidad. Si hay una relacion usuario y transacion, entonces estas deben estar el forFeature disponibles.

  imports: [
    TypeOrmModule.forFeature([])
    ],
  
  entities: [__dirname + '/../**/*.entity{.ts,.js}']
  
   <br/>
 
 
 
 <a name="Libraries"></a>
 #### Librerias para Nest JS
 hay ciertas librerias que se acoplan perfectamente a Nest, dejare aqui un lista
 
 * Libreria papaparse : ideal para parsear archivos csv a json --> https://www.npmjs.com/package/nest-papaparse


 <br/>
 
 <a name="resolve_problems"></a>
 #### Resolviendo Problemas

* Tuve un probema en Microservicios, TyperORM, graphql. Implemente un guard de permission en la gateway, este guard se comunicaba con el microservicio useer, asi que tuve que agregar en el modulo una inyeccion para que eso estuviese disponible a cualquier cosa en la gateway.

 <br/>

```
 providers: [
    {
      provide: 'USERS',
      useFactory: ({ user }: ConfigService) => ClientProxyFactory.create(user),
      inject: [ConfigService],
    },
     {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    ConfigService
  ]
```

 <br/>
 
 El problema es que el guard se estaba ejecutando muchas veces y es que el arreglo de provide: APP_GUARD, no se debia poner en todos los modulos donde se debia inyectar, simplemente con ponerlo en un modulo ya se hace global. La solucion fue eliminar eso de todos los modulos.
 
  <br/>


<a name="pipe"></a>
#### Pipes
Las tuberías tienen dos casos de uso típicos:

* transformación : transforma los datos de entrada a la forma deseada (por ejemplo, de cadena a entero)
* validación : evalúe los datos de entrada y, si son válidos, simplemente páselos sin cambios; de lo contrario, lanza una excepción cuando los datos son incorrectos

  <br/>

Existen los class validators, que nos ayudan a obligar que el dato sea el que deseamos, es decir que si llega otro tipo de dato se genere una exepcion. Podemos instalar la libreria de class validators, pero esta no va funcionar. 
```bash
$ npm i --save class-validator class-transformer
```

**Las tuberías globales se utilizan en toda la aplicación, para cada controlador y cada controlador de ruta.**

  <br/>

<a name="pipe_ms"></a>
#### Pipes en Microservicios

EN microservicios se usa el @Payload y si usamos class validator para los DTO, es importante  aseguranos que la data que llega al controlador (en el caso de que se use  una Gateway o sino al servicio)  sea de tipo DTO y que el DTO contenga los decoradores. Para implementar los pipes de forma global, vamos al main del microservicio y agregamos el siguiente codigo. Cabe destacar que es de esta forma porque la respuesta lega al gateway donde esta implementado graphql
```bash
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions:{
          enableImplicitConversion: true
        },
        exceptionFactory: (errors) => {
          const errorMessages = {};
          errors.forEach(error => {
            errorMessages[error.property]= Object.values(error.constraints).join('. ').trim();
          })
          const error = Object.values(errorMessages)[0];
          return new RpcException(error.toString());
        }
      })
    )
```  


  
  <br/>

<a name="testing-nest"></a>
#### Pruebas en Nest

Excelente tutorial:  
https://ualmtorres.github.io/SeminarioTesting/  
 
  
Para ejecutar unicamente los test typeamos el siguiente comando. Pero este comando ejecutara todos los test de una vez
```
npm run test:watch
```

  <br/>
  
Ejecutar un test en especifico. Por ejemplo el test del controlador de componente User  

```
npm run test -f user.controller.spec.ts :watch
```

  <br/>
  
   
<a name="wiston"></a>
#### Loggin con Winston
Wiston nos permite guardar los logs en archivos, esto es mu importante para una aplicacion. El poder hacer seguimiento de las cosas que pasan desde un log, Los logs son como otra base de datos, donde podemos ver que es lo que esta pasando en el produccion.
https://github.com/gremo/nest-winston

**TRACE** – log events with this level are the most fine-grained and are usually not needed unless you need to have the full visibility of what is happening in your application and inside the third-party libraries that you use. You can expect the TRACE logging level to be very verbose.  

**DEBUG** – less granular compared to the TRACE level, but still more than you will need in everyday use. The DEBUG log level should be used for information that may be needed for deeper diagnostics and troubleshooting.  

**INFO** – the standard log level indicating that something happened, application processed a request, etc. The information logged using the INFO log level should be purely informative and not looking into them on a regular basis shouldn’t result in missing any important information.  

**WARN** – the log level that indicates that something unexpected happened in the application. For example a problem, or a situation that might disturb one of the processes, but the whole application is still working.  

**ERROR** – the log level that should be used when the application hits an issue preventing one or more functionalities from properly functioning. The ERROR log level can be used when one of the payment systems is not available, but there is still the option to check out the basket in the e-commerce application or when your social media logging option is not working for some reason. You can also see the ERROR log level associated with exceptions.



  <br/>

<a name="item1"></a>
#### Fuentes

 <br/>
 
 **Documentacion de Nest JS**
 https://docs.nestjs.com/faq
 
  <br/>
 
 **Blog de Brando Juberd**
 https://blog.devgenius.io/deprecation-warning-with-graphql-nestjs-versionless-api-badcba08cb1f
