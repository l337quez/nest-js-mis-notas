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
 
### Índice 
* [Obtener ayuda de Nest](#item1)
* [Crear un Nuevo Proyecto](#item1.1)
* [Arrancar proyecto en modo de auto reinicio con algun cambio efectuado](#item2)
* [Generar un Controlador](#item3)
* [Generar un modulo](#item4)
* [Generar un servicio](#item5)
* [Interfaces](#item6)
* [Schemas](#item7)
* [Data Object Transfer (DTO)](#item8)
* [Decoradores](#Decoradores)
* * [Decoradores para Validaciones](#DecoradoresValidation)
* [Mongoose paginate V2](#Mongoose_paginate)
* [Trabajando con Redis](#redis)
* [librerias para Nest](#Libraries)

 <br/>

<a name="item1"></a>
#### Obtener ayuda de Nest
```
nest --help
```

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


<a name="item3"></a>
#### Generar un Controlador
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
 
 <a name="Libraries"></a>
 #### Librerias para Nest JS
 hay ciertas librerias que se acoplan perfectamente a Nest, dejare aqui un lista
 
 * Libreria papaparse : ideal para parsear archivos csv a json --> https://www.npmjs.com/package/nest-papaparse
