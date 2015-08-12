---
layout: post
type: post
title:  "Usando la terminología adecuada: ¿Método?"
date:   2013-08-05 12:00:00
comments: true

# description: "Portland in shoreditch Vice, labore typewriter pariatur hoodie fap sartorial Austin. Pinterest literally occupy Schlitz forage."
category: spanish

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

En esta serie de artículos mi intensión es revisar por qué los programadores usamos cierta terminología, ciertas palabras, algunas de las cuales considero inadecuadas.  
En este caso quiero hablar sobre la palabra _método_ (_method_ en inglés).

Antes que nada...

### ¿Qué es un _método_?

Cualquier programador sabe que un [_objeto_ [1]](#Ref1) tiene _estado_ y _comportamiento_.
El estado se almacena en _campos_ (_fields_ en inglés) y el comportamiento se logra a través de _métodos_.  
Un *método* (en el contexto de la programación) es una secuencia de instrucciones, es parte de un objeto o clase. [[2]](#Ref2)

Pero...

### ¿Por qué "_método_"?

¿Qué diferencia hay entre un _método_ y un _procedimiento_?  
Un _procedimiento_ es una secuencia de instrucciones. [[2]](#Ref2)

¿La única diferencia consiste en que un método debe pertenecer a una clase mientras en que un procedimiento no se aclara nada con respecto a clases? (De hecho el término 
"procedimiento" es usado desde mucho antes de la existencia del término "clase").

Resumiendo, un método es un procedimiento que es miembro de una clase.  
Entonces, tenemos procedimientos que son _miembros_ y procedimientos _libres_ (fuera de una clase).

Me sigo preguntando, ...

### ¿Por qué usamos el término "_método_" y no "_procedimiento_"?

Mi deducción es que con el establecimiento de [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) como uno de los lenguajes de programación más populares, también se produjo la popularización de su terminología.

Quiero ahora hacer una búsqueda a través de la historia de los lenguajes de programación para entender por qué comenzamos a llamar "método" a los "procedimientos". Voy a ir desde tiempos más modernos a tiempos más remotos...

### Java

En [Java](https://en.wikipedia.org/wiki/Java_(programming_language)), no existen los _procedimientos libres_, todos los procedimientos deben ser miembro de una clase, estos procedimientos miembro efectivamente se llaman métodos.

Según la [especificación de Java 8 [3]](#Ref3):

- The body of a class declares members (fields and methods and nested classes and interfaces), instance and static initializers, and constructors.
- Method declarations describe code that may be invoked by method invocation expressions.

La especificación de Java describe la relación entre un método y una clase, aunque no establece cuál es la definición de la palabra "método".

Más allá de la definición, en la especificación no vamos a encontrar por qué los diseñadores del lenguaje decidieron llamar "método" a los procedimientos, así que debemos ir más atrás.

Java hereda la mayor parte de su sintaxis (no así su semántica) y terminología de [C++](https://en.wikipedia.org/wiki/C%2B%2B).

### C++

[C++](https://en.wikipedia.org/wiki/C%2B%2B) nace, a finales de la década de 1970, como un súper-conjunto del [lenguaje de programación C](https://en.wikipedia.org/wiki/C_(programming_language)) con el agregado tecnología de objetos.

Por lo tanto, en C++ tenemos procedimientos miembros y libres, denominados _member_ y _non-member functions_.

Según el [estándar de C++ [4]](#Ref4):

- Member functions: Functions declared in the definition of a class, excluding those declared with a friend specifier, are called member functions of that class.

O sea, en C++ no se usa la palabra "método". Puede que algunos programadores C++ usen la palabra "método" debido a que el término es muy popular hoy día; pero, tanto el estándar como los programadores más cercanos al riñón del lenguaje no lo utilizan.

Entonces... ¿Cuál es el término correcto para designar el código que modela el comportamiento de los objetos? ¿Es "método"? ¿Es "procedimiento"? ¿Qué lenguaje usa la terminología más adecuada?

Para ello debo ir aun más atrás.  
C++ hereda su "parte" de objetos del [lenguaje de programación Simula](https://en.wikipedia.org/wiki/Simula).

### Simula

[Simula](https://en.wikipedia.org/wiki/Simula) es considerado el primer lenguaje de programación _orientado a objetos_.
Es un lenguaje de tipado estático basado en [ALGOL 60](https://en.wikipedia.org/wiki/ALGOL_60).

Simula permite que los procedimientos sean declarados dentro de una clase y también fuera de ella. A los primeros los denomina _local procedures_ y a los últimos _non-local procedures_. [[5]](#Ref5)

Entonces, si C++ y Simula no hacen mención a algo llamado "método", ¿De dónde saca Java esa palabra? ¿Es una invención de los diseñadores del lenguaje? ¿La copia de algún otro lenguaje? 

La respuesta es...

### Smalltalk

[Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) es un lenguaje de programación orientado a objetos, inspirado en Simula, que fue desarrollado durante la década de 1970 y vio la luz a principio de los 80's.
A diferencia de Simula, Smalltalk es un lenguaje de tipado dinámico.

Smalltalk incorpora los conceptos de mensajes y métodos. Antes de Smalltalk no encuentro referencias sobre ningún otro lenguaje que utilice la palabra "método". [[6]](#Ref6)

Según el [estándar de Smalltalk [7]](#Ref7):

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

Quiero aquí analizar otros lenguajes que también soportan tecnología de objetos para verificar como nomenclan a sus procedimientos.

### Eiffel

[Eiffel](https://en.wikipedia.org/wiki/Eiffel_(programming_language)) es un lenguaje que nace a mediados de 1980 y, al igual que C++, es heredero directo de Simula.

En Eiffel todo miembro de una clase se lo llama _feature_. Al estado se lo denomina _attributes_ y al comportamiento _routines_. A su vez, las _routines_ se dividen en _functions_ y _procedures_ dependiendo si retornan o no un resultado. [[8]](#Ref8)

En Eiffel todas las _routines_ son miembros de una clase, no se permite la existencia de procedimientos libres.


### C\#

[C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) es un lenguaje de programación que nace siendo muy similar a Java (casi idéntico) con algunas reminiscencias de C++. 
Luego, con los años el lenguaje formó su propia identidad.

C# copia en su gran mayoría la terminología de Java. Una de las palabras que copia es "método".

Según el [estándar C# [9]](#Ref9):

  - A method is a member that implements a computation or action that can be performed by an object or class.

A diferencia de Java, el estándar C# sí define el significado de la palabra "método".

Al ser un lenguaje muy usado, especialmente por seguidores de la "filosofía" Microsoft, C# también ha contribuido a la popularización del término.


### Objective-C

[Objective-C](https://en.wikipedia.org/wiki/Objective-C) es un lenguaje desarrollado a principios de los 1980's. Al igual que C++, nace como un súper-conjunto de C al que se le agrega tecnología de objetos.  
A diferencia de C++, el modelo de objetos de Objective-C está basado en Smalltalk y no en Simula.

Objective-C cuenta con el concepto de mensajes y también el de método. [[10]](#Ref10)


### Otras fuentes

Para rastrear el origen de la palabra "método" he hecho una búsqueda en la bibliografía (sobre programación en general) que tengo a mi disposición, textos que considero clásicos.

  - Elements of Programming by Alexander A. Stepanov and Paul McJones
  - The Art of Computer Programming Volumes 1, 2, 3 and 4A by Donald E. Knuth

En ninguna de las 3.456 páginas de estos 5 libros he encontrado la palabra "método" haciendo referencia a un "procedimiento". Obviamente la palabra "método" parece en varias oportunidades, pero no en el sentido que estoy buscando.


## Conclusiones

La palabra "método" ha sido introducida al mundo de la programación por el lenguaje Smalltalk. Al ser un lenguaje prácticamente no usado en la industria, la palabra no era muy conocida allá por los 80's y principios de los 90's.

Quizás fue un error de los diseñadores de Smalltalk el no haber utilizado nomenclatura existente, o quizás no fue un error, ya que Smalltalk introdujo un modelo de objetos distinto al de Simula y ese cambio quizás ameritó un cambio de nombres. Es muy difícil de determinar si fue una decisión equivocada o no.

Lo que sí considero un error es el haber introducido nomenclatura de Smalltalk en Java, dado que el modelo de objetos de Java es heredado de C++ -> Simula. No encuentro nada en común entre Java y Smalltalk que justifique el uso del término.

C++, Objective-C y Eiffel utilizan terminología similar a sus predecesores, puede que con algunas variaciones, que pueden ser mínimas o necesarias para adaptarse a cambios introducidos por los lenguajes.


Algunos lenguajes basados en Java arrastran el error e incorporan "método" a su terminología.

La palabra "método" se infiltra en el vocabulario de los programadores.  
Ya no hay vuelta atrás ;)

Usted use el término que más le guste, yo me voy a seguir usando **procedimiento** ó **función** (siempre y cuando recuerde que no me gusta la palabra "método").


---

## Notas / Referencias

<a name="Ref1">[1]</a> Aquí nos referimos a la definición de "objeto" en el contexto de la _Programación Orientada a Objetos_:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]  
Que difiere de la definición de "objeto" dada en:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elements of Programming of Alexander Stepanov and Paul McJones by Stepanov and McJones [2009, page 4]  
Esta última definición es la preferida por el autor del blog, en caso de que no se aclare a cuál de las dos definiciones se hace referencia, el lector debe asumir que se está hablando de la definición dada por Stepanov.

<a name="Ref2">[2]</a> Definición simplificada, para una definición más detallada referirse a:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 174]

<a name="Ref3">[3]</a> [The Java Language Specification (Java SE 8 Edition)](https://docs.oracle.com/javase/specs/jls/se8/jls8.pdf), Chapter 8 [pages 191, 192]

<a name="Ref4">[4]</a> [ISO International Standard ISO/IEC 14882:2014(E) – Programming Language C++, current working draft (at Aug, 2015)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/n4527.pdf), sections: 9.3 [class.mfct] and 8.3.5 [dcl.fct]  

<a name="Ref5">[5]</a> Hay muy poca bibliografía disponible acerca del lenguaje, pero [aquí](http://www.edelweb.fr/Simula/) pueden encontrar un excelente trabajo de recopilación de viejos manuales.  

<a name="Ref6">[6]</a> Lenguajes muy influyentes como Fortran, Algol y C no hacen mención a la palabra "método" en sus especificaciones / manuales.

<a name="Ref7">[7]</a> [ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft](http://smalltalk.org/versions/ANSISmalltalk/ANSISmalltalkStandard_v1.9_199712_NCITS_X3J20_draft.pdf), Section 3.1 [page 9]

<a name="Ref8">[8]</a> Se especifica en:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, pages 174, 175]  
y en:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Standard ECMA-367. Eiffel: Analysis, Design and Programming Language. 2nd edition (June 2006)](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-367.pdf), Section 8.5.10 [page 38]  

<a name="Ref9">[9]</a> [Standard ECMA-334. C# Language Specification. 4th edition (June 2006)](http://www.ecma-international.org/publications/standards/Ecma-334.htm), Section 8.7.3 [page 34]

<a name="Ref10">[10]</a> Objective-C no cuenta ni con un estándard ni una especificación. Lo más "formal" que encontré fue una página web:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Programming With ObjectiveC](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)