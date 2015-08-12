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

Simula, C++ y Java son lenguajes de tipado estático y su modelo de objetos es muy similar. Otro lenguaje de tipado estático y descendiente de Simula es [el lenguaje de programación Eiffel](https://en.wikipedia.org/wiki/Eiffel_(programming_language))

---



(Al estado de los objetos se lo almacena en Data Members)
C++ es un lenguaje que soporta el paradigma de objetos, pero desde el nacimiento de C++, este no está atado a un solo paradigma.
C++ hereda de C el paradigma de programación estructurada, o sea, C++ es un lenguaje multi-paradigma, por lo tanto, permite la creacion de funciones, tanto dentro de una clase como fuera de ella. A las funciones que son creadas fuera de una clase se las suele llamar Non-Member Functions o Free Functions.

Más allá de esto, el termino "Method" se ha popularizado de tal forma que si dicen "metodo" cualquier programador C++ sabe de que estás hablando.

¿Por qué Java y C# no adoptaron la misma terminologia que C++? (En lo que respecta a comportamiento de objetos)

Bueno, C# borrowed a lot from Java, así que la pregunta sería, ¿Por qué Java no adoptaró la misma terminologia que C++?
(
  Al margen: mas alla de que C# en sus comienzos era casi identico a Java, en ciertas cuestiones toma un camino separado a Java y quizás más cercano a C++, por ejemplo:
    - No todos los métodos son virtuales
    - In C# a parent and child classes are named Base and Derived clases, respectively (like in C++, see D&E of C++), but in Java are called Super and Sub classes.
 )
Eso es dificil de saber, habría que charlar con los creadores del lenguaje para saber el porqué de la nomenclatura.





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

Ejemplo en pseudo-código:

{% highlight cpp %}
class empleado {
  sueldo : real

  trabajar() {
    //...
  }
}
{% endhighlight %}

En el ejemplo de arriba, un empleado tiene un sueldo (estado) y realiza acciones, como "trabajar" (comportamiento). "trabajar" es un _método_.
El método trabajar no tiene código, pero si lo tuviese, el código sería <span class="underline">una secuencia de acciones con el fin de lograr cierto objetivo</span>, en este caso... trabajar :)

Recuerdo que cuando mi padre me enseño a programar, hace casi 30 años, no me enseñó lo que es un método, él no usaba esa palabra y supongo que la mayoría de los programadores de la época tampoco la usaban.
usaba la palabra "metodo" y de repente ahora es muy común.
Pero, antes de continuar con mi conjetura, me gustaría repasar (muy burdamente) sobre teoría de objetos.

Algunos de mis colegas, más que nada colegas con background en Java o .Net suelen usar esta palabra, como por ejemplo: "Escribí un método que tome una fecha y retorne un string con el nombre del día".
Yo me pregunto: ¿Por qué decimos "metodo" y no utilizamos otra palabra como "procedimiento", "función", etc?







O sea, un método es un procedimiento, funcion, routine, subroutine, pero que está incluido dentro de una clase en particular.
>>> O sea, un método es una serie de instrucciones, a las que se les pone un nombre.

Java y C# copian gran parte de su sintáxis y terminologia (glosario) de C++ (no así la semántica).
Pero en C++ no se usa el termino Method, sino que al comportamiento de los objetos se los codifica usando Member Functions.
(Al estado de los objetos se lo almacena en Data Members)
C++ es un lenguaje que soporta el paradigma de objetos, pero desde el nacimiento de C++, este no está atado a un solo paradigma.
C++ hereda de C el paradigma de programación estructurada, o sea, C++ es un lenguaje multi-paradigma, por lo tanto, permite la creacion de funciones, tanto dentro de una clase como fuera de ella. A las funciones que son creadas fuera de una clase se las suele llamar Non-Member Functions o Free Functions.

Más allá de esto, el termino "Method" se ha popularizado de tal forma que si dicen "metodo" cualquier programador C++ sabe de que estás hablando.

¿Por qué Java y C# no adoptaron la misma terminologia que C++? (En lo que respecta a comportamiento de objetos)

Bueno, C# borrowed a lot from Java, así que la pregunta sería, ¿Por qué Java no adoptaró la misma terminologia que C++?
(
  Al margen: mas alla de que C# en sus comienzos era casi identico a Java, en ciertas cuestiones toma un camino separado a Java y quizás más cercano a C++, por ejemplo:
    - No todos los métodos son virtuales
    - In C# a parent and child classes are named Base and Derived clases, respectively (like in C++, see D&E of C++), but in Java are called Super and Sub classes.
 )
Eso es dificil de saber, habría que charlar con los creadores del lenguaje para saber el porqué de la nomenclatura.



Para saber que es un método, primero me gustaría explorar distintas fuentes para saber cual es el origen de esa palabra en el ámbito informático.


...............................................................
Procedure
Function
Routine
Subroutine
Feature
Method


FORTRAN
  FORTRAN was the first high-level programming language and the first high-quality optimizing compiler. 

  PROGRAM, FUNCTION, SUBROUTINE


  Statement function
  External function
  Subroutine


  "Method"



  Fortran STANDARs Committee
    http://www.nag.co.uk/sc22wg5/
  
  Fortran 66
    ftp://ftp.nag.co.uk/sc22wg5/ARCHIVE/Fortran66.pdf
  
  Fortran 77
    ftp://ftp.nag.co.uk/sc22wg5/ARCHIVE/Fortran77.html

  Fortran 90
    ftp://ftp.nag.co.uk/sc22wg5/N001-N1100/N692.pdf

  Fortran 95
    ftp://ftp.nag.co.uk/sc22wg5/N1151-N1200/N1191.pdf

  Fortran 2003
    ftp://ftp.nag.co.uk/sc22wg5/N1601-N1650/N1601.pdf

  Fortran 2008 (working)
    http://j3-fortran.org/doc/year/10/10-007r1.pdf


  http://www.softwarepreservation.org/projects/FORTRAN/

Algol
  
  ALGOL (short for ALGOrithmic Language)[1] is a family of imperative computer programming languages, originally developed in the mid-1950s, which greatly influenced many other languages and was the standard method for algorithm description used by the ACM in textbooks and academic sources for more than thirty years.[2]

  In the sense that most modern languages are "algol-like",[3] it was arguably the most successful of the four high-level programming languages with which it was roughly contemporary


  http://www.softwarepreservation.org/projects/ALGOL/

Simula
  Procedure          (ALGOL)
  function procedure (ALGOL)

  local procedure
  non-local procedure

  http://www.edelweb.fr/Simula/#7



  Parece que en SIMULA I un objeto (de OOP) es llamado Process

    slp-complete.pdf - Chapter 2 - page 10
    "It has its own local data and
    its own behaviour pattern.
    A system may contain several processes with a similar data
    structure and the same behaviour pattern. Such processes are
    said to belong to the same class, called an activity."" 

  SIMULA 67
    1. 3. 3 Classes

      A central new concept in SIMULA 67 is the "object".
      An object is a self-contained program (block instance)
      having its own local data and actions defined by a
      "class declaration". The class declaration defines a
      program (data and action) pattern, and objects conforming
      to that pattern are said to "belong to the same class".
      If no actions are specified in the class declaration,
      a class of pure data structures is defined.   


Smalltalk

  NCITS J20 DRAFT December, 1997 of ANSI Smalltalk Standard revision 1.9
  ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft (PDF)


  A Smalltalk program is a means for describing a dynamic computational process. This section
  defines the entities that exist in the computational environment of Smalltalk programs.
  
  A variable is a computational entity that stores a single reference (the value of the variable) to an
  object.
  
  A message is a request to perform a designated computation. An object is a computational entity
  that is capable of responding to a well defined set of messages. An object may also encapsulate
  some (possibly mutable) state.
  
  An object responds to a message by executing a method. Each method is identified by an
  associated method selector. A behavior is the set of methods used by an object to respond to
  messages.
  
  A method consists of a sequence of expressions. Program execution proceeds by sequentially
  evaluating the expressions in one of more methods. There are three types of expressions:
  assignments, message sends, and returns.

CLOS

C

C++
  n3936.pdf

  8.3.5 Functions [dcl.fct]

  9.3 Member functions [class.mfct]
  1 Functions declared in the definition of a class, excluding those declared with a friend specifier (11.3), are called member functions of that class. A member function may be declared static in which case it is a static member function of its class (9.4); otherwise it is a non-static member function of its class (9.3.1, 9.3.2).



Eiffel
  1. ECMA Standard 367 

    8.5.10 Definition: Routine, function, procedure
    A Feature_declaration is a routine declaration if and only if it satisfies the following condition:
    • There is a Feature_value including an Attribute_or_routine, whose Feature_body is of the Deferred or Effective_routine kind.
    If a Query_mark is present, the routine is a function; otherwise it is a procedure.

  2. BM - Object Oriented Software Construction vol.2



    Eiffel - Object-Oriented Software Construction (2nd Ed) - Bertrand Meyer

    Representing a
    point in
    cartesian
    coordinates


    Feature: Computation or Memory


    This example shows the need for two kinds of feature:
    • Some features will be represented by space, that is to say by associating a certain
    piece of information with every instance of the class. They will be called attributes.
    For points, x and y are attributes in cartesian representation; rho and theta are
    attributes in polar representation.

    • Some features will be represented by time, that is to say by defining a certain
    computation (an algorithm) applicable to all instances of the class. They will be
    called routines. For points, rho and theta are routines in cartesian representation; x
    and y are routines in polar representation.

    A further distinction affects routines (the second of these categories). Some routines
    will return a result; they are called functions. Here x and y in polar representation, as well
    as rho and theta in cartesian representation, are functions since they return a result, of type
    REAL. Routines which do not return a result correspond to the commands of an ADT
    specification and are called procedures. For example the class POINT will include
    procedures translate, rotate and scale.

Objective-C


Java

  Java Language Specification

    8.4 Method Declarations
    A method declares executable code that can be invoked, passing a fixed number of values as arguments.
    227
    8.4 Method Declarations
    CLASSES
    228
    MethodDeclaration:
    {MethodModifier} MethodHeader MethodBody
    MethodHeader:
    Result MethodDeclarator [Throws]
    TypeParameters {Annotation} Result MethodDeclarator [Throws]
    MethodDeclarator:
    Identifier ( [FormalParameterList] ) [Dims]
    The following production from §4.3 is shown here for convenience:
    Dims:
    
    The FormalParameterList is described in §8.4.1, the MethodModifier clause in §8.4.3, the TypeParameters clause in §8.4.4, the Result clause in §8.4.5, the Throws clause in §8.4.6, and the MethodBody in §8.4.7.
    The Identifier in a MethodDeclarator may be used in a name to refer to the method (§6.5.7.1, §15.12).
    It is a compile-time error for the body of a class to declare as members two methods with override-equivalent signatures (§8.4.2).
    The scope and shadowing of a method declaration is specified in §6.3 and §6.4.
    The declaration of a method that returns an array is allowed to place some or all of the bracket pairs that denote the array type after the formal parameter list. This syntax is supported for compatibility with early versions of the Java programming language. It is very strongly recommended that this syntax is not used in new code.

  Java Tutorials
    Software objects are conceptually similar to real-world objects: they too consist of state and related behavior. An object stores its state in fields (variables in some programming languages) and exposes its behavior through methods (functions in some programming languages). Methods operate on an object's internal state and serve as the primary mechanism for object-to-object communication. Hiding internal state and requiring all interaction to be performed through an object's methods is known as data encapsulation — a fundamental principle of object-oriented programming.

    https://docs.oracle.com/javase/tutorial/java/concepts/object.html

C#
  C# Specification
  C# ECMA Standard (ISO Standard)


  8.7.3 Methods
  A method is a member that implements a computation or action that can be performed by an object or class. Methods have a (possibly empty) list of formal parameters, a return value (unless the method’s return-type is void), and are either static or non-static. Static methods are accessed through the class. Non-static methods, which are also called instance methods, are accessed through instances of the class. A generic method (§25.6) has a list of one or more type parameters. The example

Python

  APPENDIX A - GLOSSARY

    method A function which is defined inside a class body. If called as an attribute of an instance of that class, the
    method will get the instance object as its first argument (which is usually called self). See function and
    nested scope.

    function A series of statements which returns some value to a caller. It can also be passed zero or more arguments
    which may be used in the execution of the body. See also parameter, method, and the Function definitions
    section.  


    6.1 Expression statements
    procedure
    (a function that returns no meaningful result; in Python, procedures return the value None).


Knuth - The Art of Computer Programming
      - Concrete Mathematics

Elements of Programming

Design and Evolution of C++

Dijstra ?
Wirth ?


RAE
Britsh


Mathematics
  "asymptotic methods"
  "repertoire method"
  general method



*** Hacer referencia a la Pagina de Historia de la Computacion de Paul Mc Jones
*** Escribirle a Paul Mc Jones para mostrarle el articulo y preguntarle sobre METHOD
*** Escribirle a Alex para consultarle sobre Regular Producedure vs Pure Function





Real Academia Espanola

  método.
  (Del lat. methŏdus, y este del gr. μέθοδος).
  1. m. Modo de decir o hacer con orden.
  2. m. Modo de obrar o proceder, hábito o costumbre que cada uno tiene y observa.
  3. m. Obra que enseña los elementos de una ciencia o arte.
  4. m. Fil. Procedimiento que se sigue en las ciencias para hallar la verdad y enseñarla.
  



...............................................................

{% highlight cpp %}
class employee {
  id: natural32
  other: natural32	
}

class test {
  a: natural32 := 0x88FF7799
  employees: array<employee> := { {0xA1B2C3D4, 0x11223344}, 
                                  {0x92817348, 0x96161728}, 
                                  {0x61592308, 0xa8857472 } }
  b: natural32 := 0x12345678
}

//program entry-point
main() {	
  tc := test{}
  // analyze memory here!
}
{% endhighlight %}



The program consists of a main function (entry-point) in which is created an object of type "test".  
The test class has three data members (or Fields, in order to use Java/C# jargons):

- a: it is 32-bits natural number (like C/C++'s uint32_t). It is set to 88FF7799 (base16)
- employees: it is a sequence of elements of type "employee".
             The employees sequence is filled with three elements.
- b: it is 32-bits natural number. It is set to 12345678 (base16)

The employee class has two data members:
- id: it is 32-bits natural number
- other: it is 32-bits natural number

Note: "array" is a data structure that stores elements contiguosly in memory.
	  The size of the sequence is dynamic, it is resizable.
	  Equivalents: C++ std::vector, .Net List<T>, Java ArrayList<T>		 

For example it is not necessary runtime polymorphism neither runtime type introspection (aka Reflection).
For simplicity all the data members are public.


Now, let's code in real programming languages:








C++ code

{% highlight cpp %}
#include <vector>
using namespace std;

struct employee {
  uint32_t id;
  uint32_t other;
};

struct test {
  uint32_t a {0x88FF7799};
  vector<employee> employees { {0xA1B2C3D4, 0x11223344}, 
                               {0x92817348, 0x96161728}, 
                               {0x61592308, 0xa8857472}};
  uint32_t b {0x12345678};
};

int main(int argc, char const* argv[]) {
  test t;
  // analyze memory here!
  return 0;
}
{% endhighlight %}



Java code: 

{% highlight cpp %}
import java.util.ArrayList;

class Employee {
  public int id;
  public int other;

  public Employee(int id, int other) {
    this.id = id;
    this.other = other;
  }
}

class Test {
  public int a = 0x88FF7799;
  public ArrayList<Employee> employees = new ArrayList<Employee>();
  public int b = 0x12345678;

  public Test() {
    employees.add(new Employee(0xA1B2C3D4, 0x11223344));
    employees.add(new Employee(0x92817348, 0x96161728));
    employees.add(new Employee(0x61592308, 0xa8857472));
  }
}

public class MainClass {
  public static void main(String args[]) {
    Test t = new Test();
    // analyze memory here!
  }    
}
{% endhighlight %}



C# code

{% highlight cpp %}
using System;
using System.Collections.Generic;

internal class Employee
{
  public uint Id;
  public uint Other;

  public Employee(uint id, uint other)
  {
    Id = id;
    Other = other;
  }
}

internal class Test
{
  public uint A = 0x88FF7799;
  public List<Employee> Employees = new List<Employee> {
    new Employee(0xA1B2C3D4, 0x11223344),
    new Employee(0x92817348, 0x96161728),
    new Employee(0x61592308, 0xa8857472) };
  public uint B = 0x12345678;
}

class Program
{
  static void Main(string[] args)
  {
    var t = new Test();
    // analyze memory here!
  }
}
{% endhighlight %}




I tried to write idiomatic code (as possible) in each of the languages.
I am not trying to be OO-purist.
I just tried to write the simplest code to later analyze the memory more easily.
Disclaimer: ....









References:

	.Net BCL System.Array class specification:
		https://msdn.microsoft.com/en-us/library/system.array%28v=vs.110%29.aspx

	.Net BCL System.Array class source code:
		http://referencesource.microsoft.com/#mscorlib/system/array.cs,1f52f2a267c6dbe7

	.Net BCL System.Collections.Generic.List<T> class specification:
		https://msdn.microsoft.com/en-us/library/6sh2ey19%28v=vs.110%29.aspx
		
	.Net BCL System.Collections.Generic.List<T> class source code:
		http://referencesource.microsoft.com/#mscorlib/system/collections/generic/list.cs,cf7f4095e4de7646


	Drill Into .NET Framework Internals to See How the CLR Creates Runtime Objects
		https://msdn.microsoft.com/en-us/magazine/cc163791.aspx


	Java ARTICLES
		https://www.yourkit.com/docs/kb/sizes.jsp
		https://wikis.oracle.com/display/HotSpotInternals/CompressedOops
		http://www.docjar.com/docs/api/sun/misc/Unsafe.html
		http://mishadoff.com/blog/java-magic-part-4-sun-dot-misc-dot-unsafe/
		http://java-performance.info/memory-introspection-using-sun-misc-unsafe-and-reflection/



