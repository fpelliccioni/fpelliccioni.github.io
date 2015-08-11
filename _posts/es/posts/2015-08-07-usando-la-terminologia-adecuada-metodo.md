---
layout: post
title:  "Usando la terminología adecuada: ¿Método?"
date:   2013-08-05 12:00:00
comments: true

# description: "Portland in shoreditch Vice, labore typewriter pariatur hoodie fap sartorial Austin. Pinterest literally occupy Schlitz forage."
category: spanish

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp]
---



En esta serie de artículos mi intensión es revisar por qué los programadores usamos cierta terminología, ciertas palabras, algunas de las cuales considero inadecuadas.  
En este caso quiero hablar sobre la palabra _método_ (_method_ en inglés).

Antes que nada...

### ¿Qué es un _método_?

Cualquier programador sabe que un [_objeto_ [1]](#Ref1) tiene _estado_ y _comportamiento_.
El estado se almacena en _campos_ (_fields_ en inglés) y el comportamiento se logra a través de _métodos_.  
Un *método* (en el contexto de la programación) es una secuencia de instrucciones, es parte de un objeto o clase (bajo cierto nombre). [[2]](#Ref2)

Pero...

### ¿Por qué "_método_"?

¿Qué diferencia hay entre un _método_ y un _procedimiento_?
Un _procedimiento_ es una secuencia de instrucciones. [[2]](#Ref2)

Entonces, ¿la única diferencia consiste en que un método debe pertenecer a una clase/objeto mientras en que un procedimiento no se aclara nada con respecto a clases/objetos?

Entonces, un método es un procedimiento que es miembro de una clase.  
Tenemos procedimientos que son _miembros_ y procedimientos _libres_ o _no-miembros_ (fuera de una clase).

Entonces, me sigo preguntando, ...

### ¿Por qué usamos el término "_método_" y no "_procedimiento_"?

Mi deducción es que con el establecimiento de [Java](https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n)) como uno de los lenguajes de programación más populares, también se produjo la popularización de su terminología.

Quiero ahora hacer una búsqueda a través de la historia de los lenguajes de programación para entender por qué comenzamos a llamar "método" a los "procedimientos". Voy a ir desde tiempos más modernos a tiempos más remotos...

### Java

En Java, no existen los _procedimientos libres_, todos los procedimientos deben ser miembro de una clase, estos procedimientos miembro efectivamente se llaman métodos.

Según la [especificación de Java 8 [3]](#Ref3):

- "The body of a class declares members (fields and methods and nested classes and interfaces), instance and static initializers, and constructors." [[3]](#Ref3)
- "Method declarations describe code that may be invoked by method invocation expressions." [[4]](#Ref4)

La especificación de Java describe la relación entre un método y una clase, aunque no establece cuál es la definición de la palabra "método".

Más allá de la definición, en la especificación no vamos a encontrar por qué los diseñadores del lenguaje decidieron llamarle "método" a los procedimientos, así que debemos ir más atrás.

Java hereda la mayor parte de su sintáxis (no así su semántica) y terminología de [C++](https://es.wikipedia.org/wiki/C%2B%2B).

### C++

C++ es un lenguaje que vio la luz a finales de la década de 1970 y nace como un super-conjunto del [lenguaje de programación C](https://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n)) con el agregado tecnología de objetos.

Por lo tanto en C++ tenemos procedimientos miembro y procedimientos libres, a los que se los llama funciones *** miembro y no-miembro (member and non-member functions).

Según el [estándar de C++ [5]](#Ref5):

  - Member functions: Functions declared in the definition of a class, excluding those declared with a friend specifier, are called member functions of that class.
  [[6]](#Ref6)

O sea, en C++ no se usa la palabra "método". Puede que algunos programadores C++ usan la palabra "método" debido a que el término es muy popular hoy día; pero, tanto el estándar como los programadores más cercanos al riñón del lenguaje no lo utilizan.

Entonces... ¿Cuál es el término correcto para designar el código que modela el comportamiento de los objetos? ¿Es "método"? ¿Es "procedimiento"? ¿Qué lenguaje usa la terminología más adecuada?

Para ello debo ir aun más atrás.  
C++ hereda su "parte" de objetos del [lenguaje de programación Simula](https://en.wikipedia.org/wiki/Simula), así que ...

### Simula

[Simula](https://en.wikipedia.org/wiki/Simula) es considerado el primer lenguaje de programación "Orientado a Objetos" ***  
Es un lenguaje de tipado estático influenciado por ALGOL 60 ***.

Simula permite que los procedimentos sean declarados dentro de una clase y también fuera de ella. A los primeros los denomica _local procedures_ y a los segundos _non-local procedures_.

Hay muy poca bibliografía disponible acerca del lenguaje, pero [aquí](http://www.edelweb.fr/Simula/) pueden encontrar un muy trabajo de recopilación de viejos manuales.

Entonces, si C++ y Simula no hacen mención a algo llamado "método", ¿De dónde saca Java esa palabra? ¿Es una invención de los diseñadores del lenguaje? ¿La copial de algún otro lenguaje? ...


### Smalltalk

Smalltalk es un lenguaje de programación orientado a objetos que fue desarrollado durante la década de 1970 y vio la luz a principio de los 80's.

A diferencia de Simula, Smalltalk es un lenguaje de tipado dinámico.

Smalltalk es el primer lenguaje que incorpora la palabra método, lenguajes anteriores y muy influyentes como C, ALGOL y FORTRAN *** no hacen mención a esta palabra.

En Smalltalk, las acciones se realizan enviando mensajes a los objetos.

Según el [estándar de Smalltalk [X]](#RefX):

- A message is a request to perform a designated computation. An object is a computational entity
  that is capable of responding to a well defined set of messages. An object may also encapsulate
  some (possibly mutable) state.
  
- An object responds to a message by executing a method. Each method is identified by an
  associated method selector. A behavior is the set of methods used by an object to respond to
  messages.
  
- A method consists of a sequence of expressions. Program execution proceeds by sequentially
  evaluating the expressions in one of more methods. There are three types of expressions:
  assignments, message sends, and returns.



### Otros lenguajes

Quiero analizar otros lenguajes que soportan también tecnología de objetos.

### Eiffel

[Eiffel](https://en.wikipedia.org/wiki/Eiffel_(programming_language)) es un lenguaje que nace a mediados de 1980 y también es heredero directo de Simula.

En Eiffel todo miembro (estado y comportamiento) de una clase se lo llama _Feature_.
Al estado se lo denomina _Attributes_ y al comportamiento _Routines_. ***

En Eiffel todas las _Routines_ son miembros de una clase, no se permite la existencia de procedimientos libres.


### C\#

C# es un lenguaje de programación que nace siendo muy similar a Java (casi idéntico) con algunas reminisencias de C++. 
Luego, con los años el lenguaje formó su propia identidad.

C# copia en su gran mayoría la terminología de Java. Una de las palabras que copia es "método".

Según el [estándar C# [X]](#RefX):

  - A method is a member that implements a computation or action that can be performed by an object or class. ***

Al ser un lenguaje muy usado, especialmente por seguidores de la "filosofía" Microsoft, C# también ha contribuído a la popularización del término.


### Objective-C

Objective-C es un lenguaje desarrollado a principios de los 1980's. Al igual que C++, nace como un super-conjunto de C al que se le agrega tecnología de objetos.  
A diferencia de C++, el modelo de objetos de Objective-C está basado en el estilo de Smalltalk y no en el de Simula.

Objective-C cuenta con el concepto de mensajes y también el de método.

***
https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/DefiningClasses/DefiningClasses.html#//apple_ref/doc/uid/TP40011210-CH3-SW1


### Python

### Otras fuentes

Para rastrear el origen de la palabra "método" he hecho una búsqueda en la bibliografía (sobre programación en general) que tengo a mi disposición, textos que considero clásicos.

  - Elements of Programming by Alexander A. Stepanov and Paul McJones
  - The Art of Computer Programming Volume 1 by Donald E. Knuth
  - The Art of Computer Programming Volume 2 by Donald E. Knuth
  - The Art of Computer Programming Volume 3 by Donald E. Knuth
  - The Art of Computer Programming Volume 4A by Donald E. Knuth

En ninguna de las 3.456 páginas de estós 5 libros he encontrado la palabra "método" haciendo referencia a un "procedimiento". Obviamente la palabra "método" parece en varias oportunidades, pero no en el sentido que estoy buscando.


### Conclusiones

La palabra "método" ha sido introducida al mundo de la programación por el lenguaje Smalltalk. Al ser un lenguaje prácticamente no usado en la industria, la palabra no era muy conocida en los 80's y principios de los 90's.

Quizás fue un error de los diseñadores de Smalltalk el no haber utilizado nomenclatura existente, o quizás no fue un error, ya que introdujo un modelo de objetos distinto al de Simula y ese cambio ameritaba un cambio de nombres. Es muy dificil de determinar si fue una desición equivocada o no.

Lo que sí considero un error es el haber introducido nomenclatura de Smalltalk en Java, dado que el modelo de objetos de Java es heredado de C++ -> Simula. No encuentro nada en común entre Java y Smalltalk que justifique el uso del término.

C++, Objective-C y Eiffel utilizan terminología similar a sus predecesores, puede que con algunas variaciones, que pueden ser mínimas o necesarias para adaptarse a cambios introducidos por los lenguajes.


Java, a pesar de ser sucesor de Simula y tener poco en común con Smalltalk, adopta el término de este último.  
Teniendo en cuenta que el modelo de objetos de Java es casi idéntico al de C++, Eiffel y Simula; los diseñadores del lenguaje deciden incorportar terminología de otra fuente, lo cual considero un error.  
"Método" se populariza a través de Java.

Lenguajes subsiguientes arrastran el error e incorporan "método" a su terminología.

La palabra "método" se infiltra en el vocabulario de los programadores.  
Ahora no hay vuelta atrás :).

Usted use el término que más le guste, yo me voy a quedar con *Procedimiento*.


El 
Sin embargo, el término no era muy usada hasta que el lenguaje Java se hizo popular.






---

## Referencias

<a name="Ref1">[1]</a> Aquí nos referimos a la definición de "objeto" en el contexto de la _Programación Orientada a Objetos_:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]  
Que difiere de la definición de "objeto" dada en:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elements of Programming of Alexander Stepanov and Paul McJones by Stepanov and McJones [2009, page 4]  
Esta última definición es la preferida por el autor del blog, en caso de que no se aclare a cuál de las dos definiciones se hace referencia, el lector debe asumir que se está hablando de la definición dada por Stepanov.

<a name="Ref2">[2]</a> Definición simplificada, para una definición más detallada referirse a:
????????????




(
El lenguaje Java no cuenta con un estándar, pero en la página oficial del lenguaje podemos descargarnos su [especificación](https://docs.oracle.com/javase/specs/).
)



Chapter 8 - Classes
Pagina 191, 192
The Java® Language Specification - Java SE 8 Edition


---

<a name="Ref3">[3]</a> Concept definition: Stepanov and McJones [2009, page 10]  
<a name="Ref4">[4]</a> SGI's STL using Concepts in Documentation: <https://www.sgi.com/tech/stl/min.html>  
<a name="Ref5">[5]</a> Object definition:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The definition used in this article has nothing to do with an OOP-like definition of object [[7]](#Ref7).  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The definition used here is a practical definition of what an object is:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Object is a sequence of bits in memory" or  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Object is a value residing in memory"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See Stepanov and McJones [2009, page 4] for a complete definition.  
<a name="Ref6">[6]</a> [See Appendix A](#AppendixA)  
<a name="Ref7">[7]</a> Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]
 
---
