---
layout: post
type: post
title:  "What's your favorite flavor of Object?"

date:   2015-09-26 12:00:00
comments: true

category: english

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

In this article I want to continue the discussion about the terminology that we, programmers, use daily; following the line of ["Using the proper terminology: Method?"]({% post_url en/posts/2015-08-12-using-the-right-terms-method %}).


## Introduction

Programmers, especially since the popularization of *Object-Oriented Programming*, use the word *Object* without really thinking about its meaning.

Always struck me all the terminology related to the *O-O paradigm*, because I believe that many of the definitions of this paradigm are ambiguous or to vary between different authors.


## What "Object" means?

In computer science, and especially in programming, there is no formal or a single definition of "Object".  
Different authors of programming languages ​​and textbooks was given different meanings to it.

I will try, in this article, to present and analyze the different definitions and reach a conclusion about what definition is more in line to the programming style adopted in this blog.

### Simula

Here is the definition provided by the authors of the [Simula programming language](https://en.wikipedia.org/wiki/Simula):

> An object is a self-contained program (block instance) having its own **local data** and **actions** defined by a "class declaration". The class declaration defines a program (data and action) pattern, and objects conforming to that pattern are said to "belong to the same class". [[1]](#Ref1)

The above definition is important because Simula is considered the first *object-oriented* programming language.

Three things stand out:

1. An object has own data.
2. An object includes actions.
3. Membership of an object to a class



### Smalltalk

Although Simula is the first object-oriented programming language of, the *strong marketing* of objects paradigm arose with [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk).  
One can say that Smalltalk is the most influential language in regard to *Objects*.

According to the Smalltalk-72 instruction manual [[2]](#Ref2):

> Every entity in Smalltalk's world is called an object. Objects can **remember things** and **communicate** with each other by sending and receiving messages. Every object belongs to a class...

The same three things of the Simula definition stand out, but with variations:

1. An object has its own data: "remember things".
2. An object includes actions: communication by messages is a particular form of action.
3. Membership of an object to a class.

And, according to [Smalltalk standard [3]](#Ref3):

> An object is a computational entity that is capable of **responding** to a well defined set of messages. An object may also encapsulate some (possibly mutable) **state**.

It stands:

1. An object has its own data: "state".
2. An object includes actions: communication by messages is a particular form of action.
3. New concept: *mutability*.


### Eiffel - Object-Oriented Software Construction

[Object-Oriented Software Construction](http://www.amazon.com/Object-Oriented-Software-Construction-CD-ROM-Edition/dp/0136291554) is one of the most important references in terms of object-orientation. It was written by [Bertrand Meyer](https://en.wikipedia.org/wiki/Bertrand_Meyer), the designer of the [Eiffel programming language](https://en.wikipedia.org/wiki/Eiffel_(programming_language)). 

Eiffel is one of the called *purely object-oriented languages*, because even the built-in types, as integer or real, are created by classes.

Here the definition of *object* given by Meyer in OOSC [[4]](#Ref4):

> Object: A run-time data structure made of zero or more **values, called fields**, and serving as the computer representation of an abstract object. Every object is an **instance of some class**.

The above definition states:

1. An object has its own data: "made of zero or more values".
2. Membership of an object to a class.

### C++

[C++](https://en.wikipedia.org/wiki/C%2B%2B) is a language that supports *objects technology*.  
C++ has a definition of the object very different to which most programmers are accustomed:

According to the [C++ standard [5]](#Ref5):

> ... An object is a **region of storage**. [Note: A function is not an object, regardless of whether or not it occupies storage in the way that objects do. —end note] ...

### C programming language

You may wonder why I'm including the [C programming language](https://en.wikipedia.org/wiki/C_(programming_language)) in this list if it does not include features of object-oriented languages.

While the C language is not an object-oriented language, it includes in its [standard [6]](#Ref6) a definition of *object*: 

> object: **region of data storage** in the execution environment, the contents of which can represent values...

### Elements of Programming

[Elements of Programming](http://www.elementsofprogramming.com/) is the *magnum opus* of [Alexander Stepanov](http://www.stepanovpapers.com) and [Paul McJones](http://www.softwarepreservation.org/author/pmcjones).  
According my consideration, it is on the way to become a classic text of programming, so I recommend to all those lovers of this beautiful discipline that do not deprive yourself to read it.

> An object is a representation of a [concrete entity](#RefConcreteEntity) as a **value in memory**. An object has a **state** that is a value of some value type. The state of an object is **changeable**. Given an object corresponding to a concrete entity, its state corresponds to a snapshot of that entity...  
...  
An object type is a pattern for **storing and modifying** values in memory. Corresponding to every object type is a value type describing states of objects of that type. Every object **belongs to an object type**. An example of an object type is integers represented in 32-bit two's complement little-endian format aligned to a 4-byte address boundary. [[7]](#Ref7)

In the above definition, Stepanov and McJones try to take away from any kind of programming paradigm and establish a more general definition of what an *object* means. While clear differences with the other definitions are noted, you can see some similarities with them:

1. An object has its own data: "value in memory", "state".
2. An object includes actions: "storing and modifying values in memory" are basically actions or behavior.
3. Membership of an object to an *object type*.
4. An object is mutable/changeable.

## Conclusions

As you have noticed, there are a variety of definitions of *object*. Some match in certain features, some not.

The blog author prefers the definition given by Stepanov and McJones in [Elements of Programming](http://www.elementsofprogramming.com/). I consider it the most complete, practical, broad and based on a solid mathematical foundation definition.

It is the most complete definition, because it begins to develop a taxonomy of ideas as *Entity*, *Species*, *Genus*, which serves as the basis for *object* definition and other definitions. These definitions are not included in this article to learn more about it please refer to [the book](http://www.elementsofprogramming.com/).

It is the most practical definition, since it is aware that all programs run on computers with memory and these constitutes the only available realization of a universal computational device. 

It is the broadest definition, since it does not exclude ​​non-object-oriented paradigm languages.

Again, I made ​​my choice, but there is not need to sat that you can choose any definition you like, just make sure that your thinking is free of influences disseminated by the *Objects* propaganda machinery :)

---

## "Terminology" series:

&nbsp;&nbsp;&nbsp;[Using the proper terminology: Method?]({% post_url en/posts/2015-08-12-using-the-right-terms-method %})  
&nbsp;&nbsp;&nbsp;[What's your favorite flavor of Object?]({% post_url en/posts/2015-09-26-whats-your-favorite-flavor-of-object %}) 
 

---

## Notes / References

Clarification: The emphasis/bold in each of the definitions is on my own.

<a name="Ref1">[1]</a> SIMULA 67: COMMON BASE LANGUAGE, by Ole-Johan Dahl, Bjørn Myhrhaug and Kristen Nygaard. Publication No. S-22. Classes 1. 3. 3 [page 6]

<a name="Ref2">[2]</a> Smalltalk-72 Instruction Manual by Adele Goldberg and Alan Kay [page 44]

<a name="Ref3">[3]</a> [ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft](http://smalltalk.org/versions/ANSISmalltalk/ANSISmalltalkStandard_v1.9_199712_NCITS_X3J20_draft.pdf), Section 3.1 [page 9]

<a name="Ref4">[4]</a> Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]  

<a name="Ref5">[5]</a> [ISO International Standard ISO/IEC 14882:2014(E) – Programming Language C++, current working draft (at Aug, 2015)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/n4527.pdf), section: 1.8 [intro.object] paragraph 1.

<a name="Ref6">[6]</a> [ISO/IEC 9899:201x Committee Draft – Programming languages — C (last draft available at Aug, 2015)](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1539.pdf), section: 13.15.

<a name="Ref7">[7]</a> [Elements of Programming](http://www.elementsofprogramming.com/) by Stepanov and McJones [2009, page 4]  

<a name="RefConcreteEntity">EoP's concrete entity definition: </a> An abstract entity is an individual thing that is eternal and unchangeable, while a **concrete entity** is an individual thing that comes into and out of existence in space and time... Blue and 13 are examples of abstract entities. Socrates and the United States of America are examples of concrete entities...

