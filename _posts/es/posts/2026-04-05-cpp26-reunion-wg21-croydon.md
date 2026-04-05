---
layout: post
type: post
title:  "C++26 está listo: notas desde la reunión de WG21 en Croydon"
date:   2026-04-05 12:00:00
comments: true
tags: [c++, cpp, c++26, wg21, iso, contracts, reflection, eiffel, design by contract, clang, gcc, components programming, componentsprogramming, generic programming]
description: "El comité ISO C++ cerró C++26 el 28 de marzo en Croydon, UK. Participaron alrededor de 210 personas representando a 24 naciones. No más features, no más adiciones. C++26 está listo."
---

<figure>
<img src="{{ site.url }}/images/wg21-2026-croydon.png" alt="Foto grupal de WG21 en la reunión de Croydon, marzo 2026">
<figcaption>Crédito de la foto: Herb Sutter</figcaption>
</figure>

El comité ISO C++ cerró C++26 el 28 de marzo en Croydon, UK. Participaron alrededor de 210 personas (130 presenciales, 80 remotas) representando a 24 naciones, resolviendo los últimos 411 comentarios de los organismos nacionales. De acá en adelante el documento va a su votación de aprobación final. No más features, no más adiciones. C++26 está listo.

Esta fue mi primera reunión presencial de WG21. Soy miembro del comité desde 2022 y antes participé de forma remota, pero vengo siguiendo la evolución del lenguaje desde la era C++0x, cuando "0x" se estaba convirtiendo en un chiste y nadie estaba seguro de que llegaría a publicarse. Estar ahí para el cierre de C++26 se sintió como el momento justo para finalmente aparecer en persona.

## Contracts: aprobados, debatidos, divisivos

Contracts entró en C++26. La votación final fue 114 a favor, 12 en contra, 3 abstenciones. Ese nivel de oposición es inusual para una feature en esta etapa, y el debate en la sala fue palpable.

Mi perspectiva sobre contracts viene de Eiffel y su filosofía de Design by Contract. En ese modelo, los contratos son parte de la semántica del programa. Una violación de precondición significa que el llamador tiene un bug. Una violación de postcondición significa que el implementador tiene un bug. La responsabilidad es inequívoca, y las violaciones son siempre bugs, nunca situaciones de runtime que deban manejarse con flexibilidad.

C++ tomó un camino más configurable. Eso no es necesariamente malo; C++ siempre fue un lenguaje de opciones. Pero la flexibilidad adicional tiene un costo visible en simplicidad conceptual. La distancia entre lo que C++ llama "contracts" y la filosofía original de Design by Contract es mayor de lo que esperaba.

## Reflection: lo grande de verdad

Si contracts fue la feature más debatida, reflection fue la más transformadora.

Reflection en C++26 permite introspección en tiempo de compilación de tipos, miembros y estructura del programa, cosas que antes requerían herramientas externas o metaprogramación pesada con templates. GCC ya tiene una implementación mergeada en trunk.

Esto cambia lo que es posible dentro del lenguaje. No incrementalmente, sino categóricamente. La forma en que escribimos bibliotecas, generamos código y expresamos abstracciones va a ser diferente. Creo que vamos a estar descubriendo nuevos patrones alrededor de reflection por mucho tiempo.

## La sesión vespertina que cambió mi rumbo

Una sesión vespertina trató sobre un problema estructural que viene creciendo hace años: hay muchas más propuestas (papers) que capacidad de implementación. Los equipos de compiladores en Clang, GCC y MSVC están al límite. El cuello de botella ya no es el diseño. Es la implementación. Las features se aprueban en papel y después tardan años en ser usables.

Surgieron varias ideas: que los autores de papers traigan al menos implementaciones parciales, que las propuestas se prueben contra la realidad antes de avanzar, e incluso que herramientas asistidas por IA podrían ayudar a bajar la barrera. Esto último generó una reacción visible en la sala: murmullos, gente hablando fuera de turno, frustración. Fue un momento breve, pero revelador.

Lo que me quedó fue el mensaje central de los implementadores. Al día siguiente, empecé a contribuir tanto a Clang como a GCC, a nivel de biblioteca y de compilador. No por un gran plan, sino porque el mensaje caló: si te importa que el lenguaje avance, ayudá a construirlo.

## Estar ahí

Hay algo en estar en la sala que la participación remota no puede replicar. Las conversaciones de pasillo, el lenguaje corporal durante los debates, la energía cuando cae una votación reñida.

C++ sigue volviéndose más poderoso, y el costo de mantenerse al día es real. Pero la comunidad detrás del lenguaje está profundamente comprometida con hacerlo bien, y eso fue evidente en Croydon.

Me alegra haber estado ahí para esta.
