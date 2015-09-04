---
layout: post
type: draft
title:  "Palíndromos???????"
date:   2015-08-25 12:00:00
comments: true

category: spanish

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

<script type="text/x-mathjax-config">
 MathJax.Hub.Config({
  "HTML-CSS": {
    scale: 200
 }});
</script>

Decidí escribir este artículo a partir de una pregunta de que vi en [stackoverflow.com](http://stackoverflow.com)

[Aquí](http://stackoverflow.com/questions/4138827/check-string-for-palindrome) el enlace a la pregunta.

El autor de la pregunta intenta escribir un algoritmo que identifique si una "palabra" es un [palíndromo](https://es.wikipedia.org/wiki/Pal%C3%ADndromo) o no lo es.
El algoritmo está escrito usando el lenguaje de programación [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

No me interesa analizar el algoritmo propuesto por el autor, sino que me interesa analizar el algoritmo propuesto por el autor de la respuesta más votada. Tiene 53 votos contra 46 votos que tiene la respuesta más votada (a día de la fecha, 26 de Agosto de 2015).

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

El algoritmo funciona correctamente y la lógica es muy intuitiva. Básicamente compara por igualdad la palabra original con la palabra al reverso.

El problema con este algoritmo es que es muy ineficiente comparado con el algoritmo óptimo.

Hice un comentario al autor de esta respuesta en Stackoverflow: "Compare the complexity of your algorithm with respect to others."  
El usuario [@aioobe](http://stackoverflow.com/users/276052/aioobe) me respondió: "I think it's the same complexity as the other solutions, no?"

En parte tiene razón.
No fui muy específico en mi comentario. Seguramente @aioobe asumió que yo me refería a la [complejidad computacional asintótica](https://en.wikipedia.org/wiki/Asymptotic_computational_complexity) y está bien que lo haya asumido de esa forma, ya que usualmente cuando decimos "complejidad" sin especificar nada más, se asume que nos estamos refiriendo a la _complejidad computacional asintótica_.


### Complejidad Computacional Asintótica

Con _complejidad computacional asintótica_ nos referimos a la medición de cómo responden los algoritmos en tiempo/espacio a medida que el input crece.  
Usualmente está asociada a la [O-notation](https://en.wikipedia.org/wiki/Big_O_notation) introducida por [Paul Bachmann](https://en.wikipedia.org/wiki/Paul_Gustav_Heinrich_Bachmann) en su libro [Die Analytische Zahlentheorie](https://archive.org/details/dieanalytischeza00bachuoft) en 1894. 

De esta forma podemos medir la escalabilidad de los algoritmos sin depender de la arquitectura de la máquina, de la velocidad del procesador, del lenguaje en el que está implementado el algoritmo, etc...

Si bien es muy útil en muchas circunstancias, el problema forma de medición es que no es exacta, sino que es **aproximada**.  

No quiero aquí extenderme en más detalles sobre O-notation ni complejidad asintótica, para información referirse a [1]


### Complejidad Computacional Concreta

Otra forma de medir algoritmos es no usar aproximaciones sino cantidad concreta de ciertas operaciones, siempre dependiendo de la entrada al algoritmo.

Por ejemplo, supongamos el algoritmo para encontrar el mínimo (o máximo) de N elementos. Podemos decir que dicho algoritmo tiene una complejidad (en tiempo) de O(n) o lineal.
Pero específicamente se necesitan **n - 1** comparaciones.


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

Al código anterior lo vamos a denominar *Algoritmo I* (de ineficiente).

Podríamos decir que isPalindrome es O(n), pero, ¿cómo podemos asegurarlo sin conocer la complejidad de los componentes en los que isPalindrome está basado?

Para medir la complejidad del algoritmo anterior deberíamos poder saber la complejidad de los componentes que está usando.

Para ello, debemos revisar la documentación Java, por ejemplo, veamos la función [String.equals()](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-). [3] ?????? Por que le llama funcion?????
La documentación de Java no incluye la complejidad en tiempo ni espacio de sus algoritmos.  

Considero esto una gran falta ya que nos dificulta la especificación de la complejidad de nuestros algoritmos, al menos de los algoritmos que están basados en clases provistas por Java.

Para continuar tratando de especificar la complejidad de isPalindrome, no nos queda otra que revisar directamente el código fuente de las clases Java.  
Veamos el [código fuente de String.equals()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/String.java) (presione sobre el link y busque la función equals).

Como ustedes puede verificar, el código de String.equals() tiene complejidad lineal en tiempo, O(n).  
Específicamente se realizan N comparaciones por desigualdad. (Más allá de todo el ruido impuesto por Java, como los casts, instanceof, etc...).

La complejidad en espacio de String.equals() es constante, O(1). Esto quiere decir que se utiliza una cantidad de memoria constante más allá del input del algoritmo.


### Determinando la complejidad

Vamos a analizar la complejidad del algoritmo ineficiente, desglozando cada uno de sus componentes.

[String.equals()](http://docs.oracle.com/javase/8/docs/api/java/lang/String.html#equals-java.lang.Object-). Tiempo lineal,  \\( n \\)  comparaciones por desigualdad. Espacio constante.

[StringBuilder.reverse()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/AbstractStringBuilder.java). Tiempo lineal,  \\( 2 \left\lfloor\dfrac{n}{2}\right\rfloor \\) asignaciones. Espacio constante.


[StringBuilder.toString()](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/StringBuilder.java). Tiempo lineal,  \\( n \\)  asignaciones. Espacio lineal,  \\( n \\)  elementos.

[StringBuilder constructor](http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/StringBuilder.java). Tiempo lineal,  \\( n + 16 \\)  asignaciones. Espacio lineal,  \\( n + 16 \\) elementos.


Entonces, la complejidad total del algoritmo ineficiente sería de:

**Tiempo:**  \\( n \\)  comparaciones por desigualdad. \\( 2n + 2 \left\lfloor\dfrac{n}{2}\right\rfloor + 16 \\) asignaciones.  
**Espacio:**  \\( 2n + 16 \\) elementos

Como pueden observar, este algoritmo es muy ineficiente, hace uso de memoria innecesariamente e incurre en más de \\( 8x \\) operaciones que el algoritmo optimo.


### Mejorando el algoritmo (naïve)

Llamemos al siguente código *Algoritmo N* (de naïve).
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

Tiempo: \\( n \\) comparaciones por desigualdad.  
Espacio: constante

No se hace uso de memoria adicional y la cantidad de operaciones son \\( > 4x \\) que el *Algoritmo I*.
Si bien el código se hace un poco más complejo, es un código fácilmente entendible y el incremento en la complejidad es insignificante con respecto a la mejora en eficiencia.


### Algoritmo óptimo

Como podemos ver en la siguiente imagen, no hace falta hacer N comparaciones para deterinar si una palabra es un palíndromo.

![Optimal Algorithm]({{ site.url }}/images/OptimalAlgorithm.svg)

Con sólo hacer (aproximadamente) la mitad de las comparaciones nos basta:

- Si n es par, se deben hacer \\( \dfrac{n}{2} \\) comparaciones
- Si n es impar, se deben hacer \\( \dfrac{n - 1}{2} \\) comparaciones.


El siguente código será denominado *Algoritmo O* (de óptimo).

{% highlight java %}
public static boolean isPalindrome(String str) {
    int n = str.length();
    for (int i = 0; i < n/2; ++i) {
        if (str.charAt(i) != str.charAt(n-i-1)) return false;
    }
    return true;    
}
{% endhighlight %}


Tiempo: \\( \left\lfloor\dfrac{n}{2}\right\rfloor \\) comparaciones por desigualdad.  
Espacio: constante



## *Algoritmo I* - Análisis detallado

Como vimos anteriormente, el *Algoritmo I* es mucho más inefiente que los algoritmos N y O.  
Pero además del análisis de complejidad que vimos antes, tenemos que tener en cuenta otras cuestiones que afectan la eficiencia del *Algoritmo I*.

Cada componente usado en el *Algoritmo I* viene con ciertas penalidades en performance que pasan desapercibidas.  
Analicémoslo en detalle.

#### Construcción de StringBuilder
- Asignación de memoria (memory allocation) dinámicamente para el objeto de tipo StringBuilder (free store, heap, o lo que fuere).
- Inicialización en cero (Zero-Initialization) de los miembros de StringBuilder (está dentro de AbstractStringBuilder) 
  ???????
- Asignación de memoria dinámica para el array interno dentro de StringBuilder (está dentro de AbstractStringBuilder)
	De acuerdo con la documentación, el tamaño del array interno es de 16 + initialString.length(). ???????
- Inicialización en cero (Zero-Initialization) de los miembros del array interno de StringBuilder. Lenght y el Array en sí.
  	En Java los arrays de tipo integrales se inicializan en 0, garantizado por la especificación del lenguaje. [4]
- Copia de los bytes del string original al array interno del StringBuilder


#### StringBuilder reverse()
- Sólo lo mencionado anteriormente. Esta función no utiliza memoria adicional y es eficiente en tiempo de ejecución.


#### StringBuilder toString()
- Asignación de memoria (memory allocation) dinámicamente para el objeto de tipo String (free store, heap, o lo que fuere).
- Inicialización en cero (Zero-Initialization) de los miembros de String.
- Asignación de memoria dinámica para el array interno dentro de String.
- Inicialización en cero (Zero-Initialization) de los miembros del array interno de String. Lenght y el Array en sí.
- Copia de los bytes del string original al array interno del nuevo String.


#### String equals()
- Sólo lo mencionado anteriormente. Esta función no utiliza memoria adicional y es eficiente en tiempo de ejecución.


#### Garbage Collection
- El GC debe liberar toda la memoria adicional (innecesaria) que fue utilizada.

#### Data Cache Misses
- Otro inconvemiente asociado al consumo innecesario de memoria es la probabilidad de que nuestros objetos sean muy grandes para entrar en el cache, provocando Cache Misses impactando en el tiempo de ejecución.
- Otro factor que aumenta la probabilidad de Cache Misses son las indirecciones (referencias, punteros) que existen en los objetos.


#### Consumo de memoria (memory footprint)

Para analizar el consumo de memoria del *Algoritmo I*, vamos a hacerlo con un ejemplo concreto. Vamos a suponer que usamos una palabra (de habla inglesa) de 9 caracteres. La palabra en este caso es "evitative".

{% highlight java %}
isPalindrome("evitative");
{% endhighlight %}


Si bien consumo de memoria del *Algoritmo I* depende de la [Virtual Machine](https://en.wikipedia.org/wiki/Java_virtual_machine) y del [Runtime Environment](https://en.wikipedia.org/wiki/Java_virtual_machine#Java_Runtime_Environment_from_Oracle) que estemos usando, en este caso vamos a usar una plataforma específica:

java version "1.8.0_60"  
Java(TM) SE Runtime Environment (build 1.8.0_60-b27)  
64-bit [HotSpot VM](https://en.wikipedia.org/wiki/HotSpot).  
[Compressed Oops](http://docs.oracle.com/javase/7/docs/technotes/guides/vm/performance-enhancements-7.html#compressedOop) activado  
[Objects alignment](https://en.wikipedia.org/wiki/Data_structure_alignment): 8 bytes.

Para el análisis en otras plataformas, por favor referirse a [Y].

StringBuilder

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation64CompressedOopsEnabled.svg)

StringBuilder object (primera parte): 24 bytes  
StringBuilder internal array:      (16 + 2n + 32 + padding) bytes [X]  
StringBuilder (completo): \\( 8(\left\lceil\dfrac{n}{4}\right\rceil + 9) \\) bytes


String

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk18.svg)

String object (primera parte): 24 bytes  
String internal array:(16 + 2n + padding) bytes [X]  
String (completo): \\( 8(\left\lceil\dfrac{n}{4}\right\rceil + 5) \\) bytes


**Total de memoria consumida:**  \\( 16(\left\lceil\dfrac{n}{4}\right\rceil + 7) \\) bytes


---



![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation64CompressedOopsDisabled.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation32.svg)


![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsDisabledJdk18.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation32Jdk18.svg)

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk17.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsDisabledJdk17.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation32Jdk17.svg)

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk16.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsDisabledJdk16.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation32Jdk16.svg)



http://stackoverflow.com/questions/4138827/check-string-for-palindrome/4139065#4139065

CompressedOops Enabled
-XX:+UseCompressedOops


### Benchmarks









*** VERIFICAR EL TIEMPO QUE JAVA TARDA EN ALOCAR MEMORIA CON NEW *** 
Dicen ser muy rapidos, hacer benchmark.



COMPLEJIDAD DE:???
	- StringBuilder constructor 
	- StringBuilder.reverse()
	- StringBuilder.toString()
	- String.equals






	- Garbage Collection


	Consumo de Memoria
		- StringBuilder full object
			- StringBuilder object (AbstractStringBuilder included)
				32 bits 								 8 bytes (object header) + 
				                                         4 bytes (count, internal array useful size) + 
				                                         4 bytes (value, reference to internal array) 
				                                         = 16 bytes
				64 bits without UseCompressedOops 		16 bytes (object header) + 
														 4 bytes (count, internal array useful size) + 
														 4 bytes (padding) 
														 8 bytes (value, reference to internal array) + 
														 = 32 bytes
				64 bits with CompressedOops 			12 bytes (object header) + 
														 4 bytes (count, internal array useful size) + 
														 4 bytes (value, reference to internal array) + 
														 4 bytes (padding) 
														 = 24 bytes

			- StringBuilder internal array
				32 bits 								 8 bytes (object header) + 
														 4 bytes (array length) + 
														50 bytes (array data, 9 + 16 chars, 2 bytes per char) + 
														 2 bytes (padding) 
														 = 64 bytes
				64 bits without UseCompressedOops 		16 bytes (object header) + 
														4 bytes (array length) + 
														50 bytes (array data, 9 + 16 chars, 2 bytes per char) + 
														2 bytes (padding) 
														= 72 bytes
				64 bits with CompressedOops 			12 bytes (object header) + 
														4 bytes (array length) + 
														50 bytes (array data, 9 + 16 chars, 2 bytes per char) + 
														6 bytes (padding) 
														= 72 bytes

			TOTAL SIZE FOR THE StringBuilder full object
			32 bits 								 	16 bytes + 64 bytes =  80 bytes
			64 bits without UseCompressedOops 			32 bytes + 72 bytes = 104 bytes
			64 bits with CompressedOops 				24 bytes + 72 bytes =  96 bytes
			
		- String full object (for the reversed word)
			- String object
				32 bits 								 8 bytes (object header) + 
														 4 bytes (value, reference to internal array) + 
														 4 bytes (hash) + 
														 = 16 bytes
				64 bits without UseCompressedOops 		16 bytes (object header) + 
														 8 bytes (value, reference to internal array) + 
														 4 bytes (hash) + 
														 4 bytes (padding) 														                   
														 = 32 bytes
				64 bits with CompressedOops 			12 bytes (object header) + 
														 4 bytes (value, reference to internal array) + 
														 4 bytes (hash) + 
														 4 bytes (padding)                    
														 = 24 bytes			

			- String internal array
				32 bits 								 8 bytes (object header) + 
														4 bytes (array length) + 
														18 bytes (array data, 9 chars, 2 bytes per char) + 
														2 bytes (padding) 
														= 32 bytes
				64 bits without UseCompressedOops 		16 bytes (object header) + 
														4 bytes (array length) + 
														18 bytes (array data, 9 chars, 2 bytes per char) + 
														2 bytes (padding) 
														= 40 bytes
				64 bits with CompressedOops 			12 bytes (object header) + 
														4 bytes (array length) + 
														18 bytes (array data, 9 chars, 2 bytes per char) + 
														6 bytes (padding) 
														= 40 bytes

			TOTAL SIZE FOR THE String full object
			32 bits 								 	16 bytes + 32 bytes = 48 bytes
			64 bits without UseCompressedOops 			24 bytes + 40 bytes = 64 bytes
			64 bits with CompressedOops 	            16 bytes + 40 bytes = 56 bytes


		TOTAL EXTRA SPACE (espacio innecesario)
			32 bits 								 	 80 bytes + 48 bytes = 128 bytes
			64 bits without UseCompressedOops 			104 bytes + 64 bytes = 168 bytes
			64 bits with CompressedOops 	             96 bytes + 56 bytes = 152 bytes





------------------------------------------------------------------------------------------------------------------------------------------------------------
	EN FUNCION DE N 
------------------------------------------------------------------------------------------------------------------------------------------------------------

	M:  numero de caracteres (char) del input string
	N:  numero de bytes del input string
		N = M * 2


	Consumo de Memoria
		- StringBuilder full object
			- StringBuilder object (AbstractStringBuilder included)
				32 bits 								16 bytes (fixed, idem anterior)
				64 bits without UseCompressedOops 		32 bytes (fixed, idem anterior)
				64 bits with CompressedOops 			24 bytes (fixed, idem anterior)

			- StringBuilder internal array
				32 bits 								 8 bytes (object header) + 4 bytes (array length) + N bytes + 16 * 2 bytes + P bytes (padding) = 44 bytes + N bytes + P bytes

44 + n + p = 8x

p = 8x - (n + 44)

n = 18
p = 8x - 18 - 44
p = 8x - 62


x = ceil((18 + 44)/8)


8 * &#8968;(n + 44) / 8&#8969; - (n + 44)

<span style="font-family:'Courier New';">8 * &#8968;(n + 44) / 8&#8969; - (n + 44)</span>

<span>8 * &#8968;(n + 44) / 8&#8969; - (n + 44)</span>







				64 bits without UseCompressedOops 		16 bytes (object header) + 4 bytes (array length) + N bytes + 16 * 2 bytes + P bytes (padding) = 52 bytes + N bytes + P bytes
				64 bits with CompressedOops 			12 bytes (object header) + 4 bytes (array length) + N bytes + 16 * 2 bytes + P bytes (padding) = 48 bytes + N bytes + P bytes

			TOTAL SIZE FOR THE StringBuilder full object
			32 bits 								 	16 bytes + 64 bytes =  80 bytes
			64 bits without UseCompressedOops 			32 bytes + 72 bytes = 104 bytes
			64 bits with CompressedOops 				24 bytes + 72 bytes =  96 bytes
			
		- String full object (for the reversed word)
			- String object
				32 bits 								 8 bytes (object header) + 4 bytes (reference to internal array) + 4 bytes (padding) = 16 bytes
				64 bits without UseCompressedOops 		16 bytes (object header) + 8 bytes (reference to internal array)                     = 24 bytes
				64 bits with CompressedOops 			12 bytes (object header) + 4 bytes (reference to internal array)                     = 16 bytes			

			- String internal array
				32 bits 								 8 bytes (object header) + 4 bytes (array length) + 18 bytes (array data, 9 chars, 2 bytes per char) + 2 bytes (padding) = 32 bytes
				64 bits without UseCompressedOops 		16 bytes (object header) + 4 bytes (array length) + 18 bytes (array data, 9 chars, 2 bytes per char) + 2 bytes (padding) = 40 bytes
				64 bits with CompressedOops 			12 bytes (object header) + 4 bytes (array length) + 18 bytes (array data, 9 chars, 2 bytes per char) + 6 bytes (padding) = 40 bytes

			TOTAL SIZE FOR THE String full object
			32 bits 								 	16 bytes + 32 bytes = 48 bytes
			64 bits without UseCompressedOops 			24 bytes + 40 bytes = 64 bytes
			64 bits with CompressedOops 	            16 bytes + 40 bytes = 56 bytes


		TOTAL EXTRA SPACE (espacio innecesario)
			32 bits 								 	 80 bytes + 48 bytes = 128 bytes
			64 bits without UseCompressedOops 			104 bytes + 64 bytes = 168 bytes
			64 bits with CompressedOops 	             96 bytes + 56 bytes = 152 bytes




------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------










ptr_to_string_builder: 00000000D6660E20
0x00000000D6660E20: 01 00 00 00 00 00 00 00 da 02 00 20 38 0e 66 d6
                    ----------- ----------- ----------- +++++++++++ 
0x00000000D6660E30: 00 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00
                    ........... ........... 
0x00000000D6660E40: 41 00 00 20 09 00 00 00 78 00 6f 00 64 00 6e 00
0x00000000D6660E50: 61 00 6e 00 72 00 65 00 66 00 00 00 00 00 00 00
0x00000000D6660E60: --------------------------------------


ptr_to_string_internal_storage: 00000000D6660E38
0x00000000D6660E38: 01 00 00 00 00 00 00 00 41 00 00 20 09 00 00 00      Lenght: 9 (dec)
0x00000000D6660E48: 78 00 6f 00 64 00 6e 00 61 00 6e 00 72 00 65 00
                    x     o     d     n     a     n     r     e  
0x00000000D6660E58: 66 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
                    f     .........................................
0x00000000D6660E68: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x00000000D6660E78: --------------------------------------



	[4]
	https://docs.oracle.com/javase/specs/jls/se8/html/jls-4.html#jls-4.12.5
	4.12.5 Initial Values of Variables

	http://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html#StringBuilder-java.lang.String-







  	


---------------------------------------------------------------------------------------------------------------------------



java -version
java version "1.8.0_45"
Java(TM) SE Runtime Environment (build 1.8.0_45-b15)
Java HotSpot(TM) 64-Bit Server VM (build 25.45-b02, mixed mode)


----------------------


JOL (Java Object Layout)
	Instructivo Oficial:		http://openjdk.java.net/projects/code-tools/jol/
	Binarios Descarga:			http://central.maven.org/maven2/org/openjdk/jol/jol-cli/
	Otras fuentes:              http://stackoverflow.com/questions/24836854/object-size-difference-in-32-bit-and-64-bit-systems-in-java


	cd D:\Downloads\Dropbox\Dev\Algorithms\PalindromeJava
	d:
	java -jar jol-cli-0.3.2-full.jar internals java.util.HashMap


	Windows 10 - 64 bits - JVM 64 bits
		Running 64-bit HotSpot VM.
		Using compressed oop with 3-bit shift.
		Using compressed klass with 3-bit shift.
		Objects are 8 bytes aligned.
		Field sizes by type: 4, 1, 1, 2, 2, 4, 4, 8, 8 [bytes]
		Array element sizes: 4, 1, 1, 2, 2, 4, 4, 8, 8 [bytes]

	Windows XP - 32 bits - JVM 32 bits
		Running 32-bit HotSpot VM.
		Objects are 8 bytes aligned.
		Field sizes by type: 4, 1, 1, 2, 2, 4, 4, 8, 8 [bytes]
		Array element sizes: 4, 1, 1, 2, 2, 4, 4, 8, 8 [bytes]

	Ubuntu 64 bits - JVM 64 bits


	Ubuntu 32 bits - JVM 32 bits
	OSX 10??? 64 bits - JVM 64 bits


----------------------

Depends on JVM. As to HotSpot JVM, the correct answer is:

32-bit JVM:                        24 bytes = align8(4 bytes mark_word + 4 bytes class reference + 4 + 4 + 2 bytes field data)
64-bit JVM -XX:+UseCompressedOops: 24 bytes = align8(8 bytes mark_word + 4 bytes class reference + 4 + 4 + 2 bytes field data)
64-bit JVM -XX:-UseCompressedOops: 32 bytes = align8(8 bytes mark_word + 8 bytes class reference + 4 + 4 + 2 bytes field data)



---------------------------------------------------------------------------------------------------------------------------









*1.2.11.1. The .  introduced a very convenient
notation for approximations in his book Analytische Zahlentheorie A894). It is



*1.2.11. Asymptotic Representations
We often want to know a quantity approximately, instead of exactly, in order to
compare it to another. For example, Stirling's approximation to n! is a useful
representation of this type, when n is large, and we have also made use of the
fact that Hn w Inn + 7. The derivations of such asymptotic formulas generally
involve higher mathematics, although in the following subsections we will use
nothing more than elementary calculus to get the results we need.
*1.2.11.1. The O-notation. Paul Bachmann introduced a very convenient


  	


---------------------------------------------------------------------------------------------------------------------------






![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation64CompressedOopsEnabled.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation64CompressedOopsDisabled.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringBuilderMemoryRepresentation32.svg)


![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk18.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsDisabledJdk18.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation32Jdk18.svg)

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk17.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsDisabledJdk17.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation32Jdk17.svg)

![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsEnabledJdk16.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation64CompressedOopsDisabledJdk16.svg)
![Java StringBuffer memory representation]({{ site.url }}/images/JavaStringMemoryRepresentation32Jdk16.svg)



http://stackoverflow.com/questions/4138827/check-string-for-palindrome/4139065#4139065

CompressedOops Enabled
-XX:+UseCompressedOops


64.747
32.373
---------------------------------------------------------------------------------------------------------------------------
Para StringBuilder (compressedoops_enabled)

public StringBuilder sb = new StringBuilder("fernandox");

0x00000000D6660DD0: 01 00 00 00 00 00 00 00 05 c0 00 20 99 77 ff 88
                    ----------- ----------- ----------- +++++++++++ 
0x00000000D6660DE0: 78 56 34 12 a8 0f 66 d6 01 00 00 00 00 00 00 00
                    *********** +++++++++++ 
0x00000000D6660DF0: da 02 00 20 00 0e 66 d6 00 00 00 00 00 00 00 00
0x00000000D6660E00: 01 00 00 00 00 00 00 00 41 00 00 20 17 00 00 00
0x00000000D6660E10: --------------------------------------


ptr_to_arraylist: 00000000D6660D20
0x00000000D6660D20: 01 00 00 00 00 00 00 00 45 1b 00 20 09 00 00 00
                    ----------- ----------- ----------- +++++++++++ 
0x00000000D6660D30: 78 0d 66 d6 00 00 00 00 01 00 00 00 00 00 00 00
                    *********** ........... 
0x00000000D6660D40: da 02 00 20 50 0d 66 d6 00 00 00 00 00 00 00 00
0x00000000D6660D50: 01 00 00 00 00 00 00 00 41 00 00 20 09 00 00 00
0x00000000D6660D60: --------------------------------------



ptr_to_string_builder_internal_storage: 00000000D6660D78
0x00000000D6660D78: 01 00 00 00 00 00 00 00 41 00 00 20 19 00 00 00                  0x19 == 25 (dec) == 9 + 16
                    ----------- ----------- ----------- +++++++++++ 
0x00000000D6660D88: 66 00 65 00 72 00 6e 00 61 00 6e 00 64 00 6f 00
                    f     e     r     n     a     n     d     o   
0x00000000D6660D98: 78 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
                    x     .1    .2    .3    .4    .5    .6    .7
0x00000000D6660DA8: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
                    .8    .9    10    11    12    13    14    15
0x00000000D6660DB8: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
                    16    
0x00000000D6660DC8: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x00000000D6660DD8: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x00000000D6660DE8: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x00000000D6660DF8: --------------------------------------


---------------------------------------------------------------------------------------------------------------------------
Para String (compressedoops_enabled)

public String ss = new StringBuilder("fernandox").reverse().toString();

object: 00000000D6660BA8
0x00000000D6660BA8: 01 00 00 00 00 00 00 00 05 c0 00 20 99 77 ff 88
                    ----------- ----------- ----------- +++++++++++ 
0x00000000D6660BB8: 78 56 34 12 20 0e 66 d6 01 00 00 00 00 00 00 00
                    *********** +++++++++++ 
0x00000000D6660BC8: da 02 00 20 d8 0b 66 d6 00 00 00 00 00 00 00 00
0x00000000D6660BD8: 01 00 00 00 00 00 00 00 41 00 00 20 17 00 00 00
0x00000000D6660BE8: --------------------------------------


ptr_to_string: 00000000D6660E20
0x00000000D6660E20: 01 00 00 00 00 00 00 00 da 02 00 20 38 0e 66 d6
                    ----------- ----------- ----------- +++++++++++ 
0x00000000D6660E30: 00 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00
                    ........... ........... 
0x00000000D6660E40: 41 00 00 20 09 00 00 00 78 00 6f 00 64 00 6e 00
0x00000000D6660E50: 61 00 6e 00 72 00 65 00 66 00 00 00 00 00 00 00
0x00000000D6660E60: --------------------------------------


ptr_to_string_internal_storage: 00000000D6660E38
0x00000000D6660E38: 01 00 00 00 00 00 00 00 41 00 00 20 09 00 00 00      Lenght: 9 (dec)
0x00000000D6660E48: 78 00 6f 00 64 00 6e 00 61 00 6e 00 72 00 65 00
                    x     o     d     n     a     n     r     e  
0x00000000D6660E58: 66 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 
                    f     .........................................
0x00000000D6660E68: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x00000000D6660E78: --------------------------------------


---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
Para StringBuilder (compressedoops_disabled)





---------------------------------------------------------------------------------------------------------------------------
Para String (compressedoops_disabled)


reference: 000000FE691EEA10
--------------------------------------
object: 000000FECD286908
0x000000FECD286908: 01 00 00 00 00 00 00 00 78 04 ff fb fe 00 00 00
                    ----------- ----------- ----------- -----------
0x000000FECD286918: 99 77 ff 88 78 56 34 12 08 6c 28 cd fe 00 00 00
                    +++++++++++ *********** +++++++++++ +++++++++++
0x000000FECD286928: 01 00 00 00 00 00 00 00 70 8f bf fb fe 00 00 00
0x000000FECD286938: 48 69 28 cd fe 00 00 00 00 00 00 00 00 00 00 00
0x000000FECD286948: --------------------------------------


ptr_to_string: 0000008172686C08
0x0000008172686C08: 01 00 00 00 00 00 00 00 70 8f ff a0 81 00 00 00
                    ----------- ----------- ----------- -----------
0x0000008172686C18: 28 6c 68 72 81 00 00 00 00 00 00 00 00 00 00 00
                    +++++++++++ +++++++++++ ........... ...........
0x0000008172686C28: 01 00 00 00 00 00 00 00 08 02 ff a0 81 00 00 00
0x0000008172686C38: 09 00 00 00 00 00 00 00 78 00 6f 00 64 00 6e 00
0x0000008172686C48: --------------------------------------


ptr_to_string_internal_storage: 000000A285286C28
0x000000A285286C28: 01 00 00 00 00 00 00 00 08 02 cf b3 a2 00 00 00
                    ----------- ----------- ----------- -----------
0x000000A285286C38: 09 00 00 00 00 00 00 00 78 00 6f 00 64 00 6e 00
                    +++++++++++ ........... ***** +++++ ***** +++++
0x000000A285286C48: 61 00 6e 00 72 00 65 00 66 00 00 00 00 00 00 00
                    ***** +++++ ***** +++++ ***** ..... ..... .....
0x000000A285286C58: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0x000000A285286C68: --------------------------------------




---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------

//CLASE ARRAYS
    public static char[] copyOfRange(char[] original, int from, int to) {
        int newLength = to - from;
        if (newLength < 0)
            throw new IllegalArgumentException(from + " > " + to);
        char[] copy = new char[newLength];
        System.arraycopy(original, from, copy, 0,
                         Math.min(original.length - from, newLength));
        return copy;
    }


//CLASE STRING

    /** The value is used for character storage. */
    private final char value[];

    /** Cache the hash code for the string */
    private int hash; // Default to 0

    /** use serialVersionUID from JDK 1.0.2 for interoperability */
    private static final long serialVersionUID = -6849794470754667710L;


    /**
     * Allocates a new {@code String} that contains characters from a subarray
     * of the character array argument. The {@code offset} argument is the
     * index of the first character of the subarray and the {@code count}
     * argument specifies the length of the subarray. The contents of the
     * subarray are copied; subsequent modification of the character array does
     * not affect the newly created string.
     *
     * @param  value
     *         Array that is the source of characters
     *
     * @param  offset
     *         The initial offset
     *
     * @param  count
     *         The length
     *
     * @throws  IndexOutOfBoundsException
     *          If the {@code offset} and {@code count} arguments index
     *          characters outside the bounds of the {@code value} array
     */
    public String(char value[], int offset, int count) {
        if (offset < 0) {
            throw new StringIndexOutOfBoundsException(offset);
        }
        if (count < 0) {
            throw new StringIndexOutOfBoundsException(count);
        }
        // Note: offset or count might be near -1>>>1.
        if (offset > value.length - count) {
            throw new StringIndexOutOfBoundsException(offset + count);
        }
        this.value = Arrays.copyOfRange(value, offset, offset+count);
    }

    public void getChars(int srcBegin, int srcEnd, char dst[], int dstBegin) {
        if (srcBegin < 0) {
            throw new StringIndexOutOfBoundsException(srcBegin);
        }
        if (srcEnd > value.length) {
            throw new StringIndexOutOfBoundsException(srcEnd);
        }
        if (srcBegin > srcEnd) {
            throw new StringIndexOutOfBoundsException(srcEnd - srcBegin);
        }
        System.arraycopy(value, srcBegin, dst, dstBegin, srcEnd - srcBegin);
    }

    /**
     * Compares this string to the specified object.  The result is {@code
     * true} if and only if the argument is not {@code null} and is a {@code
     * String} object that represents the same sequence of characters as this
     * object.
     *
     * @param  anObject
     *         The object to compare this {@code String} against
     *
     * @return  {@code true} if the given object represents a {@code String}
     *          equivalent to this string, {@code false} otherwise
     *
     * @see  #compareTo(String)
     * @see  #equalsIgnoreCase(String)
     */
    public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = value.length;
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                        return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }


abstract class AbstractStringBuilder implements Appendable, CharSequence {
    /**
     * The value is used for character storage.
     */
    char[] value;

    /**
     * The count is the number of characters used.
     */
    int count;

    AbstractStringBuilder(int capacity) {
        value = new char[capacity];
    }


    public AbstractStringBuilder append(String str) {
        if (str == null)
            return appendNull();
        int len = str.length();
        ensureCapacityInternal(count + len);
        str.getChars(0, len, value, count);
        count += len;
        return this;
    }


   /**
     * Causes this character sequence to be replaced by the reverse of
     * the sequence. If there are any surrogate pairs included in the
     * sequence, these are treated as single characters for the
     * reverse operation. Thus, the order of the high-low surrogates
     * is never reversed.
     *
     * Let <i>n</i> be the character length of this character sequence
     * (not the length in {@code char} values) just prior to
     * execution of the {@code reverse} method. Then the
     * character at index <i>k</i> in the new character sequence is
     * equal to the character at index <i>n-k-1</i> in the old
     * character sequence.
     *
     * <p>Note that the reverse operation may result in producing
     * surrogate pairs that were unpaired low-surrogates and
     * high-surrogates before the operation. For example, reversing
     * "\u005CuDC00\u005CuD800" produces "\u005CuD800\u005CuDC00" which is
     * a valid surrogate pair.
     *
     * @return  a reference to this object.
     */
    public AbstractStringBuilder reverse() {
        boolean hasSurrogates = false;
        int n = count - 1;
        for (int j = (n-1) >> 1; j >= 0; j--) {
            int k = n - j;
            char cj = value[j];
            char ck = value[k];
            value[j] = ck;
            value[k] = cj;
            if (Character.isSurrogate(cj) ||
                Character.isSurrogate(ck)) {
                hasSurrogates = true;
            }
        }
        if (hasSurrogates) {
            reverseAllValidSurrogatePairs();
        }
        return this;
    }


//...
}


public final class StringBuilder
    extends AbstractStringBuilder
    implements java.io.Serializable, CharSequence
{

    /** use serialVersionUID for interoperability */
    static final long serialVersionUID = 4383685877147921099L;

    public StringBuilder(String str) {
        super(str.length() + 16);
        append(str);
    }

    @Override
    public StringBuilder append(String str) {
        super.append(str);
        return this;
    }

    @Override
    public StringBuilder reverse() {
        super.reverse();
        return this;
    }    

    @Override
    public String toString() {
        // Create a copy, don't share the array
        return new String(value, 0, count);
    }
    //...
}



---

## Notas / Referencias

- Byte = 8-bits. 
  Hay arquitecturas donde 1 byte equivale a 7 o 6 bits. Estas arquitecturas son inusuales hoy en día y lo más común es que 1 byte sea de 8 bits.

[X] StringBuilder padding = (8&#8968;(2n + 48)/8&#8969; - (2n + 48)) bytes
[X] String padding:&nbsp;\\( (8(\left\lceil\dfrac{2n + 16}{8}\right\rceil - (2n + 16))) \\) bytes  









C#
http://stackoverflow.com/questions/9790749/check-if-a-string-is-a-palindrome
http://codereview.stackexchange.com/questions/58395/check-a-string-to-see-if-it-is-a-palindrome
























### Complejidad Computacional Concreta

Otra forma de medir algoritmos es no usar aproximaciones sino cantidad concreta de ciertas operaciones, siempre dependiendo de la entrada al algoritmo.

Por ejemplo, supongamos el algoritmo para encontrar el mínimo (o máximo) de N elementos. Podemos decir que dicho algoritmo tiene una complejidad (en tiempo) de O(n) o lineal.
Pero específicamente se necesitan **n - 1** comparaciones.

¿Qué pasaría en el caso de necesitar un algoritmo para encontra ambos, tanto el mínimo como el máximo de N elementos?

Un algoritmo naïve lo haría en <span style="font-family:'Courier New';">2n – 2</span> o <span style="font-family:'Courier New';">2n – 3</span> comparaciones. Esto sigue siendo O(n).  
Pero el algoritmo óptimo lo resuelve en <span style="font-family:'Courier New';">&#8968;3/2 n&#8969; - 2</span> comparaciones. [2]  
También O(n), como los anteriores, pero podemos notar una diferencia considerable en la complejidad si la medimos con operaciones exactas.


A Sorting Problem and Its Complexity, Ira Pohl

Communications of the ACM 
Volume 15 Issue 6, June 1972 
Pages 462-464 

http://www.researchgate.net/publication/220427257_A_Sorting_Problem_and_Its_Complexity










En esta serie de artículos mi intención es revisar por qué los programadores usamos cierta terminología, ciertas palabras, algunas de las cuales considero inadecuadas.  
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

Mi hipótesis es que con el establecimiento de [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) como uno de los lenguajes de programación más populares, también se produjo la popularización de su terminología. A partir de ese momento, otros lenguajes y programadores adoptan la terminología popularizada por Java y se vuelve más frecuente su uso que la terminología tradicional.

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

O sea, en C++ no se usa la palabra "método". Puede que algunos programadores C++ usen la palabra "método" debido a que el término es muy popular hoy día; pero, tanto el estándar C++ como los programadores más cercanos al riñón del lenguaje no lo utilizan.

Entonces... ¿Cuál es el término correcto para designar el código que modela el comportamiento de los objetos? ¿Es "método"? ¿Es "procedimiento"? ¿Qué lenguaje usa la terminología más adecuada?

Para ello debo ir aún más atrás.  
C++ hereda su "parte" de objetos del [lenguaje de programación Simula](https://en.wikipedia.org/wiki/Simula).

### Simula

[Simula](https://en.wikipedia.org/wiki/Simula) es considerado el primer lenguaje de programación _orientado a objetos_.
Es un lenguaje de tipado estático basado en [ALGOL 60](https://en.wikipedia.org/wiki/ALGOL_60).

Simula permite que los procedimientos sean declarados dentro de una clase y también fuera de ella. A los primeros los denomina _local procedures_ y a los últimos _non-local procedures_. [[5]](#Ref5)

Entonces, si C++ y Simula no hacen mención a algo llamado "método", ¿De dónde saca Java esa palabra? ¿Es una invención de los diseñadores del lenguaje? ¿La copia de algún otro lenguaje? 

La respuesta es...

### Smalltalk

[Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) es un lenguaje de programación orientado a objetos, inspirado en Simula (en parte), que fue desarrollado durante la década de 1970 y vio la luz a principios de los 80's.
A diferencia de Simula, Smalltalk es un lenguaje de tipado dinámico.

Smalltalk incorpora los conceptos de mensajes y métodos. 

Según el [estándar de Smalltalk [6]](#Ref6):

- A message is a request to perform a designated computation. An object is a computational entity
  that is capable of responding to a well defined set of messages. An object may also encapsulate
  some (possibly mutable) state.
- An object responds to a message by executing a method. Each method is identified by an
  associated method selector. A behavior is the set of methods used by an object to respond to
  messages.
- A method consists of a sequence of expressions. Program execution proceeds by sequentially
  evaluating the expressions in one of more methods. There are three types of expressions:
  assignments, message sends, and returns.

Como no pude encontrar referencias anteriores a Smalltalk sobre algún otro lenguaje que utilice la palabra "método", le consulté a [Paul McJones](http://www.softwarepreservation.org/author/pmcjones), miembro del [Software Preservation Group](http://www.softwarepreservation.org/) y coautor de [Elements of Programming](http://www.elementsofprogramming.com/). Considero a Paul una eminencia en lo que respecta a historia de la computación y en particular los lenguajes de programación.

> Fernando: ... Do you know any programming language, before Smalltalk, that use the word "method"? ...

> Paul: You ask a very interesting question. I think you are correct that the word “method” was first used in that sense by the Smalltalk community. I looked through some early documents, such as the Smalltalk-72 Instruction Manual, and I don’t see “method” being used yet...
Dan Ingalls’s 1978 POPL paper on Smalltalk-76 is the earliest paper I’ve found so far that uses method in the sense you are interested in...

Paul cree, al igual que yo, que la palabra "método" fue usada por primera vez por la comunidad de programadores Smalltalk. Además me indica que estuvo revisando viejos manuales y en el manual de Smalltalk-72 [[7]](#Ref7) no se hace mención sobre "método", pero sí es mencionado en un paper de 1978 que habla sobre Smalltalk-76. [[8]](#Ref8) 

O sea, estoy casi seguro que la comunidad Smalltalk acuñó el término, pero no lo hizo desde el principio sino a medida que el lenguaje fue evolucionando.

### Otros lenguajes

Quiero aquí analizar otros lenguajes que también soportan tecnología de objetos para verificar como nomenclan a sus procedimientos.

### Eiffel

[Eiffel](https://en.wikipedia.org/wiki/Eiffel_(programming_language)) es un lenguaje que nace a mediados de 1980 y, al igual que C++, es heredero directo de Simula.

En Eiffel todo miembro de una clase se lo llama _feature_. Al estado se lo denomina _attributes_ y al comportamiento _routines_. A su vez, las _routines_ se dividen en _functions_ y _procedures_ dependiendo si retornan o no un resultado. [[9]](#Ref9)

En Eiffel todas las _routines_ son miembros de una clase, no se permite la existencia de procedimientos libres.


### Python

El lenguaje de programación [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) admite tanto procedimientos libres como procedimientos miembros. Los denomina _functions_ y _methods_ respectivamente. [[10]](#Ref10)

Python me llamó la atención porque es creado unos años antes que Java; la primera implementación de Python es de 1989 [[11]](#Ref11) mientras que la primera de Java es de 1995 [[12]](#Ref12).  
Pareciera que este hecho rompe mi conjetura de que Java fue el _impulsor_ de la palabra "método".

Si bien la primera implementación de Java sale a la luz en 1995, en tan solo unos años, en 1998, ya era unos de los lenguajes más populares. En cambio Python tuvo un camino bastante más lento hacia su popularización, recién comenzó a ser popular por los años 2003/2004. [[13]](#Ref13)  
Por lo que mi conjetura todavía sigue siendo válida, el impulsor de "método" fue Java y no Python.

Volviendo a Python, la palabra "método" es mencionada en las versiones recientes (3.4.3 y 2.7.10) de la documentación del lenguaje.
Entonces dudé sobre si Python utiliza "método" desde sus orígenes o si fue mutando su terminología con el tiempo, sobre todo con la popularización de Java.  
Gracias a que los muchachos de [python.org](http://python.org) hacen un excelente trabajo manteniendo las versiones históricas de la documentación, pude verificar que la palabra "método" es utilizada desde la versión 0.9.1 [[14]](#Ref14) (salvo que la documentación haya sido alterada con el tiempo, pero confiemos en que no sea así).

O sea, Python es el primer lenguaje, después de Smalltalk, en usar la palabra "método". Al menos de los lenguajes que he podido verificar.

Al igual que me lo pregunto con Java, ¿Por qué Python usa método y no algún otro término más común para esa época?.

Nadie mejor que el creador del lenguaje, [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum) para iluminarme. Me tomé el atrevimiento de escribirle un correo electrónico; Guido fue muy amable en responderme y permitir que lo cite en este artículo:

> Fernando: Why did you use "method" instead of any other word? Have you taken from Smalltalk?  Or,... from any other programming language?

> Guido: Good question. I don't recall, but it's likely that I was somehow influenced by Smalltalk, or people around me who were influenced by Smalltalk. I definitely opened a big book about Smalltalk to learn about byte code, and I also recall we had a Smalltalk implementation that we sometimes played with (some things that were wrong with that influenced some of my philosophy for Python).

Guido no recuerda bien, pero admite haber sido influenciado por Smalltalk en aquella época.

### C\#

[C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) es un lenguaje de programación que nace siendo muy similar a Java (casi idéntico) con algunas reminiscencias de C++. 
Luego, con los años el lenguaje formó su propia identidad.

C# copia en su gran mayoría la terminología de Java. Una de las palabras que copia es "método".

Según el [estándar C# [15]](#Ref15):

  - A method is a member that implements a computation or action that can be performed by an object or class.

A diferencia de Java, el estándar C# sí define el significado de la palabra "método".

Al ser un lenguaje muy usado, especialmente por seguidores de la "filosofía" Microsoft, C# también ha contribuido a la popularización del término.


### Objective-C

[Objective-C](https://en.wikipedia.org/wiki/Objective-C) es un lenguaje desarrollado a principios de los 1980's. Al igual que C++, nace como un súper-conjunto de C al que se le agrega tecnología de objetos.  
A diferencia de C++, el modelo de objetos de Objective-C está basado en Smalltalk y no en Simula.

Objective-C cuenta con el concepto de mensajes y también el de método. [[16]](#Ref16)

### Lenguajes anteriores a Smalltalk

He buscado en manuales, estándares y documentación de lenguajes de programación anteriores a Smalltalk, no relacionados con _orientación a objetos_, pero sí muy reconocidos por su influencia sobre los demás lenguajes de programación.  
Específicamente los lenguajes son: [Fortran](https://en.wikipedia.org/wiki/Fortran), [Algol](https://en.wikipedia.org/wiki/ALGOL) y [C](https://en.wikipedia.org/wiki/C_(programming_language)). En la documentación de ninguno de ellos se hace mención a la palabra "método". En cambio usan términos como _routine_, _subroutine_, _procedure_ o _function_ [[17]](#Ref17).


### Otras fuentes

Para mejorar mi investigación he hecho una búsqueda en la bibliografía (sobre programación en general) que tengo a mi disposición, textos que considero clásicos.

  - [Elements of Programming](http://www.elementsofprogramming.com/) by Alexander A. Stepanov and Paul McJones
  - The Art of Computer Programming Volumes 1, 2, 3 and 4A by Donald E. Knuth

En ninguna de las 3.456 páginas de estos 5 libros he encontrado la palabra "método" haciendo referencia a un "procedimiento". Obviamente la palabra "método" aparece en varias oportunidades, pero no en el sentido que estoy buscando.


### Pendientes 

1. Leer documentación/manuales originales sobre los siguientes lenguajes de programación:
	- Lisp
	- Scheme
	- Ada
	- Modula-2
	- Common Lisp


2. Buscar en algunos textos clásicos:

	- [A Discipline of Programming](http://www.amazon.com/Discipline-Programming-Edsger-W-Dijkstra/dp/013215871X/ref=sr_1_1?s=books&ie=UTF8&qid=1440444447&sr=1-1) by Edsger W. Dijkstra
	- [Algorithms and Data Structures](http://www.amazon.com/Algorithms-Data-Structures-Niklaus-Wirth/dp/0130220051/ref=pd_sim_14_5?ie=UTF8&refRID=1WFYYC7DTMCR58G3TVVA) by Niklaus Wirth
	- [Structured Programming, First Edition Edition](http://www.amazon.com/Structured-Programming-A-P-I-C-studies-processing/dp/0122005503/ref=pd_sim_14_3?ie=UTF8&refRID=1WFYYC7DTMCR58G3TVVA) by Edsger W. Dijkstra, C. A. R. Hoare and Ole-Johan Dahl
	- [Systematic Programming: An Introduction](http://www.amazon.com/Systematic-Programming-Introduction-Prentice-Hall-Computation/dp/0138803692/ref=pd_sim_14_4?ie=UTF8&refRID=0E9BAZYMCCHZFEB38592) by Niklaus Wirth

3. Enviar mi consulta a los siguientes diseñadores de lenguajes de programación:

	- Alan Kay
	- Dan Ingalls
	- Dick Gabriel
	- James Gosling
	- Anders Hejlsberg

He tratado de contactar a alguno de ellos, pero no he recibido respuesta aún.

## Conclusiones

La palabra "método" ha sido introducida al mundo de la programación por el lenguaje Smalltalk. Al ser un lenguaje prácticamente no usado en la industria, la palabra no era muy conocida allá por los 80's y principios de los 90's.

Quizás fue un error de los diseñadores de Smalltalk el no haber utilizado nomenclatura existente, o quizás no fue un error, ya que Smalltalk introdujo un modelo de objetos distinto al de Simula y ese cambio quizás ameritó un cambio de nombres. Es muy difícil de determinar si fue una decisión equivocada o no.

Java y Python adoptan terminología de Smalltalk en su vocabulario. No encuentro un vínculo muy fuerte entre Smalltalk y Java/Python que justifique el uso del término, esto me hace pensar en que el uso de "método" es un error en estos lenguajes. Aunque, como dije antes, es muy difícil de juzgar si la decisión de usar cierta nomenclatura es errónea.

C++, Objective-C y Eiffel utilizan terminología similar a sus predecesores, puede que con algunas variaciones, que pueden ser mínimas o necesarias para adaptarse a cambios introducidos por los lenguajes.

Algunos lenguajes, como C#, copian características de Java, pero también copian el "error" de incorporar "método" a su terminología.

La palabra "método" se **infiltra** en el vocabulario de los programadores.  
Ya no hay vuelta atrás ;)

Usted use el término que más le guste, yo me voy a seguir usando **procedimiento** o **función** (siempre y cuando recuerde que no me gusta la palabra "método").


---

## Agradecimientos

Un agradecimiento especial para Paul McJones y Guido van Rossum por responder amablemente a mis preguntas y por brindarme información trascendental.  
También quiero agradecer a Mario dal Lago y Javier Velilla por revisar el artículo y sugerir correcciones.


---

## Notas / Referencias

<a name="Ref1">[1]</a> Aquí nos referimos a la definición de "objeto" en el contexto de la _Programación Orientada a Objetos_:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]  
Que difiere de la definición de "objeto" dada en:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Elements of Programming](http://www.elementsofprogramming.com/) of Alexander Stepanov and Paul McJones by Stepanov and McJones [2009, page 4]  
Esta última definición es la preferida por el autor del blog, en caso de que no se aclare a cuál de las dos definiciones se hace referencia, el lector debe asumir que se está hablando de la definición dada por Stepanov.

<a name="Ref2">[2]</a> Definición simplificada, para una definición más detallada referirse a:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 174]

<a name="Ref3">[3]</a> [The Java Language Specification (Java SE 8 Edition)](https://docs.oracle.com/javase/specs/jls/se8/jls8.pdf), Chapter 8 [pages 191, 192]

<a name="Ref4">[4]</a> [ISO International Standard ISO/IEC 14882:2014(E) – Programming Language C++, current working draft (at Aug, 2015)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/n4527.pdf), sections: 9.3 [class.mfct] and 8.3.5 [dcl.fct]  

<a name="Ref5">[5]</a> Hay muy poca bibliografía disponible acerca del lenguaje, pero [aquí](http://www.edelweb.fr/Simula/) pueden encontrar un excelente trabajo de recopilación de viejos manuales.  

<a name="Ref6">[6]</a> [ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft](http://smalltalk.org/versions/ANSISmalltalk/ANSISmalltalkStandard_v1.9_199712_NCITS_X3J20_draft.pdf), Section 3.1 [page 9]

<a name="Ref7">[7]</a> Smalltalk-72 Instruction Manual by Adele Goldberg and Alan Kay [page 44]

<a name="Ref8">[8]</a> [The Smalltalk-76 Programming System. Design and Implementation](https://classes.soe.ucsc.edu/cmps112/Spring03/readings/Ingalls78.html)

<a name="Ref9">[9]</a> Se especifica en:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, pages 174, 175]  
y en:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Standard ECMA-367. Eiffel: Analysis, Design and Programming Language. 2nd edition (June 2006)](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-367.pdf), Section 8.5.10 [page 38]  

<a name="Ref10">[10]</a> [Python 2.7.10 Documentation](https://docs.python.org/2/download.html)

<a name="Ref11">[11]</a> [A Brief Timeline of Python](http://python-history.blogspot.com.ar/2009/01/brief-timeline-of-python.html)

<a name="Ref12">[12]</a> [The History of Java Technology](http://www.oracle.com/technetwork/java/javase/overview/javahistory-index-198355.html)

<a name="Ref13">[13]</a> Sobre la popularización de los lenguajes, una de las fuentes en las que me baso es [Tiobe Index](http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html). Aunque tengo ciertas dudas sobre el método de medición de Tiobe, hoy en día es lo mejor que tenemos.   
La otra fuente es mi memoria. No recuerdo a Python como un lenguaje popular en los 90's.  
Yo creo que Python comienza a popularizarse con el boom de los lenguajes dinámicos a comienzo de los 2000's y tiene un empuje aún mayor con la creación del framework web [Django](https://en.wikipedia.org/wiki/Django_(web_framework)).

<a name="Ref14">[14]</a> [Repositorio de viejas versiones de Python](https://www.python.org/ftp/python/src/)

<a name="Ref15">[15]</a> [Standard ECMA-334. C# Language Specification. 4th edition (June 2006)](http://www.ecma-international.org/publications/standards/Ecma-334.htm), Section 8.7.3 [page 34]

<a name="Ref16">[16]</a> Objective-C no cuenta ni con un estándar ni una especificación. Lo más "formal" que encontré fue una página web:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Programming With ObjectiveC](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)


<a name="Ref17">[17]</a> Para documentación sobre [FORTRAN](http://www.softwarepreservation.org/projects/FORTRAN/), [ALGOL](http://www.softwarepreservation.org/projects/ALGOL/) y C: [ISO/IEC JTC1/SC22/WG14 - The international standardization working group for the programming language C](http://www.open-std.org/JTC1/SC22/WG14/).