---
{
  "title": "C++26 y Contracts: lo que me dejó Búzios",
  "url": "/cpp26-contracts-lo-que-me-dejo-buzios/",
  "lang": "es",
  "date": "2026-11-27T12:00:00+01:00",
  "type": "post",
  "published": true,
  "comments": true,
  "tags": ["c++", "c++26", "wg21", "iso", "contracts", "gcc", "gobernanza"],
  "translationKey": "cpp26-contracts-what-buzios-left-me-with",
  "description": "Por primera vez, la votación internacional rechazó el borrador de una edición de C++. En Búzios el comité mantuvo Contracts y aprobó un segundo intento. Qué pasó y por qué quiero Contracts en C++26.",
  "topic": "C++ / WG21",
  "cover": {
    "src": "/images/cpp26-contracts-buzios.webp",
    "alt": "Ilustración de un borrador sobre una mesa frente a la costa de Búzios"
  }
}
---

El 23 de octubre pasó algo que nunca había pasado con C++: la votación internacional rechazó el borrador de una nueva edición del estándar. Era C++26, y buena parte de las objeciones apuntaba a una sola característica, Contracts. Un mes después, en Búzios, el comité de C++ decidió mantener Contracts, le hizo un cambio concreto y aprobó enviar el texto a una segunda votación.

El rechazo me frustró mucho. Quiero contar qué pasó y, sobre todo, por qué creo que Contracts tiene que estar en C++26.

<figure>
<img src="/images/cpp26-contracts-buzios.webp" alt="Un borrador marcado sobre una mesa frente a la costa de Búzios" width="1200" height="700">
<figcaption>Ilustración editorial inspirada en Búzios.</figcaption>
</figure>

## Qué pasó

WG21 es el grupo de trabajo de ISO e IEC que desarrolla el estándar de C++. Es lo que solemos llamar «el comité». En marzo, en Croydon, el grupo aprobó por 114 votos a favor, 12 en contra y tres abstenciones enviar el texto completo de C++26 a votación internacional. Contracts formaba parte de ese texto desde febrero de 2025. [Grupo de trabajo de C++](https://www.open-std.org/jtc1/sc22/wg21/) · [Actas de Croydon](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/n5040.pdf)

En esa etapa el texto se llama DIS (*Draft International Standard*, borrador de estándar internacional), y ya no votan las personas que asisten a las reuniones. Votan los organismos nacionales de normalización (*National Bodies*), uno por país. Es el último paso antes de publicar una edición y hasta ahora había sido casi un trámite: todos los DIS anteriores de C++ se habían aprobado por unanimidad.

Esta vez no. La votación cerró el 23 de octubre y los organismos nacionales no aprobaron el borrador. Las objeciones se concentraron en Contracts, pero el rechazo frenó la edición entera, con todo lo demás que trae C++26. [Resultado de la votación](https://train-it.eu/blog/cpp26-contracts-the-ballot-result/)

En noviembre, en Búzios, el comité revisó los comentarios que acompañaron los votos. Se presentó una moción, es decir, una propuesta formal, para retirar Contracts. No reunió el apoyo necesario. Sí se aprobó un cambio que responde a una de las objeciones, y lo explico más abajo. En la plenaria, la sesión en la que se reúne el grupo completo, se aprobó reenviar el texto revisado por 111 votos a favor, nueve en contra y ocho abstenciones. La decisión vuelve a estar en manos de los organismos nacionales. [Agenda de Búzios](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/n5058.html) · [Informe de la reunión](https://herbsutter.com/2026/11/21/c26-is-done-again-trip-report-november-2026-iso-c-standards-meeting-buzios-brazil/)

## Para qué sirve un contrato

Toda función tiene un contrato, aunque no esté escrito en el código. Una **precondición** es lo que tiene que cumplirse al llamarla. Una **poscondición** es lo que la función garantiza al retornar, siempre que la llamada haya cumplido su parte. Hoy ese contrato vive en la documentación, en un comentario o en la cabeza de quien escribió la función.

Un ejemplo de la biblioteca estándar es `std::lower_bound`, una búsqueda binaria. En una lista ordenada encuentra dónde habría que insertar un valor. Si buscamos `5` en `[1, 3, 8]`, devuelve la posición del `8`. Su especificación dice dos cosas. La precondición es que todos los elementos menores que el valor buscado estén antes que los demás. La poscondición es que el resultado marque justo el límite entre esos dos grupos. [Especificación de `lower_bound`](https://eel.is/c++draft/lower.bound)

¿Qué pasa hoy si llamamos a `std::lower_bound` con una lista desordenada? Nada visible. La función devuelve una posición que no significa nada y el programa sigue. El error aparece mucho después, lejos de la llamada que lo causó.

Con Contracts, esas dos condiciones se escriben en la declaración, con `pre` y `post`. Esta es una versión simplificada, solo para enteros, que sirve para ver la idea:

```cpp
std::vector<int>::const_iterator
lower_bound(const std::vector<int>& v, const int valor)
  // Lo que exige: los menores que `valor` están antes que el resto.
  pre(std::ranges::is_partitioned(v, [&](int e) { return e < valor; }))
  // Lo que garantiza: todo lo que queda antes del resultado `r` es menor...
  post(r: std::all_of(v.begin(), r, [&](int e) { return e < valor; }))
  // ...y nada de lo que queda desde `r` en adelante lo es.
  post(r: std::none_of(r, v.end(), [&](int e) { return e < valor; }));
```

Ahora el contrato es código. El compilador lo ve, las herramientas lo ven y quien lee la declaración también. De ahí salen tres usos distintos de la misma información.

**Comprobar en ejecución.** Si ejecutamos las pruebas con los contratos activados y alguien llama a la función con una lista desordenada, el programa se detiene en esa llamada y señala la precondición que falló. El error que antes aparecía lejos ahora aparece en su origen.

**Saber de quién es el error.** Si falla una precondición, el problema está en quien llamó. Si la llamada era válida y falla una poscondición, el problema está en la implementación de la función. Esa distinción, que hoy cuesta horas de depuración, queda resuelta en el mensaje.

**Probar sin escribir cada caso.** Las poscondiciones dicen qué es un resultado correcto para cualquier entrada válida. Podemos generar miles de listas ordenadas al azar, buscar valores al azar y dejar que el contrato verifique cada resultado. No hace falta escribir a mano la respuesta esperada de cada caso.

Hay un cuarto uso, que es el que más me entusiasma a largo plazo: el **análisis estático**. Si el código dice qué garantiza una función y qué exige la siguiente, una herramienta puede intentar demostrar, sin ejecutar nada, que una llamada es válida. Y si no puede, señala dónde falta una comprobación.

Un detalle importante: comprobar que una lista está ordenada cuesta más que la búsqueda misma. Nadie quiere pagar eso en producción en cada llamada. Por eso C++26 deja elegir al compilar qué se hace con cada contrato: comprobarlo y terminar el programa si falla, comprobarlo y solo avisar, o ignorarlo. El mismo código se prueba con todo activado y se entrega con lo que cada proyecto decida. [P2900R14](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)

Esa flexibilidad fue justamente uno de los puntos discutidos. Hay condiciones que conviene comprobar siempre, sin que una opción de compilación pueda desactivarlas. El cambio aprobado en Búzios responde a eso: permite marcar en el código una condición que siempre se comprueba y, si falla, el programa no sigue ejecutándose más allá de ese punto. [Propuesta aprobada sobre comprobaciones obligatorias](https://github.com/cplusplus/draft/issues/9399)

## No es perfecto

¿El diseño de Contracts que está en el borrador tiene defectos? Seguramente. Hay decisiones que yo habría tomado de otra manera.

Pero C++ tiene más de cuarenta años. Todo lo que se le agrega tiene que convivir con decisiones anteriores y con una cantidad enorme de código que ya funciona. Ninguna característica nueva sale limpia de ese proceso, y en el estándar hay varias cuyo diseño me convence bastante menos que este. Contracts lleva muchos años de trabajo y de intentos anteriores. Creo que lo que hay en el borrador es lo mejor que se puede hacer hoy sobre el lenguaje que tenemos, y es una base sólida para empezar a usar la programación por contratos y mejorarla con la experiencia.

Esperar a C++29 no la haría perfecta. Solo retrasaría tres años más el momento de empezar a aprender con código real.

## Por qué me frustró

Algunas objeciones merecían atención, y el cambio de Búzios muestra que se podían atender sin sacar nada. Otras no me parecieron razón suficiente para retirar la característica entera, y mucho menos para frenar toda la edición.

Mi impresión personal es que en el rechazo pesó también la política, además de la técnica. No puedo demostrarlo, y no sé cuánto influyó en cada voto. Pero un rechazo sin precedentes, en la última etapa, sobre un texto que el comité había aprobado por amplia mayoría, me dejó esa sensación, y no me gustó.

## Antes de la segunda votación

Prefiero quedarme con lo que pasó después. El comité escuchó las objeciones, cambió lo que tenía sentido cambiar y volvió a respaldar el texto por amplia mayoría, con Contracts adentro. El borrador que vuelve a los organismos nacionales es mejor que el que rechazaron.

Eso me da motivos para esperar otro resultado. Ojalá la segunda votación confirme que el rechazo fue un tropiezo y que C++26 sale con Contracts.
