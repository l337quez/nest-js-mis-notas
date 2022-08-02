 
# @Deprecated - Method Decorator

En la definición del método, se puede marcar como obsoleto (deprecated) con la justificación.
Esto ayudará a que otros developers sepán que deben de utilizar ya la alternativa.

```
@Deprecated('Most use speak2 method instead')
 speak() {
      console.log(`${ this.name }, ${ this.name }!`)
 }
 ```
