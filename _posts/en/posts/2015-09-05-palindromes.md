---
layout: post
type: draft
title:  "Palindromes and more"
date:   2015-09-05 12:00:00
comments: true

category: spanish

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history, palindromos, palindromes]
---

<script type="text/x-mathjax-config">
 MathJax.Hub.Config({
  "HTML-CSS": {
    // scale: 200
    scale: (MathJax.Hub.Browser.isChrome && MathJax.Hub.Browser.isPC ? 100 : 100)
 }});
</script>

I decided to write this article from a question I saw in [stackoverflow.com](http://stackoverflow.com)

[Here](http://stackoverflow.com/questions/4138827/check-string-for-palindrome) the link to the question.

The questioner tries to write an algorithm to identify whether a "word" is a [palindrome](https://en.wikipedia.org/wiki/Palindrome) or it is not. The algorithm is written using the [Java programming language](https://en.wikipedia.org/wiki/Java_(programming_language))

No me interesa analizar el algoritmo propuesto por el autor, sino que me interesa analizar el algoritmo propuesto por el autor de la respuesta más votada. Tiene 53 votos contra 46 votos que tiene la respuesta más votada (a día de la fecha, 26 de Agosto de 2015).


I do not want to analyze the algorithm proposed by the questioner, but I want to analyze the most voted answer algorithm. There are 53 votes to 46 votes that has received the most votes (a day of the date, August 26, 2015) Answercode:..



[Aquí](http://stackoverflow.com/a/4139065/1006264) el enlace a la respuesta que me interesa.

Acá el código:

{% highlight java %}
public static boolean isPalindrome(String str) {
    return str.equals(
       new StringBuilder(str)
       .reverse()
       .toString()
    );
}
{% endhighlight %}

El algoritmo funciona correctamente y la lógica es muy intuitiva. Básicamente compara por *igualdad* la palabra original contra el reverso de la palabra.

El problema con este algoritmo es que es muy ineficiente comparado con el algoritmo óptimo.

Hice un comentario al autor de esta respuesta en Stackoverflow: "Compare the complexity of your algorithm with respect to others."  
El usuario [@aioobe](http://stackoverflow.com/users/276052/aioobe) me respondió: "I think it's the same complexity as the other solutions, no?"

En parte tiene razón.
No fui muy específico en mi comentario. Seguramente @aioobe asumió que yo me refería a la [complejidad computacional asintótica](https://en.wikipedia.org/wiki/Asymptotic_computational_complexity) y está bien que lo haya asumido de esa forma, ya que usualmente cuando decimos "complejidad" sin especificar nada más, se asume que nos estamos refiriendo a la _complejidad computacional asintótica_.


### Complejidad Computacional Asintótica

Con _complejidad computacional asintótica_ nos referimos a cómo responden los algoritmos en tiempo/espacio a medida que el input crece.  
Usualmente está asociada a la [O-notation](https://en.wikipedia.org/wiki/Big_O_notation) introducida por [Paul Bachmann](https://en.wikipedia.org/wiki/Paul_Gustav_Heinrich_Bachmann) en su libro [Die Analytische Zahlentheorie](https://archive.org/details/dieanalytischeza00bachuoft) en 1894. [[1]](#Ref1)

De esta forma podemos medir la escalabilidad de los algoritmos sin depender de la arquitectura de la máquina, de la velocidad del procesador, del lenguaje en el que está implementado el algoritmo, etc...

Si bien es muy útil en muchas circunstancias, el problema forma de medición es que no es exacta, sino que es **aproximada**.  

No quiero aquí extenderme en más detalles sobre *O-notation* ni complejidad asintótica, para información referirse a [[2]](#Ref2).


### Complejidad Computacional Concreta

Otra forma de medir algoritmos es no usar aproximaciones sino cantidades concretas operaciones, dependiendo de la entrada al algoritmo.

Por ejemplo, supongamos el algoritmo para encontrar el mínimo (o máximo) de \\( n \\) elementos. Podemos decir que dicho algoritmo tiene una complejidad (en tiempo) de \\( O(n) \\) o *lineal*.
Pero específicamente se necesitan \\( n - 1 \\) comparaciones.


### Volviendo a los Palíndromos

Repito el código que queremos analizar:

{% highlight java %}
public static boolean isPalindrome(String str) {
    return str.equals(
       new StringBuilder(str)
       .reverse()
       .toString()
    );
}
{% endhighlight %}

Al código anterior lo vamos a denominar *Algoritmo I* ("I" de ineficiente).

Podríamos decir que *Algoritmo I* es \\( O(n) \\), pero, ¿Cómo podemos asegurarlo sin conocer la complejidad de los componentes en los que el algoritmo está basado?

Para ello, debemos revisar la documentación provista para el lenguaje Java. Por ejemplo, veamos la función [String.equals()](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-). [[3]](#Ref3)

Como habrán notado en la página anterior, la documentación de Java no incluye la complejidad en tiempo ni espacio de sus algoritmos y estructuras de datos.  
Considero esto una gran falta ya que nos dificulta la especificación de la complejidad de nuestros algoritmos, al menos de los algoritmos que están basados en clases provistas por Java.

Para continuar tratando de especificar la complejidad del *Algoritmo I*, no nos queda otra que revisar directamente el código fuente de las clases Java.  
Veamos el [código fuente de String.equals()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/String.java) (presione sobre el link y busque la función equals).

Como ustedes pueden verificar, el código de String.equals() tiene complejidad lineal en tiempo, \\( O(n) \\).  
Específicamente se realizan \\( n \\) comparaciones por *desigualdad*. (Más allá de todo el ruido impuesto por Java, como los casts, instanceof, etc...).

La complejidad en espacio de String.equals() es constante, o sea, \\( O(1) \\).  
Esto quiere decir que se utiliza una cantidad de memoria constante más allá del input del algoritmo.


### Determinando la complejidad

Vamos a determinar la complejidad del *Algoritmo I*, analizando uno a sus componentes.

[String.equals()](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-). Tiempo lineal,  \\( n \\)  *comparaciones por desigualdad*. Espacio constante.

[StringBuilder.reverse()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/AbstractStringBuilder.java). Tiempo lineal,  \\( 2 \left\lfloor\dfrac{n}{2}\right\rfloor \\) asignaciones. Espacio constante.


[StringBuilder.toString()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/StringBuilder.java). Tiempo lineal,  \\( n \\)  asignaciones. Espacio lineal,  \\( n \\)  elementos.

[StringBuilder constructor](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/StringBuilder.java). Tiempo lineal,  \\( n + 16 \\)  asignaciones. Espacio lineal,  \\( n + 16 \\) elementos.


Entonces, la complejidad total del algoritmo ineficiente sería de:

**Tiempo:**  En el peor caso, cuando la palabra es un *palíndromo*, este algoritmo realiza \\( n \\)  comparaciones por *desigualdad* y \\( 2n + 2 \left\lfloor\dfrac{n}{2}\right\rfloor + 16 \\) asignaciones.  
**Espacio:**  \\( 2n + 16 \\) elementos.

Como pueden observar, este algoritmo es muy ineficiente, hace uso de memoria innecesariamente y como veremos más adelante, realiza más de \\( 8x \\) operaciones que el [algoritmo óptimo](#RefAlgoritmoOptimo).


### Mejorando el algoritmo (versión naïve)

Llamemos al siguiente código *Algoritmo N* (de naïve).
El *Algoritmo N* presenta una mejora sustancial con respecto al *Algoritmo I*.

{% highlight java %}
public static boolean isPalindrome(String str) {
    int n = str.length();
    for (int i = 0; i < n; ++i) {
        if (str.charAt(i) != str.charAt(n-i-1)) return false;
    }
    return true;
}
{% endhighlight %}

**Tiempo:** En el peor caso, cuando la palabra es un *palíndromo*, este algoritmo realiza \\( n \\) comparaciones por *desigualdad*.  
**Espacio:** constante

No se hace uso de memoria adicional y la cantidad de operaciones son \\( > 4x \\) que el *Algoritmo I*.
Si bien el código se hace un poco más complejo, es un código fácilmente entendible y el incremento en la complejidad es insignificante con respecto a la mejora en eficiencia.

<a name="RefAlgoritmoOptimo"></a>

### Algoritmo óptimo

Como podemos ver en la siguiente imagen, no hace falta hacer \\( n \\) comparaciones para determinar si una palabra es un palíndromo.

![Optimal Algorithm]({{ site.url }}/images/OptimalAlgorithm.svg)

Con sólo hacer (aproximadamente) la mitad de las comparaciones nos basta:

- Si n es par, se deben hacer \\( \dfrac{n}{2} \\) comparaciones
- Si n es impar, se deben hacer \\( \dfrac{n - 1}{2} \\) comparaciones.

El siguiente código será denominado *Algoritmo O* (de óptimo).

{% highlight java %}
public static boolean isPalindrome(String str) {
    int n = str.length();
    for (int i = 0; i < n/2; ++i) {
        if (str.charAt(i) != str.charAt(n-i-1)) return false;
    }
    return true;    
}
{% endhighlight %}


**Tiempo**: En el peor caso, cuando la palabra es un *palíndromo*, este algoritmo realiza \\( \left\lfloor\dfrac{n}{2}\right\rfloor \\) comparaciones por *desigualdad*.  
**Espacio**: constante



### Análisis detallado del *Algoritmo I* 

Como vimos anteriormente, el *Algoritmo I* es mucho más ineficiente que los algoritmos N y O.  
Pero además del análisis de complejidad que vimos antes, tenemos que tener en cuenta otras cuestiones que afectan la eficiencia del *Algoritmo I*.

Cada componente usado en el *Algoritmo I* viene con ciertas penalidades en performance que pasan desapercibidas.  
Analicémoslo en detalle.

#### Construcción de [StringBuilder](http://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)
- Asignación de memoria (memory allocation) dinámicamente para el objeto de tipo StringBuilder ([heap, free store](https://en.wikipedia.org/wiki/Memory_management#HEAP), o como quieran llamarlo).
- Inicialización en cero (Zero-Initialization) de los miembros de StringBuilder. [[4]](#Ref4)
- Asignación de memoria dinámica para el array interno dentro de StringBuilder.
	De acuerdo con la documentación, el tamaño del array interno es de 16 caracteres sumado al tamaño del String original. [[5]](#Ref5)
- Inicialización en cero (Zero-Initialization) de los miembros del array interno de StringBuilder. Length y del Array en sí. [[4]](#Ref4)
- Copia de los bytes del string original al array interno del StringBuilder.

#### reverse() (StringBuilder)
- Sólo lo mencionado anteriormente. Esta función no utiliza memoria adicional y es eficiente en tiempo de ejecución.

#### toString() (StringBuilder)
- Asignación de memoria (memory allocation) dinámicamente para el objeto de tipo [String](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html) ([heap, free store](https://en.wikipedia.org/wiki/Memory_management#HEAP), o como quieran llamarlo).
- Inicialización en cero (Zero-Initialization) de los miembros de String. [[4]](#Ref4)
- Asignación de memoria dinámica para el array interno dentro de String.
- Inicialización en cero (Zero-Initialization) de los miembros del array interno de String. Length y del Array en sí. [[4]](#Ref4)
- Copia de los bytes del string original al array interno del nuevo String.

#### equals() (String)
- Sólo lo mencionado anteriormente. Esta función no utiliza memoria adicional y es eficiente en tiempo de ejecución.

#### Garbage Collection
- El GC debe liberar toda la memoria adicional (innecesaria) que fue utilizada y obviamente esta operación no es "gratuita".

#### Data Cache Misses
- Otro inconveniente asociado al consumo innecesario de memoria es la probabilidad de que nuestros objetos sean muy grandes para entrar en el cache, provocando [cache misses](https://en.wikipedia.org/wiki/CPU_cache#Cache_miss) impactando en el tiempo de ejecución.
- Otro factor que aumenta la probabilidad de *cache misses* son las indirecciones (referencias, punteros) a porciones distantes en memoria.


### Consumo de memoria (memory footprint)

Para analizar el consumo de memoria del *Algoritmo I*, vamos a hacerlo con un ejemplo concreto. Vamos usar una palabra (de habla inglesa) de 9 caracteres, a palabra en este caso es "evitative" y es un palíndromo.

{% highlight java %}
isPalindrome("evitative");
{% endhighlight %}

Si bien consumo de memoria del *Algoritmo I* depende de la [Virtual Machine](https://en.wikipedia.org/wiki/Java_virtual_machine) y del [Runtime Environment](https://en.wikipedia.org/wiki/Java_virtual_machine#Java_Runtime_Environment_from_Oracle) que estemos usando, en este caso vamos a usar una plataforma específica que está [detallada aquí](#RefPlataforma).
 
Básicamente en nuestro ejemplo se crean dos objetos, uno de tipo StringBuilder y otro de tipo String.

#### StringBuilder:

Los objetos de tipo [StringBuilder](http://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html) tienen la siguiente representación en memoria. 

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation64CompressedOopsEnabled.svg)

Un objeto del tipo StringBuilder consiste de dos partes (no necesariamente contiguas en memoria):

- Primera parte: tamaño de utilización del array (buffer) y una referencia al array donde están los datos.
- Segunda parte: tamaño del array (que sirve como Capacity del StringBuilder) y el array con los datos.  
El tamaño del array es de 16 caracteres sumado a la cantidad de caracteres del String original ("evitative") [[5]](#Ref5). En la imagen se muestran esos 16 caracteres como recuadros de color rojo, debido a que es espacio desperdiciado.
Los caracteres en Java tienen un tamaño de 2 bytes. [[6]](#Ref6)  
O sea que en nuestro ejemplo el array va a tener un tamaño de \\( 2 \cdot (9 + 16) = 50 \\) bytes.

En Java todos los objetos tienen un [*header*](http://hg.openjdk.java.net/jdk8/jdk8/hotspot/file/87ee5ee27509/src/share/vm/oops/oop.hpp) (si conoce alguna implementación que no los tenga, [me avisa](https://twitter.com/ferpelliccioni)), en nuestra plataforma el header es de 12 bytes. En otras plataformas populares puede ser de 8 o 16 bytes, cualquier cosa [ver aquí [7]](#Ref7).

Otra cosa a tener en cuenta es el [padding](https://en.wikipedia.org/wiki/Data_structure_alignment#Data_structure_padding), que básicamente es cierto espacio de memoria que se adiciona para satisfacer el [alineamiento](https://en.wikipedia.org/wiki/Data_structure_alignment) de los objetos. En nuestro caso, los objetos deben estar alineados en direcciones de memoria múltiplos de 8.

En resumen, nuestro objeto StringBuilder tiene el siguiente tamaño en memoria (en bytes):

Primera parte: \\( 24 \\)  
Segunda parte: \\( 16 + 2n + 32 + padding \\) [[8]](#Ref8)

Total: \\( 8(\left\lceil\dfrac{n}{4}\right\rceil + 9) \\) bytes


#### String:

Los objetos de tipo [String](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html) tienen la siguiente representación en memoria. 

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk18.svg)

Un objeto del tipo String consiste de dos partes (no necesariamente contiguas en memoria):

- Primera parte: referencia al array donde están los datos y [hash](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#hashCode--).
- Segunda parte: tamaño del array (que sirve como Length del String) y el array con los datos.  

El objeto String aquí descripto pertenece a la especificación de [Java 8](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/String.java). En [versiones anteriores](http://hg.openjdk.java.net/jdk6/jdk6/jdk/file/814bf0775b52/src/share/classes/java/lang/String.java) de Java, la clase String contaba con más campos, por consiguiente su tamaño en memoria era mayor. [[7]](#Ref7)

En resumen, nuestro objeto String tiene el siguiente tamaño en memoria (en bytes):

Primera parte: \\( 24 \\)  
Segunda parte: \\( 16 + 2n + padding \\) [[8]](#Ref8)

Total: \\( 8(\left\lceil\dfrac{n}{4}\right\rceil + 5) \\) bytes



#### Total de memoria consumida:

El total de memoria consumida por nuestros objetos StringBuilder y String es de \\( 16(\left\lceil\dfrac{n}{4}\right\rceil + 7) \\) bytes.

En nuestro ejemplo \\( n = 9 \\), así que la memoria consumida es \\( 16(\left\lceil\dfrac{9}{4}\right\rceil + 7) \\) bytes, que son **160 bytes** adicionales de memoria, solo para determinar si "evitative" es un palíndromo o no.  
Recuerden que estos 160 bytes es un consumo totalmente innecesario de memoria.


## Benchmarks

Estuve haciendo algunas mediciones de performance de los algoritmos y en las mismas se percibe una penalidad en tiempo de ejecución promedio de **8.5x** del *Algoritmo I* por sobre los *Algoritmos O y N*. O sea, el *Algoritmo I* es más de 8 veces más lento que los otros dos, en promedio.

En ese promedio no estoy considerando un benchmark que arroja **586x** de penalidad, ya que el algoritmo usado en este benchmark no fue presentado en este artículo. Lo veremos en un futuro artículo.


Puede ver el código fuente de los benchmarks en [GitHub](https://github.com/fpelliccioni/componentsprogramming/tree/master/palindrome/part1/java).

La explicación del los benchmarks y el código quedará para un próximo artículo.


### *Algoritmo N* vs *Algoritmo O*

Si bien anteriormente vimos que el *Algoritmo O* realiza la mitad de operaciones que el *Algoritmo N*, en el peor caso; el tiempo de ejecución de ambos algoritmos se ve afectado por diversos factores, como por ejemplo: el largo de la palabra, si la palabra es palíndromo o no y otros factores correspondientes a la plataforma.

En muchos casos el *Algoritmo N* es más rápido en tiempo de ejecución que el *Algoritmo O*.

Analizaremos esto en un futuro artículo.

## ¿Solución definitiva?

Considero que ninguno de los tres algoritmos presentados en este artículo representan una solución definitiva, ninguno es un [Componente]({% post_url en/posts/2014-10-28-components-programming %}).

Un *componente* debe ser algo que se pueda reutilizar y en muchos casos los algoritmos aquí descriptos no son aptos para ser reutilizados.  

Además, los tres algoritmos sólo aceptan un String como input. Un palíndromo no solo es una secuencia de caracteres que se lee igual al derecho que al revez. Un palíndromo puede encontrarse en forma de notas musicales, números y como si fuera poco, los [palíndromos también se encuentran en cadenas de ADN](https://en.wikipedia.org/wiki/Palindromic_sequence).  
Los palíndromos en cadenas de ADN son tan importantes que son considerados los responsables de evitar la extinción de la especie humana (y en otras especies también) ya que de no existir los palíndromos en las cadenas de ADN, se producirían mutaciones genéticas irreversibles e incorregibles, que con el paso del tiempo provocarían la extensión de la especie.

La genética no es mi especialidad, pero ya conocía esta propiedad tan importante de los palíndromos, por lo que más adelante, en algún otro artículo, me gustaría revisar los algoritmos.

## Pendientes

Replicar el *Algoritmo I* en C# y analizar su eficiencia en tiempo de ejecución y consumo de memoria.


## Conclusiones

Las abstracciones nos facilitan nuestra labor, nos permiten concentrarnos en el problema a resolver sin tener que pensar en el contexto, como por ejemplo, la máquina (computadora).

Si bien las abstraciones son buenas, tienen una gran desventaja y es que nos hacen olvidar cómo funciona la máquina en la cual nuestro programa se ejecutará. Los programadores modernos suelen abusar de las abstraciones y no tienen conocimiento alguno sobre temas muy importantes que afectan el comportamiento de nuestros programas, como: memoria, cache, load/store buffers, branch prediction, pipelines, modelos de memoria, etc...

Considero que como programadores, debemos conocer en profundidad la computadora, el lenguaje de programación y la complejidad de los componentes que usamos. Pero lamentablemente, los programadores de hoy se han olvidado de esto y están concentrados en otras cuestiones, como testing, agile, metaprogramming y frameworks específicos que tiene una vida útil no mayor a dos años.

Volviendo a las abstracciones, la mejor de todas las abstracciones fue descubierta por [Leibniz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz) en 1679. Esa abstracción es la que nos permite modelar el mundo real en una computadora. Esa abstracción es el **BIT**.

Y por último, se puede decir que *le debemos la vida a los palíndromos*, así que, no los tomemos tan a la ligera.

---

## Agradecimientos

Un agradecimiento especial para,..., *los palíndromos* :).


---

## Notas

Byte = 8-bits.  
Hay arquitecturas donde 1 byte no necesariamente equivale a 8 bits. Estas arquitecturas son inusuales hoy en día. 
No existe un estándar que especifique el tamaño de un byte, pero se puede decir que el estándar *de facto* es que 1 byte = 8 bits, es lo más común en arquitecturas de computadoras modernas.

<a name="RefPlataforma"></a> 

#### Plataforma utilizada para el análisis en este artículo:

- CPU
  - [Intel Core i7-4700MQ](http://ark.intel.com/products/75117) CPU @ 2.40GHz, [Haswell](https://en.wikipedia.org/wiki/Haswell_(microarchitecture))
  - 4 Cores, 8 Threads
  - L1 Data Cache Size  4 x 32 KBytes
  - L1 Instructions Cache Size  4 x 32 KBytes
  - L2 Unified Cache Size 4 x 256 KBytes
  - L3 Unified Cache Size 6144 KBytes
- RAM: 8192 MBytes, DDR3
- Operating System: Windows 10 Home 64-bit
- Java
    - Version 1.8.0_60  
    - Java(TM) SE Runtime Environment (build 1.8.0_60-b27)  
    - 64-bit [HotSpot VM](https://en.wikipedia.org/wiki/HotSpot).  
    - [Compressed Oops](http://docs.oracle.com/javase/7/docs/technotes/guides/vm/performance-enhancements-7.html#compressedOop) activado  
    - [Objects alignment](https://en.wikipedia.org/wiki/Data_structure_alignment): 8 bytes.

Para el análisis en otras plataformas, por favor [referirse a [7]](#Ref7).

## Referencias

<a name="Ref1">[1]</a> Zahlen significa "Números", en Alemán. De ahí que el conjunto de los números enteros se lo identifica con la letra \\( \mathbb{Z} \\).

<a name="Ref2">[2]</a> The Art of Computer Programming Volume 1, by Donald E. Knuth [3rd Edition, page 107].

<a name="Ref3">[3]</a> ¿Por qué llamo a String.equals() "función" y no "método"?. [He aquí la respuesta]({% post_url es/posts/2015-08-12-usando-la-terminologia-adecuada-metodo %}).

<a name="Ref4">[4]</a> En Java los tipos integrales y los arrays de tipo integrales se inicializan en 0, garantizado por la especificación del lenguaje. [4.12.5 Initial Values of Variables](https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.12.5)

<a name="Ref5">[5]</a> [Java String class](http://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#StringBuilder-java.lang.String-)

<a name="Ref6">[6]</a> [Java Primitive Data Types](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)

<a name="Ref7">[7]</a> [Análisis de consumo de memoria en otras plataformas]({% post_url es/posts/2015-08-26-palindromos-otras-plataformas %}). 

<a name="Ref8">[8]</a> La fórmula para calcular el [padding](https://en.wikipedia.org/wiki/Data_structure_alignment#Data_structure_padding) de los arrays internos de StringBuilder y String son las siguientes (todo medido en bytes):  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;StringBuilder internal array padding = \\( 8\left\lceil\dfrac{2n + 48}{8}\right\rceil - (2n + 48) \\)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String internal array padding  = \\( 8\left\lceil\dfrac{2n + 16}{8}\right\rceil - (2n + 16) \\)  

(Estas fórmulas son específicas para la plataforma descripta en el artículo)

La fórmula general para calcular el padding de objetos es la siguiente:

$$ alignment\left\lceil\dfrac{size}{alignment}\right\rceil - size $$






