---
layout: post
type: draft
title:  "Introducción a Generic Programming"

date:   2016-03-23 12:00:00
comments: true

category: english

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

More specifically, the book is about generic programming, an approach to programming
that was introduced in the 1980s and started to become popular following the creation
of the C++ Standard Template Library (STL) in the 1990s. We might define it like
this:

Definition 0.1. Generic Programming is an approach to programming that focuses on
designing algorithms and data structures so that they work in the most general setting
without loss of efficiency


Generic Programming es una manera de programar que se centra en el diseño de algoritmos y estructuras de datos para que funcionen de forma más general sin pérdida de eficiencia.


Distincion entre Generic Programming y C++ Templates.
Mencionar que Generic Programming no es abuso de Templates, no es Template Metaprogramming. Decir que TMP tiene su finalidad, pero a veces se tiende a abusar.
Generic programming es una actitud... ver en FM2GP




Those are tools that enable the language to support generic programming, and it’s impor- tant to know how to use them effectively. But generic programming itself is more of an attitude toward programming than a particular set of tools.

Esos son herramientas que permiten la lengua para apoyar la programación genérica, y es importante saber cómo utilizarlos de manera efectiva. Pero sí programación genérica es más una actitud hacia la programación de un determinado conjunto de herramientas.






De donde viene Generic Programming... Abstract Algebra

Generic Programming es Abstracciones... Pero... para ver como hacer algo General/Generic/Abstractor... debemos empezar con algo concreto...

Las abstracciones de Abstract Algebra aparecen en las ramas de la mátemáticas más antiguas, como Number Theory..., con más de 2500 años...


Mencionar a Stepanov y Musser, poner Foto
Mencionar STL, Stepanov es conocido por STL, el cuál es una biblioteca que muy pocos comprendern conceptualmente.
Stepanov, corrige y refina varias de las ideas originales de STL en Elements of Programming.


Ejemplo a desarrollar...

- Tomar e Egyptian multiplication del capítulo 1
- Mostrar su evolución a Generic Programming del Capitulo 6 "From Multiplication to Power"




Al final... mencioar Elements of Programming y FM2GP



----------------

The First Algorithm - Egyptian Multiplication

Despite its long history, the notion of an algorithm didn’t always exist; it had to be invented. While we don’t know when algorithms were first invented, we do know that at least some algorithms existed in Egypt at least as far back as 4000 years ago.

Unfortunately, we have little written record of the Egyptians’ mathematical knowl- edge. Only two mathematical documents survived from this period. The one we are concerned with is called the Rhind Mathematical Papyrus, named after the 19th-century British collector who bought it in Egypt. It is a document from about 1650 BC written by a scribe named Ahmes, which contains a series of arithmetic and geometry problems, to- gether with some tables for computation. This scroll contains the first recorded algorithm,

a technique for fast multiplication, along with a second one for fast division. Let’s begin by looking at the fast multiplication algorithm, which (as we shall see later in the book) is still an important computational technique today.




The Egyptians’ number system, like that of all ancient civilizations, did not use positional notation and had no way to represent zero. As a result, multiplication was extremely dif- ficult, and only a few trained experts knew how to do it. (Imagine doing multiplication on large numbers if you could only write with something like Roman numerals.)




Every multiplication algorithm depends on distributivity, which the Egyptians knew about:

	(n+m)a = na+ma           (1.1)

This allows us to reduce the problem. We start with the inductive base:
	1a = a					(1.2) (it is an axiom, it is part of the definition of multiplication)

	Next we have the inductive step:

	(n+1)a = na+a          (1.3)



One way to multiply n by a is to add instances of a together n times. However, this could be extremely tedious for large numbers, since O(n) additions are required. In C++, the algorithm looks like this:

	int multiply0(int n, int a) {
		if (n == 1) return a;
		return multiply0(n - 1, a) + a;
	}

The two lines of code correspond exactly to axioms 1.2 and 1.3 above. Both a and n must be positive. (We’ll make that assumption throughout this chapter, since “numbers” for the ancient Egyptians were just positive integers; they didn’t have a notion of zero or negative numbers.)

The algorithm described by Ahmes relies on the following insight:

	4a = ((a+a)+a)+a = (a+a)+(a+a)


By relying on associativity, we can compute a + a only once and reduce the number of additions.

The idea is to keep halving n and doubling a, constructing a sum of power-of-2 multi- ples. At the time, algorithms were not described in terms of x and y; instead, the author would give an example and then say “now do the same thing for other numbers.” Ahmes was no exception; he demonstrated the algorithm by showing the following table for mul- tiplying 41 by 59:

		 1		/		  59
		 2      		 118
		 4				 236
		 8      /        472        
		16               944
		32      /       1888




----------------