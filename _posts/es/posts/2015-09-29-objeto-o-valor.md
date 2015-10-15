---
layout: post
type: draft
title:  "¿Objeto o Valor?"

date:   2015-09-29 12:00:00
comments: true

category: english

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

Estuve por [Stackoverflow.com](http://stackoverflow.com) y vi una [pregunta/respuesta](http://stackoverflow.com/questions/6026824/detecting-a-nullable-type-via-reflection) que me llamó la atención y me llevó a escribir este artículo, en el cual quiero discutir la diferencia entre *objeto* y *valor*.

En el [artículo anterior]({% post_url es/posts/2015-09-26-cual-es-tu-sabor-de-objeto-preferido %}) vimos varias definiciones de *objeto* y mencioné cuál es mi definición de preferecia, argumentando las bondades de la misma.

Ahora quiero usar la pregunta de Stackoverflow como ejemplo para señalar las diferencias entre *objeto* y *valor*.

El autor de la pregunta quiere saber sobre algún mecanismo que le indique cuándo un objeto es de tipo [Nullable\<T>](https://msdn.microsoft.com/en-us/library/b3h38hb0(v=vs.110).aspx) o cuándo no lo es. La pregunta es específica del [lenguaje de programación C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)). 

>"...So just out curiosity, how can you determine if a given instance is a **Nullable<> object** or not?"

Español: "...Sólo por curiosidad, ¿cómo se puede determinar si una instancia dada es un **objeto Nullable** o no?"


Me interesa analizar [la respuesta aceptada](http://stackoverflow.com/questions/6026824/detecting-a-nullable-type-via-reflection/6026873#6026873), cuyo autor es [Jon Skeet](http://stackoverflow.com/users/22656/jon-skeet), una persona muy reconocida en el mundo .Net, y autor de [C# in Depth](http://csharpindepth.com/).

La parte que me interesa es donde Jon dice:

>"Well firstly, **Nullable\<T>** is a **struct**, so there isn't an **object** as such..."

Español: "Bueno en primer lugar, **Nullable\<T>** es un **struct**, por lo tanto, no es un **objeto**..."

Veamos primero, antes de analizar lo que Jon quiso decir, qué es un *ValueType*, qué es un *struct* y qué es *Nullable\<T>*.

### *Value* versus *Reference Types*

(Las siguientes definiciones son específicas del lenguaje C#.)  
En C# los tipos se clasifican en las siguientes categorías: Value types, reference types, type-parameter types y pointers (en código unsafe). De estas cuatro categorías por el momento nos interensan sólo las dos primeras, value types y reference types.

Básicamente, la diferencia entre *value type* y *reference type* es que toda instancia de un *value type* contiene sus datos en forma directa, mientras que un *reference type* es una referencia hacia el lugar donde los datos están contenidos.

Un *reference type* es una clase regular de C#, la cual creamos usando la palabra reservada *class*, en cambio un *value type* debe crearse usando la palabra reservada *struct*. [[1]](#Ref1)

Ejemplos de *value types* son los tipos simples (c# simple types), como bool, int, double, etc... [[2]](#Ref2).
Un ejemplo de *reference type* es el tipo string.

Veamos ahora un ejemplo de código para apreciar las diferencias.

{% highlight csharp %}
class Employee
{
    public int Id;
    public int Age;
    //...

    public Employee(int id, int age)
    {
        Id = id;
        Age = age;
    }
}
{% endhighlight %}

Aquí *Employee* es un *reference type*, ya que fue declarado usando el keyword *class*.

{% highlight csharp %}
class TestRefType
{
    public int A = 1;
    public Employee E = new Employee(2, 36);
    public int B = 3;
}
{% endhighlight %}

*TestRefType* también un *reference type*, pero no me interesa evaluar esto sino como se almacena en memoria una instancia de *TestRefType*, como por ejemplo:

{% highlight csharp %}
var trt = new TestRefType();
{% endhighlight %}

Veamos ahora la representación en memoria:

![Reference types memory representation]({{ site.url }}/images/ObjectOrValueCSharp64RefType.svg)

En la figura anterior, podemos apreciar que al crear una instancia de *TestRefType* contamos con:

- trt: una referencia al objeto de tipo *TestRefType*. Las referencias en la plataforma en la que estoy haciando la prueba tienen un tamaño de 64 bits, 8 bytes.
- El objeto *TestRefType* propiamente dicho. Este objeto incluye el *header* [[3]](#Ref3), los campos (*fields*) de la clase y *padding* [[4]](#Ref4). Los campos son A, B y E. E es una referencia al objeto de tipo *Employee*. 
- El objeto *Employee* propiamente dicho. Al igual que el anterior, incluye el *header*, los campos y padding.

Veamos ahora el mismo ejemplo, pero haciendo que *Employee* sea un *Value Type*.

{% highlight csharp %}
struct EmployeeVal
{
    public int Id;
    public int Age;

    public EmployeeVal(int id, int age)
    {
        Id = id;
        Age = age;
    }
}
{% endhighlight %}

En este caso lo llamé *EmployeeVal* para diferenciarlo de la clase *Employee*. Noten que *EmployeeVal* está declarado como un *struct*, por lo tanto es considerado un *Value Type* de C#/.Net.

{% highlight csharp %}
class TestValueType
{
    public int A = 1;
    public EmployeeVal E = new EmployeeVal(2, 36);
    public int B = 3;
}  
{% endhighlight %}

*TestValueType* es la clase equivalente a *TestRefType* pero se compone de *EmployeeVal* en vez de *Employee*. *TestValueType* es un *reference type*.

Una instancia de *TestValueType* ...

{% highlight csharp %}
var tvt = new TestValueType();
{% endhighlight %}

... se representa en memoria de la siguiente manera:

![Value types memory representation]({{ site.url }}/images/ObjectOrValueCSharp64ValueType.svg)

En una instancia de *TestValueType* contamos con:

- tvt: una referencia al objeto de tipo *TestValueType*.
- El objeto *TestValueType* propiamente dicho. Al igual que antes, este objeto incluye el *header*, los campos y *padding*. Los campos son A, B y E. 
En este caso E no es una referencia a un objeto distante, sino que sus datos están contenidos o *en línea* dentro del objeto *TestValueType*.



## ... ¿Entonces?

Entonces, ¿cuál es la diferenica entre un *value type* y un *reference type*? (Recuerde que estamos hablando específicamente del lenguaje C#)

Como pudieron ver en la sección anterio, la única diferecia substancial entre ambos es la forma en la que se almacenan los datos. Con los *reference types* los datos se almacenan en forma remota usando una referencia para acceder a ellos y con los *value types* los datos son almacenados localmente sin necesidad de referencias.

La razón principal para usar un *value type* por sobre un *reference type* es: eficiencia.   
La mejora en eficiencia es en tiempo y en espacio.

- En tiempo: por la penalidad provocada al acceder a la posición de memoria donde se encuentran los datos (*dereferencing*). Dependiendo de cuán lejos se encuentren los datos de la referencia puede provocarse un *data cache miss* lo cual aumenta aun más la demora.
- En espacio: ya que no solo tenemos los datos en sí, sino que a esto hay que adicionarle la referencia. El tamaño de la referencia (o puntero) depende de la plataforma. En mi computadora, las referencias tienen un tamaño de 64 bits (8 bytes). El desperdicio de espacio es aun peor con los *reference types* ya que los mismos incluyen un *header* que suele tener entre 8 y 12 bytes de tamaño dependiendo de la plataforma. REF???  
Considere la diferencia en tamaño de las instancias de *Employee* y *EmployeeVal* mostrado en las figuras anteriores.

Existen otras diferencias entre los *value types* y los *reference types*, pero no me interesa analizarlo aquí. Para ver estas diferecias puede verlas directamente en el Estándar C#. REF???

Entonces, hasta aquí, hemos visto la diferencia fundamental entre *value types* y *reference types*, ahora estamos en condiciones de responder ...

## *struct*: ¿objeto o valor?

Recuerden la respuesta de Jon Skeet:

>"Well firstly, **Nullable\<T>** is a **struct**, so there isn't an **object** as such..."

Jon dice que, cómo *Nullable\<T>* es un *struct*, entonces una instancia de *Nullable\<T>* no es un *objeto*.

Bueno, yo disciento con Jon, voy a argumentar mi diferencia en dos caminos:

1. Definición C# de objeto y valor
2. Definiciones en leguajes similares
3. Definición general (¿formal?) de objeto y valor.

### 1. Definición C# de objeto y valor
    
- El éstandar C# REF??? no define que sifnifica *objeto* ni que significa *valor* 
4. Definitions


"Value types differ from reference types in that variables of the value types directly contain their data,
whereas variables of the reference types store references to objects.""
8.2 Types


"All types—including value types—derive from the type object."
8.2.4 Type system unification




8.7.2 Fields
A field is a member that represents a variable associated with an object or class. The example


{% highlight csharp %}
class Color
{
    internal ushort redPart;
    internal ushort bluePart;
    internal ushort greenPart;
    public Color(ushort red, ushort blue, ushort green) {
    redPart = red;
    bluePart = blue;
    greenPart = green;
    }
    public static Color Red = new Color(0xFF, 0, 0);
    public static Color Blue = new Color(0, 0xFF, 0);
    public static Color Green = new Color(0, 0, 0xFF);
    public static Color White = new Color(0xFF, 0xFF, 0xFF);
}
{% endhighlight %}




8.7.3 Methods
A method is a member that implements a computation or action that can be performed by an object or class.

8.7.4 Properties
A property is a member that provides access to a characteristic of an object or a class.

8.8 Structs
The list of similarities between classes and structs is long—structs can implement interfaces, and can have
the same kinds of members as classes. Structs differ from classes in several important ways, however:
structs are value types rather than reference types, and inheritance is not supported for structs. Struct values
are stored “on the stack” or “in-line”. Careful programmers can sometimes enhance performance through
judicious use of structs.



11. Types

"Value types differ from reference types in that variables of the value types directly contain their data,
whereas variables of the reference types store references to their data, the latter being known as objects."

11.1.1 The System.ValueType type
"All value types implicitly inherit from the class System.ValueType, which, in turn, inherits from class
object."


System.ValueType


### 2. Definiciones en leguajes similares

El lenguaje Eiffel REF??? también cuenta con *reference types* y *value types*, al igual que C#, aunque estos últimos son denominados *expanded types*, según la terminología de Eiffel. 
La finalidad de los *expanded types* de Eiffel es la misma que la de los *value types* de C#: evitar tener referencias a objetos distantes, logrando una mejora en eficiencia (en tiempo y espacio).

Sin embargo, según Object-Oriented Software Construction REF??? PAGINA, SECCION???, 

>An entity declared of type E, and E is an *expanded type*, will denote an object, not a reference to an object.

8.7 COMPOSITE OBJECTS AND EXPANDED TYPES, Pagina 255 ???

Así que para Eiffel, tanto las instancias de *reference types* como de *expanded types* (*value types*) son consideradas objetos, la diferencia es que los primeros son alcanzados mediante referencias y los últimos son considerados objetos en sí mismos.


### 3. Definición general (¿formal?) de objeto y valor.

De acuerdo a la [definición de *objeto* adoptada]() REF??? por este blog, los *value types* de C# son equivalentes a *object types* de Elements of Programming REF??.
Según la definición general (no específica a C#) de *value type*, estos son una correspondencia entre una *especie* (*species*) y un conjunto de *datos*. Los *values* son *inmutables*.
REF PARA SPECIES Y DATUM

Cualquier lenguaje de programación que diga soportar *value types* reales, tiene que soportar *inmutablidad absoluta* de los *values*. Veremos más adelante que implica que un lenguaje soporte *inmutabilidad absoluta*.

## C# e inmutabilidad de *value types*

En C# los *values* no son necesariamente inmutables, por ejemplo:

Por ejemplo, los objetos de tipo System.Int32 o int no son inmutables.

{% highlight csharp %}
int a = 15;
a = 34;
{% endhighlight %}

Uno puede modificar sus datos sin que esto equivalga a hacer una copia del objeto manteniendo dos copias inmutables, como sucede en algunos lenguajes funcionales, como Haskell. REF?

Aquí otro ejemplo de un *C# Value Type* que tambiés es mutable:

{% highlight csharp %}
Nulable<int> x = 15;
x = null;
{% endhighlight %}

Aquí otro ejemplo de un *C# Value Type* que es mutable.





















- Los *values* son inmutables.
- El lenguaje no debe permitir acceder a la memoria mediante punteros o referencias.  
Ya que si los punteros/referencias son permitidos, se viola la condición de inmutabilidad, ya que la memoria es modificable. 


C# has no way to describe *values* and *value types* as separate from *objects* and *object types*. ???????


## Condiciones anteriores en C# ????

1. Los *values* son inmutables.

En C# los *values* no son necesariamente inmutables, por ejemplo:

{% highlight csharp %}
int a = 15;
a = 34;
{% endhighlight %}

Los objetos de tipo System.Int32 o int no son inmutables. Uno puede modificar sus datos sin que esto equivalga a hacer una copia del objeto.

{% highlight csharp %}
Nulable<int> x = 15;
x = null;
{% endhighlight %}

Aquí otro ejemplo de un *C# Value Type* que es mutable.




## Otros Lenguajes

### C++

En C++ podemos lograr el mismo efecto que en los ejemplos anterios de la siguiente manera:

{% highlight cpp %}
struct employee {
    int id;
    int age;
};
{% endhighlight %}

{% highlight cpp %}
struct test_value_type {
    int a = 1;
    employee e {2, 36};
    int b = 3;
};
{% endhighlight %}

{% highlight cpp %}
struct test_value_type {
    int a = 1;
    employee e {2, 36};
    int b = 3;
};
{% endhighlight %}

### Eiffel






-- REFERENCES --

11.1 Value types
ECMA, pagina 107



[3]
El *object header* es un encabezado que incluyen todos los *reference types* en .Net. Esto no está especificado en el estándar [[4]](#Ref4), pero todas las implementaciones (¿cuántas son?, ¿2?) que conozco

[4]
El padding, que en este caso es de 4 bytes, se debe a que el objeto debe rellenarse para poder cumplir con el








Lo que el autor de la pregunta necesita, es una función como la siguiente: [1](#Ref1)

{% highlight cpp %}
bool IsNullable<T>(T x) 
{
    return /* Tell me if x is a Nullable<?> object */;
}
{% endhighlight %}





[la siguiente respuesta](http://stackoverflow.com/questions/6026824/detecting-a-nullable-type-via-reflection/6026873#6026873) de [Jon Skeet](http://stackoverflow.com/users/22656/jon-skeet) en el sitio [Stackoverflow.com](http://stackoverflow.com).

[Aquí el link a la respuesta](http://stackoverflow.com/questions/6026824/detecting-a-nullable-type-via-reflection/6026873#6026873).




El autor de la pregunta Está hablando del [lenguaje de programación C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)).  
[Nullable\<T>](https://msdn.microsoft.com/en-us/library/b3h38hb0(v=vs.110).aspx) es un Value Type???.

Jon está diciendo que, por ejemplo:

{% highlight csharp %}
var x = new Nullable<int>(15);
var s = new String("this is a ...");
{% endhighlight %}

*s* es un objeto, pero *x* no lo es.

Este artículo tiene una doble finalidad.  
La primera, exhibir las distintas definiciones de *Objeto* que existen y determinar cuál de ellas es la más apropiada acorde al estilo de programación preferido por el autor del blog.  
La segunda, considerando los distintos significados de *Objeto* presentados antes, determinar si *x*, del tipo *Nullable\<T>*, puede ser considerado un objeto o no.

Analicemos entonces el significado de *Objeto* en primer lugar...










Dada la [definición de *objeto* del artículo anterior]({% post_url es/posts/2015-09-26-cual-es-tu-sabor-de-objeto-preferido %}), me gustaría discutir [una pregunta](http://stackoverflow.com/questions/6026824/detecting-a-nullable-type-via-reflection) y [una respuesta](http://stackoverflow.com/questions/6026824/detecting-a-nullable-type-via-reflection/6026873#6026873) que dos usuarios hacen en el sitio [Stackoverflow.com](http://stackoverflow.com).

La pregunta específicamente 





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

