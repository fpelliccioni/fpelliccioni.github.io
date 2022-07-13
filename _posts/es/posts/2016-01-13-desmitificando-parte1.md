---
layout: post
type: draft
title:  "«Python. Más rápido que C». Desmitificando, parte 1"

date:   2016-01-13 12:00:00
comments: true

category: english

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

En esta serie de artículos me gustaría charlar sobre cómo hacer mediciones (benchmarking) de performance de algoritmos/programas para comparar rendimiento de lenguajes de programación.

La idea de escribir sobre benchmarking me surgió al mirar un video donde comparan dos lenguajes de programación muy diferentes: [C](https://en.wikipedia.org/wiki/C_(programming_language)) y [Python](https://en.wikipedia.org/wiki/Python_(programming_language)).
El enlace al video es éste: ["Python. Más rápido que C"](https://www.youtube.com/watch?v=cPVlYWxcu18).
[Aquí pueden ver el código de la presentación](http://www.taniquetil.com.ar/homedevel/presents/pyrapidc/code/).
[Y aquí los slides](http://www.taniquetil.com.ar/facundo/pyrapidc.pdf).

Vi el video hace más de 1 año y sinceramente no me gustó, disiento con la mayoría de los temas y conclusiones de la charla.
Entonces, le escribí al autor de la presentación, hace ya un tiempo, para hacerle comentarios y críticas sobre la misma.

Fui ingenuo en creer que las críticas iban a ser tomadas como algo positivo, algo constructivo para mejorar la presentación para futuras exposiciones.
A la mayoría de las personas nos cuesta entender que una crítica no es un agravio ni una confrontación, sino una opinión formal con fundamentos y análisis que la sustenten.

Algunos de los muchachos de la [comunidad Python Argentina](http://python.org.ar/) no tomaron a bien mis comentarios y cuál fanáticos del fútbol, política o religión comenzaron a arrojar comentarios agresivos, sólo por el hecho de haber criticado la charla/presentación.
Quiero aclarar que las personas que arrojaron comentarios poco simpáticos sólo fueron un puñado y no por eso cambió mi visión sobre la comunidad Python Argentina, la cual según mi apreciación, es la más multitudinaria y mejor organizada comunidad tras un lenguaje de programación en Argentina. Creo que los usuarios de los demás lenguajes de programación de Argentina deberían imitarlos.

Si quieren entrar en detalle acerca de la *cálida discusión* que se armó en la lista de correo de PyAr, vean: [aquí](http://listas.python.org.ar/pipermail/pyar/2014-April/029145.html) y [aquí](http://listas.python.org.ar/pipermail/pyar/2014-April/029177.html).

Tengo que hacer un *mea culpa*, ya que en vez de listar todos los puntos que yo considero incorrectos sobre la charla, sólo hice un comentario para chequear si el tema interesaba, posponiendo el análisis para más adelante. Los puntos a tocar son muchos, por eso lo hice de esa manera, para no tomarme semejante esfuerzo y que quizás a nadie le interese. Puede ser que el haberlo hecho así, fue considerado por algunos como un ataque sin fundamentos y por ese motivo empezaron los agravios.
El hecho es que luego de los comentarios maleducados, mi motivación para continuar con la charla fue mermando.
Los puntos a analizar están en mi cabeza desde el momento que vi el video, ahora que ha pasado el tiempo y la *calentura*, quiero, en esta serie de artículos, terminar el trabajo que tendría que haber hecho antes de enviar dicho email. Así que empecemos...


## Lenguajes de Programación

Los lenguajes de programación son herramientas para controlar el comportamiento de máquinas (casi siempre computadoras). Existen miles de lenguajes de programación, cada uno con una finalidad o criterios de diseño específicos acordes a la filosofía del diseñador del lenguaje.

Como sucede con cualquier herramienta, no existe un lenguaje de programación ideal para realizar todas las tareas, sino que cada lenguaje se adapta mejor a uno u otro dominio.
Uno no elegiría nunca un martillo para quitar un tornillo (...o quizás sí...).

Cualquier lenguaje de programación que sea **[Turing completo](https://en.wikipedia.org/wiki/Turing_completeness)** tiene la capacidad de realizar **cualquier cálculo** que **cualquier  computadora** sea capaz de hacer.

Entonces, ¿cuál es la finalidad de que existan tantos lenguajes si en definitiva todos van a terminar haciendo lo mismo?

Que los lenguajes sean *Turing completos* no implica que con un lenguaje el esfuerzo de escribir un programa sea el mismo que escribirlo con otro lenguaje. Tampoco es indicativo que el consumo de recursos de una computadora sea el mismo.
O sea, escribir un programa en un lenguaje puede requerir menor esfuerzo que escribirlo en otro lenguaje y además un lenguaje puede usar más eficientemente los recursos que otro.

Quiero poner un ejemplo usando los lenguajes de la presentación ["Python. Más rápido que C"](https://www.youtube.com/watch?v=cPVlYWxcu18): [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) y [C](https://en.wikipedia.org/wiki/C_(programming_language)).
Si bien ambos lenguajes son de [Propósito general (GPL)](https://en.wikipedia.org/wiki/General-purpose_language), *C* tiene la capacidad de ser usado para programar [Sistemas [1]](#Ref1) y [Aplicaciones](https://en.wikipedia.org/wiki/Application_software).
En cambio *Python* es un lenguaje sólo capaz de ser usado para programar *Aplicaciones*, pero no así *Sistemas*. La fortaleza de *Python* es que permite expresar conceptos usando la menor cantidad de líneas de código posible con un código que es muy legible; ese es el propósito por el que fue diseñado.
Volviendo a *C*, fue diseñado para poder reescribir el [sistema operativo Unix](https://en.wikipedia.org/wiki/Unix), anteriormente escrito en [lenguaje Ensamblador](https://en.wikipedia.org/wiki/Assembly_language) y en [lenguaje B](https://en.wikipedia.org/wiki/B_(programming_language)).
¿A dónde quiero llegar con esto? A que a nadie se le ocurriría, por ejemplo, programar un sistema operativo usando *Python* y por otro lado, tampoco sería muy conveniente programar un sitio Web en *C* si tengo poco tiempo para hacer el trabajo.
Cada lenguaje tiene su finalidad, o es más práctico que otro para realizar ciertas tareas.

Antes de pasar al próximo tema, me gustaría compartir una reflexión, sobre un fenómeno muy particular que sucede en el mundo de la programación y no he visto en otras disciplinas, el *fanatismo*.
Los usuarios de un determinado lenguaje de programación tienden a convertirse en fanáticos de dicho lenguaje. Defienden a muerte cualquier análisis o crítica hacia su lenguaje de preferencia tal como un fanático religioso defiende a su religión.
También, los fanáticos, suelen realizar ataques hacia otros lenguajes, como por ejemplo comparaciones injustas o falaces para elevar a su lenguaje de programación por sobre los demás o para desprestigiar al lenguaje "adversario" más exitoso comercialmente o más popular.
Conozco el caso de usuarios de un lenguaje X que tratan de desprestigiar de forma deliberada a un lenguaje Y, sólo porque ambos lenguajes competían en la misma época por ser el dominante de un *nuevo paradigma*, el lenguaje Y superó en popularidad al lenguaje X.
Ese tipo de odios, envidias y vaya a saber qué otro sentimiento se evidencian en ciertos fanáticos de lenguajes de programación.
Parece increíble, pero es real.

Dejemos de lado lo filosófico y pasemos un poco a lo concreto.

## Comparando Lenguajes de Programación

Usualmente nos vemos tentados en hacer comparaciones entre distintos lenguajes de programación. Pero, ¿qué es lo que se puede comparar?.

Dado un mismo algoritmo o programa, al escribirlo usando dos lenguajes de programación diferentes, es común comparar:

- Cuánto esfuerzo conlleva escribir el programa usando uno y otro lenguaje.
- Cuán seguro o resistente a fallos es el programa.
- Cuán eficiente resulta ser el programa utilizando los recursos de una máquina, ej: CPU, memoria, batería en caso de un celular.

Cada lenguaje de programación tiene ciertas características de diseño que lo hacen sobresalir por sobre los demás en un aspecto u otro.
Conocer estas características nos posibilitan saber qué lenguaje es conveniente para cada tarea a realizar. Por eso, para conocer cuál es el lenguaje más conveniente antes de encarar un proyecto, usualmente se realizan comparaciones entre lenguajes.

Como mencioné anteriormente, la presentación ["Python. Más rápido que C"](https://www.youtube.com/watch?v=cPVlYWxcu18) trata de comparar los lenguajes *Python* y *C*, que como vimos, son lenguajes que han nacido con propósitos muy diferentes. Por esta razón, según mi criterio, me parece que son lenguajes incomparables. Al parecer mi criterio no es el mismo que los autores de la charla, lo cual me parece totalmente válido, por ende, yo también me sumo a la comparación.

Para ser más específico, en la presentación se trata de comparar el **esfuerzo al escribir un programa** y la **eficiencia en el consumo de recursos** entre programas escritos en *Python* y en *C*.
Con respecto al esfuerzo al escribir el programa, los autores no dan muchos detalles sobre las métricas utilizadas para realizar dicha comparación, pero no me quiero centrar en esto ahora, ya vamos a ahondar en detalles más adelante.
El punto central de la charla es comparar la eficiencia en el consumo de recursos entre programas escritos en *C* y programas escritos en *Python*, más específicamente se comparan tiempos de ejecución de programas.

Así que ahora, centrándonos en la comparación de tiempos de ejecución, me interesa que analicemos...

### ¿Qué es lo que realmente estamos comparando cuando comparamos lenguajes?

Cuando comparamos la **eficiencia** en el consumo de recursos, más específicamente tiempos de ejecución, entre lenguajes de programación, ¿qué es lo que realmente estamos comparando?.

Estamos comparando:

- **Lenguajes de programación**: Cuán eficientes son las abstracciones que cada lenguaje nos provee.
- **Bibliotecas y frameworks**: Qué tan buenas son las implementaciones de algoritmos, estructuras de datos, etc. que nos provee nuestras bibliotecas.
- **Compiladores e intérpretes**: Cuán buenos son estos optimizando nuestro código.
- **Run-time systems, virtual machines**: ej: administración del stack, administración de memoria dinámica (malloc, garbage collection, etc).
- **Sistemas operativos**: Administradores de memoria virtual, File Systems, Scheduler (planificador) de procesos, etc.
- **Hardware**: CPU, memoria, data/instruction cache de diferentes niveles, pipelining, store buffers, instrucciones vectoriales, branch predictor, etc.

O sea, cuando escribimos un mismo programa usando dos lenguajes de programación y comparamos su tiempo de ejecución, estamos comparando muchos componentes y no sólo los lenguajes.

Un ejemplo: en la [presentación (slide 10)](http://www.taniquetil.com.ar/facundo/pyrapidc.pdf) se intenta medir el tiempo de ejecución de un programa que lee un millón de pares de enteros (con signo de 32-bits) de un archivo, realiza la multiplicación de cada par de enteros, y por último almacena el producto en otro archivo.

¿Qué están tratando de comparar en este caso?.

Lo que están comparando es casi netamente un *I/O bound computation* y esto no tiene poco que ver con los lenguajes de programación, sino que en este caso los tiempos están **dominados** totalmente por componentes del sistema operativo y del hardware. En todo caso, en lo que a lenguajes de programación respecta, estarían comparando las rutinas encargadas de realizar operaciones I/O de cada lenguaje, como por ejemplo la cabecera [stdio.h](https://en.wikipedia.org/wiki/C_file_input/output) de *C* o las funciones de I/O de *Python*.
Si usted necesita desarrollar una aplicación en la cual se requieren muchas operaciones de I/O (file system, networking, etc.), entonces, probablemente su aplicación no sea una aplicación donde la performance sea un requisito fundamental. En caso de que si lo fuere y se requiera obtener datos de una fuente I/O, procesar los datos y volver a volcarlos en I/O, me parece más conveniente medir cada subsistema por separado, ya que como dije antes, el I/O domina el tiempo global de la aplicación.


### ¿Qué debemos tener en cuenta al realizar mediciones?

Para poder realizar cualquier medición y comparación, siempre es conveniente adoptar un enfoque científico:

- Formular una **hipótesis**: ¿cómo espera mejorar el rendimiento?
- Diseñar **tests** que determinen si su hipótesis es correcta.
- Ejecutar los tests.
- Reunir **datos**.
- **Analizar/interpretar** estadísticamente los datos.
- Sacar **conclusiones**.
- Presentar conclusiones.

Este es un proceso evolutivo que nos permite, a través del análisis y las conclusiones, re-diseñar los tests en caso de que no cumplan nuestras expectativas.
Con el transcurso de los artículos vamos a ir viendo formas útiles de encarar estos puntos.

Por último...

### ¿Qué debemos conocer para poder realizar mediciones?

Considero que para poder analizar o interpretar correctamente los datos y sacar conclusiones acertadas, es imprescindible tener un buen conocimiento de distintas áreas:

- **Lenguajes de Programación**: obviamente es necesario el conocimiento profundo de los lenguajes de programación implicados. Si vamos a comparar lenguajes y conocemos a medias alguno de ellos, lo que estamos haciendo es una comparación falaz.

- **Plataformas**: Además de los lenguajes es necesario conocer las plataformas en donde nuestros programas se ejecutarán. Ejemplo: CPU, sistema operativo, compilador, intérprete, etc...

- **Mecanismos de instrumentación**: las herramientas que necesitamos para poder medir la eficiencia de nuestros programas. Ejemplo: Herramientas de análisis de rendimiento, Performance Counters, etc...

- **Algoritmos**: Conocer sobre los algoritmos que estamos evaluando y sobre variantes del mismo resulta de vital importancia. Debemos medir la complejidad (en tiempo y espacio) de nuestros algoritmos, de forma *simplificada* (ej: [big-O notation](https://en.wikipedia.org/wiki/Big_O_notation)) y de forma *exacta*. Con *complejidad exacta* no me refiero a contar la cantidad de instrucciones de procesador a ejecutarse, sino al recuento del número de operaciones elementales realizadas por el algoritmo, como sumas, multiplicaciones, etc...

- **Matemática**: la matemática en general y la estadística en particular son herramienta fundamentales para la investigación científica, en este caso, son herramientas que nos permiten interpretar los datos obtenidos.

- (opcional) **Lenguaje [Ensamblador](https://en.wikipedia.org/wiki/Assembly_language)**: si queremos evaluar si nuestro compilador (en el caso del *lenguaje C*) genera código óptimo, debemos ser capaces de leer el código *ensamblador* generado por este.


## Conclusiones

La programación es una disciplina que está enmarcada dentro de la Informática o Ciencias de la computación que, como toda ciencia, es una actividad social realizada por comunidades.

Si vamos a exponer nuestro trabajo hacia la comunidad, como puede ser un artículo/paper científico, un artículo de un blog o una charla/conferencia, debemos estar abiertos a opiniones, sugerencias y críticas. Siempre debemos recordar que una crítica no es un agravio, sino una opinión que debe tener cierto formalismo y estar sustentada con fundamentos.

En cuanto a la comparación de lenguajes, es importante entender que un lenguaje es una herramienta. Los lenguajes son muy distintos entre sí, pero todos ellos están a nuestra disposición (sí, es cierto que hay que aprenderlos), así que tenemos la posibilidad de elegir el lenguaje que mejor se adapte a nuestras necesidades.

Dada la complejidad de las arquitecturas de computadores modernos, es casi imposible predecir el rendimiento de nuestros programas. Es por eso que realizamos mediciones y estas nos ayudan a aproximarnos al rendimiento real de los programas. Pero antes de embarcarnos en una medición es importante tener un conocimiento sobre diferentes áreas, y por sobre todo,  tenemos que conocer ciertas características de la arquitectura de la computadora sobre la que estamos trabajando. Lo paradójico es que medimos para evitar conocer la arquitectura, pero necesitamos conocer la arquitectura para entender el resultado de las mediciones.

Para finalizar, bienvenidas sean las críticas sobre este artículo o los demás presentados en [este blog](https://componentsprogramming.com).

---

## Serie "Desmitificando":

&nbsp;&nbsp;&nbsp;[«Python. Más rápido que C». Desmitificando, parte 1]({% post_url es/posts/2016-01-13-desmitificando-parte1 %})


## Notas / Referencias

<a name="Ref1">[1]</a> Los [Sistemas o System software](https://en.wikipedia.org/wiki/System_software) es software diseñado para proveer servicios a otro tipo de software, como son las [Aplicaciones](https://en.wikipedia.org/wiki/Application_software). Ejemplos de *Sistemas* pueden ser: sistemas operativos, drivers, motores de juegos.



