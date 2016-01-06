---
layout: post
type: draft
title:  "Desmitificando, parte 1"

date:   2016-01-15 12:00:00
comments: true

category: english

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

En esta serie de artículos me gustaría charlar sobre cómo hacer mediciones (benchmarking) de performance de algoritmos/programas para comparar rendimiento de lenguajes de programación.

La idea de escribir sobre benchmarking me surgió al mirar un video donde compraran dos lenguajes de programación muy diferentes: [C](https://en.wikipedia.org/wiki/C_(programming_language)) y [Python](https://en.wikipedia.org/wiki/Python_(programming_language)).  
El enlace al video es éste: ["Python. Más rápido que C"](https://www.youtube.com/watch?v=cPVlYWxcu18).  
[Aquí pueden ver el código de la presentación](http://www.taniquetil.com.ar/homedevel/presents/pyrapidc/code/).  
[Y aquí los slides](http://www.taniquetil.com.ar/homedevel/presents/pyrapidc/pyrapidc.odp).

Vi el video hace más de 1 año y sinceramente no me gustó mucho. Disciento con la mayoría de los temas y conclusiones de la charla.  
Entonces, le escribí al autor de la presentación, hace ya un tiempo, para hacerle comentarios y críticas sobre la misma. 

Fui ingenuo en creer que las críticas iban a ser tomadas como algo positivo, algo constructivo para mejorar la presentación para futuras exposiciones.
A la mayoría de las personas nos cuesta entender que una crítica no es un agravio ni un confrontamiento, sino una opinión formal con fundamentos y análisis que la sustenten.

Algunos de los muchachos de la [comunidad Python Argentina](http://python.org.ar/) no tomaron a bien mis comentarios y cuál fanáticos del fútbol, política o religión comenzaron a arrojar comentarios agresivos, sólo por el hecho de haber criticado la charla/presentación.  
Quiero aclarar que las personas que arrojaron comentarios poco simpáticos sólo fueron un puñando y no por eso cambió mi visión sobre la comunidad Python Argentina, la cuál según mi apreciación, es la más multitudinaria y mejor organizada comunidad trás un lenguaje de programación en Argentina. Creo que los usuarios de los demás lenguajes de programación de Argentina deberían imitarlos.

Si quieren entrar en detalle acerca de la *cálida discución* que se armó en la lista de correo de PyAr, vean: [aquí](http://listas.python.org.ar/pipermail/pyar/2014-April/029145.html) y [aquí](http://listas.python.org.ar/pipermail/pyar/2014-April/029177.html).

Tengo que hacer un *mea culpa*, ya que en vez de listar todos los puntos que yo considero incorrectos sobre la charla, sólo hice un comentario para chequear si el tema interesaba, posponiendo el análisis para más adelante. Los puntos a tocar son muchos, por eso lo hice de esa manera, para no tomarme semejante esfuerzo y que quizás a nadie le interese. Puede ser que el haberlo hecho así, fue considerado por algunos como un ataque sin fundamentos y por ese motivo empezaron los agravios. Cada uno sabe. El hecho es que luego de los comentarios mal educados, mi motivación para continuar con la charla fue mermando.  
Los puntos a analizar están en mi cabeza desde el momento que vi el video, ahora que ha pasado el tiempo y la *calentura*, quiero, en esta serie de artículos, terminar el trabajo que tendría que haber hecho antes de enviar dicho email. Así que empecemos...


## Lenguajes de Programación

Los lenguajes de programación son herramientas para controlar el comportamiento de máquinas, casi siempre estas máquinas son computadoras. Existen miles de lenguajes de programación, cada uno con una finalidad o criterios de diseño específicos acordes a la filosofía del diseñador del lenguaje.

Como toda herramienta, no existe un lenguaje de programación ideal para realizar todas las tareas, sino que cada lenguaje se adapta mejor a uno u otro dominio.
Uno no elegiría nunca un martillo para quitar un tornillo.

Cualquier lenguaje de programación que sea [Turing completo](https://en.wikipedia.org/wiki/Turing_completeness) tiene la capacidad de realizar cualquier cálculo que cualquier  computadora sea capaz de hacer.  
Entonces, ¿cuál es la finalidad de que existan tantos lenguajes si en definitiva todos van a terminar haciendo lo mismo?  
Bueno, que los lenguajes *Turing completos* puedan realizar cualquier cálculo no implica que con un lenguaje el esfuerzo de escribir un programa sea el mismo que escribirlo con otro lenguaje. Tampoco es indicativo del tiempo de ejecución, consumo de memoria, etc, sean iguales.  
O sea, escribir un programa en un lenguaje puede requerir menor esfuerzo que escribirlo en otros lenguaje y además un lenguaje puede usar más eficientemente los recursos de la computadora que otro.

A diferencia de otras disciplinas, en programación sucede un fenómeno muy particular. Los usuarios de un determinado lenguaje de programación tienden a convertirse en fanáticos de dicho lenguaje. Defienden a muerte cualquier análisis o crítica hacia su lenguaje de preferencia tal como un fanático religioso defiende a su religión.  
También, los fanáticos, suelen realizar ataques hacia otros lenguajes, como por ejemplo comparaciones injustas o falaces para elevar a su lenguaje de programación por sobre los demás o para desprestigiar al lenguaje "adversario" más exitoso comercialmente o más popular. 
Conozco el caso de usuarios de un lenguaje X que tratan de desprestigiar de forma deliverada a un lenguaje Y, sólo porque ambos lenguajes competían en cierto nicho y el lenguaje Y superó en popularidad al lenguaje X.  
Ese tipo de odios, envidias y vaya a saber qué otro sentimiento se evidencian en ciertos fanáticos de lenguajes de programación.  
Parece increíble, pero es real. 


## Comparando Lenguajes de Programación

Usualmente nos vemos tentados en hacer comparaciones entre distintos lenguajes de programación. Pero, ¿qué podemos comparar?.

Dado un mismo algoritmo o programa, al escribirlo usando dos lenguajes de programación diferentes, es común comparar: 

- Cuánto esfuerzo conlleva escribir el programa usando uno y otro lenguaje.
- Cuán seguro o resistente a fallos es el programa.
- Cuán eficiente resulta ser el programa utilizando los recursos de una máquina, ej: CPU, memoria, batería en caso de un celular.

Cada lenguaje de programación tiene ciertas características de diseño que lo hacen sobresalir por sobre los demás en un aspecto u otro.
Conocer estas características nos posibilitan saber qué lenguaje es conveniente para cada tarea a realizar.

Quiero poner un ejemplo usando los lenguajes de la presentación ["Python. Más rápido que C"](https://www.youtube.com/watch?v=cPVlYWxcu18): [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) y [C](https://en.wikipedia.org/wiki/C_(programming_language)).  
Si bien ambos lenguajes son de [Propósito general (GPL)](https://en.wikipedia.org/wiki/General-purpose_language), *C* tiene la capacidad de ser usado para programar [Sistemas [1]](#Ref1) y [Aplicaciones](https://en.wikipedia.org/wiki/Application_software).  
En contraste *Python* es un lenguaje capaz de ser usado para programar *Aplicaciones* pero no así *Systemas*. El fuerte de *Python* es que permite expresar conceptos usando la menor cantidad de líneas de código posible y su código es muy legible; ese es el propósito por el que fue diseñado.  
Volviendo a *C*, fue diseñado para poder reimplementar el [sistema operativo Unix](https://en.wikipedia.org/wiki/Unix), anteriormente escrito en [lenguaje Ensamblador](https://en.wikipedia.org/wiki/Assembly_language) y en [lenguaje B](https://en.wikipedia.org/wiki/B_(programming_language)).



The C Abstract Model
• Very close to how a real machine works.
• Some simple abstractions
• ‘Close to the metal’
Every C language construct maps to a very short sequence of
machine instructions.


Abstract byte machine
Stepanov
C machine model


El más grande programador de la historia: Ken Thompson


En tiempos donde un Byte ni siquiera estaba definido, donde la representacion de enteros
Binary o decimal machines

Addresable byte









Python es un propósito general, el lenguaje de programación de alto nivel utilizado. Su filosofía de diseño hace hincapié en la legibilidad del código, y su sintaxis permite a los programadores para expresar conceptos en un menor número de líneas de código de lo que sería posible en lenguajes como C ++ o Java. El lenguaje proporciona construcciones destinadas a permitir que los programas claros, tanto a pequeña y gran escala.



operating systems, computational science software, game engines, industrial automation, and software as a service applications.[2]



 de es considerado un lenguaje de programación de sistemas

[lenguaje de programación de sistemas](https://www.youtube.com/watch?v=cPVlYWxcu18)

https://en.wikipedia.org/wiki/System_programming_language
https://en.wikipedia.org/wiki/System_programming
https://en.wikipedia.org/wiki/Application_software
https://en.wikipedia.org/wiki/System_software





software del sistema informático.


Propósito general GPL
having a range of potential uses; not specialized in function or design.
que tiene una serie de usos potenciales; no especializado en la función o el diseño.



Python is a widely used general-purpose, high-level programming language.[21][22] Its design philosophy emphasizes code readability, and its syntax allows programmers to express concepts in fewer lines of code than would be possible in languages such as C++ or Java.[23][24] The language provides constructs intended to enable clear programs on both a small and large scale.[25]











Lenguaje específico del dominio
 domain-specific language (DSL),


 , Logo for pencil-like drawing, Verilog and VHDL hardware description languages,  and GNU Octave for matrix programming, Mathematica, Maple and Maxima for symbolic mathematics, Specification and Description Language for reactive and distributed systems, spreadsheet formulas and macros, 






A veces, antes de encarar un proyecto, es conveniente hacer estas comparaciones entre lenguajes para elegir el más conveniente. 

La presentación ["Python. Más rápido que C"](https://www.youtube.com/watch?v=cPVlYWxcu18) trata de comparar el esfuerzo en escribir un programa y la eficiencia en el consumo de recursos entre programas escritos en [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) y en [C](https://en.wikipedia.org/wiki/C_(programming_language)).  
Con respecto al esfuerzo al escribir el programa, no son muy específicos en las métricas para realizar esta comparación, pero no me quiero centrar en esto ahora, ya vamos a ahondar en detalles más adelante. El punto central de la charla es comparar la eficiencia en el consumo de recursos entre programas escritos en *C* y programas escritos en *Python*. Más específicamente, lo que están comparando son tiempos de ejecución de programas. Así que ahora yo también me voy a centrar en este punto.

Me interesa que analicemos...

### ¿Qué es lo que realmente estamos comparando cuando comparamos consumo de recursos de Los lenguajes?


 

C
Python

General Purpose programming languages
System
Application
Components
Web


lenguaje de programación de sistemas




Pero antes de hacer cualquier comparación entre un mismo programa escrito usando dos lenguajes de programación diferentes, primero, debemos entender qué es lo que en realidad estamos comparando.




Programacion es Informática es Ciencias de la Computación... y como en toda ciencia, se necesitan metodos rigurosos para no caer en el error o en la falacia.
La ciencia es una actividad ... comunidad ... las comunidades científicas se nutren de críticas y análisis.... bla





## Benchmarking de Lenguajes de Programación









## Notas / Referencias

<a name="Ref1">[1]</a> Los [Sistemas](https://en.wikipedia.org/wiki/System_software) es software diseñado para proveer servicios a otro tipo de software, como son las [Aplicaciones](https://en.wikipedia.org/wiki/Application_software). Ejemplos de *Sistemas* pueden ser: sistemas operativos, drivers, motores de juegos.





<a name="Ref2">[2]</a> Smalltalk-72 Instruction Manual by Adele Goldberg and Alan Kay [page 44]

<a name="Ref3">[3]</a> [ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft](http://smalltalk.org/versions/ANSISmalltalk/ANSISmalltalkStandard_v1.9_199712_NCITS_X3J20_draft.pdf), Section 3.1 [page 9]

<a name="Ref4">[4]</a> Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]  

<a name="Ref5">[5]</a> [ISO International Standard ISO/IEC 14882:2014(E) – Programming Language C++, current working draft (at Aug, 2015)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/n4527.pdf), section: 1.8 [intro.object] paragraph 1.

<a name="Ref6">[6]</a> [ISO/IEC 9899:201x Committee Draft – Programming languages — C (last draft available at Aug, 2015)](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1539.pdf), section: 13.15.

<a name="Ref7">[7]</a> [Elements of Programming](http://www.elementsofprogramming.com/) by Stepanov and McJones [2009, page 4]  

<a name="RefConcreteEntity">EoP's concrete entity definition: </a> An abstract entity is an individual thing that is eternal and unchangeable, while a **concrete entity** is an individual thing that comes into and out of existence in space and time... Blue and 13 are examples of abstract entities. Socrates and the United States of America are examples of concrete entities...



























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

