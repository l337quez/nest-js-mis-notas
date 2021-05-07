### nest-js-mis-notas
Documentacion Oficial https://docs.nestjs.com/

todo lo referente a nest js, cada vez que se cree un controlador, lo va crear dentro de la carpeta src, sino le indicas otro directorio. 


### Índice de contenidos
* [Obtener ayuda de Nest](#item1)
* [Arrancar proyecto en modo de auto reinicio con algun cambio efectuado](#item2)
* [Generar un Controlador](#item3)
* [Generar un modulo](#item4)
* [Generar un servicio](#item5)
* [Mongoose paginate V2](#Mongoose_paginate)

 <br/>
 
<a name="item1"></a>
#### Obtener ayuda de Nest
```
nest --help
```

<br/>

<a name="item2"></a>
#### Arrancar proyecto en modo de auto reinicio con algun cambio efectuado
```
nest start --watch
```

<br/>


#### Estructura de carpetas
Esta es la estructura basica, que uso para un controlador

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
```
nest g mo technicians nombre_del_modulo
```

<br/>

<a name="item5"></a>
#### Generar un servicio
```
nest g service nombre_del_servicio
```

<br/>

#### Generar proyecto para Produccion
```
npm run build
```

<br/>

 
<a name="Mongoose_paginate"></a>
### Mongoose paginate V2
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

