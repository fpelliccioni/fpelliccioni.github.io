---
layout: post
type: post
title:  "¿Cuál es tu sabor de Objeto preferido?"

date:   2015-09-26 12:00:00
comments: true

category: english

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

En este artículo quiero continuar la discusión sobre la terminología que usamos los programadores diariamente, siguiendo con la línea de ["Usando la terminología adecuada: ¿Método?"]({% post_url es/posts/2015-08-12-usando-la-terminologia-adecuada-metodo %}).


## Introducción

Los programadores, sobre todo desde la popularización de la *Programación Orientada a Objetos*, usamos la palabra *Objeto* sin realmente pensar en su significado.  

Desde siempre me llamó la atención toda la terminología relacionada al *Paradigma de Orientación a Objetos* ya que considero que muchas de las definiciones de dicho paradigma son ambiguas o muy dispares entre los distintos autores.


## ¿Qué significa "Objeto"?

En ciencias de la computación, y especialmente en programación, no existe una definición formal ni única de "Objeto".  
Diferentes autores de lenguajes de programación y autores de textos le han atribuido diferentes significados a la misma.

Intentaré en este artículo exponer y analizar las diferentes definiciones y llegar a una conclusión sobre cuál es la definición más acorde al estilo de programación adoptado en este blog.

### Simula

La definición aportada por los autores del lenguaje de programación [Simula](https://en.wikipedia.org/wiki/Simula) es la siguiente:

> An object is a self-contained program (block instance) having its own **local data** and **actions** defined by a "class declaration". The class declaration defines a program (data and action) pattern, and objects conforming to that pattern are said to "belong to the same class". [[1]](#Ref1)

La definición anterior es importante, ya que Simula es considerado el primer lenguaje de programación *Orientado a Objetos*.

Tres cosas se destacan en la definición:

1. Un objeto tiene datos propios.
2. Un objeto incluye acciones.
3. Pertenencia de un objeto a una clase.


### Smalltalk

Si bien Simula es el primer lenguaje de programación orientado a objetos, el *marketing fuerte* del paradigma de objetos surgió con el lenguaje [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk).
Se puede decir que Smalltalk es el lenguaje más influyente en lo que respecta a *Objetos*.

Según el Manual de instrucciones de Smalltalk-72: [[2]](#Ref2):

> Every entity in Smalltalk's world is called an object. Objects can **remember things** and **communicate** with each other by sending and receiving messages. Every object belongs to a class...

Se destacan las mismas tres cosas que en la definición de Simula, pero con variaciones:

1. Un objeto tiene datos propios: "remember things".
2. Un objeto incluye acciones: La comunicación mediante mensajes es una forma particular de acción.
3. Pertenencia de un objeto a una clase.

Y, según el [estándar de Smalltalk [3]](#Ref3):

> An object is a computational entity that is capable of **responding** to a well defined set of messages. An object may also encapsulate some (possibly mutable) **state**.

Se destaca:

1. Un objeto tiene datos propios: "state".
2. Un objeto incluye acciones: La comunicación mediante mensajes es una forma particular de acción.
3. Se agrega el concepto de *mutabilidad*.


### Eiffel - Object-Oriented Software Construction

[Object-Oriented Software Construction](http://www.amazon.com/Object-Oriented-Software-Construction-CD-ROM-Edition/dp/0136291554) es una de las más importantes referencias disponibles en cuanto a *orientación a objetos*. Fue escrito por [Bertrand Meyer](https://en.wikipedia.org/wiki/Bertrand_Meyer), el diseñador del [lenguaje de programación Eiffel](https://en.wikipedia.org/wiki/Eiffel_(programming_language)).  

Eiffel es uno de los denominados *lenguajes puramente orientados a objetos*, ya que incluso sus tipos básicos (built-in types), como *integer* o *real*, están creados mediante clases.

Aquí la definición de *objeto* dada por Meyer en OOSC [[4]](#Ref4):

> Object: A run-time data structure made of zero or more **values, called fields**, and serving as the computer representation of an abstract object. Every object is an **instance of some class**.

En la definición anterior se establece que:

1. Un objeto tiene datos propios: "made of zero or more values".
2. Pertenencia de un objeto a una clase.


### C++

[C++](https://en.wikipedia.org/wiki/C%2B%2B) es un lenguaje que soporta la tecnología de objetos.  
C++ tiene una definición de *objeto* muy distinta a la que la mayoría de los programadores está acostumbrado.

Según el [estándar de C++ [5]](#Ref5):

> ... An object is a **region of storage**. [Note: A function is not an object, regardless of whether or not it occupies storage in the way that objects do. —end note] ...

### C (lenguaje de programación)

Ustedes se preguntarán por qué estoy incluyendo al [lenguaje de programación C](https://en.wikipedia.org/wiki/C_(programming_language)) en esta lista si este no incluye características de lenguajes orientados a objetos.

Si bien el lenguaje C no es un lenguaje orientado a objetos, este incluye en su  [estándar [6]](#Ref6) la definición de *objeto*:  

> object: **region of data storage** in the execution environment, the contents of which can represent values...

### Elements of Programming

[Elements of Programming](http://www.elementsofprogramming.com/) es la *magnum opus* de [Alexander Stepanov](http://www.stepanovpapers.com) y [Paul McJones](http://www.softwarepreservation.org/author/pmcjones).  
Según mi consideración, va camino a convertirse en un texto clásico de la programación, así que recomiendo a todo aquel amante de esta hermosa disciplina que no se prive de leerlo.

> An object is a representation of a [concrete entity](#RefConcreteEntity) as a **value in memory**. An object has a **state** that is a value of some value type. The state of an object is **changeable**. Given an object corresponding to a concrete entity, its state corresponds to a snapshot of that entity...  
...  
An object type is a pattern for **storing and modifying** values in memory. Corresponding to every object type is a value type describing states of objects of that type. Every object **belongs to an object type**. An example of an object type is integers represented in 32-bit two's complement little-endian format aligned to a 4-byte address boundary. [[7]](#Ref7)

En la definición anterior, Stepanov y McJones, intentan tomar distancia de cualquier tipo de paradigma de programación y establecer una definición más general de lo que un *objeto* significa. Si bien se notan claras diferencias con las definiciones anteriores, se pueden ver algunas semejanzas:

1. Un objeto tiene datos propios: "value in memory", "state".
2. Un objeto incluye acciones: "storing and modifying values in memory" son básicamente acciones o comportamiento.
3. Pertenencia de un objeto a una *object type*.
4. Un objeto es mutable.


## Conclusiones

Como ustedes habrán notado, existe una gran variedad de definiciones de *objeto*. Algunas de ellas coinciden en ciertas características y otras difieren en otras.

El autor del blog prefiere la definición dada por Stepanov y McJones en [Elements of Programming](http://www.elementsofprogramming.com/). Considero que es la definición más completa, práctica, amplia y con mayor base matemática.

Es la definición más completa, porque comienza desarrollando una taxonomía de ideas como *Entity*, *Species*, *Genus*, que sirve como base para la definición de objeto y otras definiciones. Estas definiciones no están incluídas en este artículo, para conocer más al respecto por favor referirse [al libro](http://www.elementsofprogramming.com/).

Es la definición más práctica, ya que se es consciente que todo programa se ejecuta en computadoras que poseen memoria y estas constituyen la única realización disponible de un dispositivo computacional universal. No depende de dispositivos computacionales teóricos o imaginarios.

Es la definición más amplia, ya que en ella no se excluye a lenguajes no pertenecientes al paradigma de objetos.

Nuevamente, yo hice mi elección, pero no hace falta decir que usted puede elegir la definición que más le guste, sólo asegúrese de que su pensamiento esté libre de influencias difundidas por la maquinaria propagandística de *Objetos* :).


---

## Serie "Terminología":

&nbsp;&nbsp;&nbsp;[Usando la terminología adecuada: ¿Método?]({% post_url es/posts/2015-08-12-usando-la-terminologia-adecuada-metodo %})  
&nbsp;&nbsp;&nbsp;[¿Cuál es tu sabor de Objeto preferido?]({% post_url es/posts/2015-09-26-cual-es-tu-sabor-de-objeto-preferido %}) 
 

---

## Notas / Referencias

Aclaración: El énfasis/negrita en cada una de las definiciones presentadas va por cuenta del autor del artículo.

<a name="Ref1">[1]</a> SIMULA 67: COMMON BASE LANGUAGE, by Ole-Johan Dahl, Bjørn Myhrhaug and Kristen Nygaard. Publication No. S-22. Classes 1. 3. 3 [page 6]

<a name="Ref2">[2]</a> Smalltalk-72 Instruction Manual by Adele Goldberg and Alan Kay [page 44]

<a name="Ref3">[3]</a> [ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft](http://smalltalk.org/versions/ANSISmalltalk/ANSISmalltalkStandard_v1.9_199712_NCITS_X3J20_draft.pdf), Section 3.1 [page 9]

<a name="Ref4">[4]</a> Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]  

<a name="Ref5">[5]</a> [ISO International Standard ISO/IEC 14882:2014(E) – Programming Language C++, current working draft (at Aug, 2015)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/n4527.pdf), section: 1.8 [intro.object] paragraph 1.

<a name="Ref6">[6]</a> [ISO/IEC 9899:201x Committee Draft – Programming languages — C (last draft available at Aug, 2015)](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1539.pdf), section: 13.15.

<a name="Ref7">[7]</a> [Elements of Programming](http://www.elementsofprogramming.com/) by Stepanov and McJones [2009, page 4]  

<a name="RefConcreteEntity">EoP's concrete entity definition: </a> An abstract entity is an individual thing that is eternal and unchangeable, while a **concrete entity** is an individual thing that comes into and out of existence in space and time... Blue and 13 are examples of abstract entities. Socrates and the United States of America are examples of concrete entities...

