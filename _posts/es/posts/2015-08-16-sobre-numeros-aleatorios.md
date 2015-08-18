---
layout: post
type: draft
title:  "Sobre números aleatorios"
date:   2015-08-16 12:00:00
comments: true

# description: "Portland in shoreditch Vice, labore typewriter pariatur hoodie fap sartorial Austin. Pinterest literally occupy Schlitz forage."
category: spanish

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

En esta oportunidad quería escribir sobre números aleatorios, a partir de una publicación que vi a través de Facebook.

La empresa argentina [Hexacta](http://www.hexacta.com/) publicó este desafío y por alguna razón apareció como publicidad cuando estaba "chequeando Facebook".

![Desafío Hexacta]({{ site.url }}/images/hexacta-random.jpg)

https://www.facebook.com/HexactaIT/photos/a.453616814332.248053.74662059332/10153394596469333/?type=1&theater

Textual, dice:

> "Como implementarías el método arrojar de la clase  
Dado, que devuelve un resultado entre 1 y 6, utilizando una  
librería que devuelve números aleatorios entre 1 y 1000.  
  
> ¡Recordá que el algoritmo tiene que ser equiprobable!"

Al final del artículo voy a hacer algunos comentarios que no tienen nada que ver con los números aleatorios, pero, es más fuerte que yo y no puedo evitar hacerlos. ***

- Que significa NUMERO ALEATORIO
- FORMULA U = K / m ... m usualmente es del mismo tamano que el Word de la maquina
- Linear Congruential
- Distribucion Uniforme .. Equiprobable
- 


***
En la obra maestra de la programación, The Art of Computer Programming ***, Donald Knuth *** le decica casi 200 páginas a los números aleatorios. (*** Referencia al Volumen 2, Capítulo 3)

Hacer mencion a que los programadores Moderos solo conocen a Knuth por su famosa frase de Premature Optimization is the root of.... ????

***

La version naive del algoritmo:
	
	uniform_distribution_1_6(RandomGenerator gen) {
		return gen() % 6 + 1	
	}

	test() {
		gen = random_generator_1_1000

		for (auto i = 0; i < max; ++i) {
			x = uniform_distribution_1_6(gen)
			// do whatever with x
		}
	}
	

Este algoritmo sufre de algunos problemas:

	1. No es equiprobable, tal como lo pide el enunciado
	2. Al usar el operador de módulo, % (nuestro lenguaje de pseudo-código hereda este operador del lenguaje C) LOW SIGNIFICANT BITS -- VER KNUTH Y EL LIBRO DE EL CUAL SE BASA LA BCL de .Net ***


---

- NEAR EQUAL PROBABLE
- Version tomada de Boost, que descarta los numeros mayores a 996, Knuth dice que es Uniformemente Distribuido