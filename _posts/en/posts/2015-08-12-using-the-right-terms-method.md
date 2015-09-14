---
layout: post
type: post
title:  "Using the proper terminology: Method?"
date:   2015-08-12 12:00:00
comments: true

category: english

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp, smalltalk, fortran, algol, simula, method, procedure, routine, function, history]
---

In this series of articles I intend to review why we, as programmers, use certain terminology, certain words, some of which I consider inappropriate.  
In this case want to talk about the word _method_.

First of all ...

### What is a *method*?

Any programmer knows that an [_object_ [1]](#Ref1) has state and behavior.  
The state is stored in *fields* and behavior is achieved through *methods*.
A *method* (in programming) is a sequence of instructions, is part of an object or class. [[2]](#Ref2)

But ...

### Why "method"?

What is the difference between a *method* and a *procedure*?

A *procedure* is a sequence of instructions. [[2]](#Ref2)

The only difference is that a method must belong to a class while in the definition of procedure it is unclear whether it belongs to a class or not. The term "procedure" is used long before the existence of the term "class".

In summary, a method is a procedure that is a member of a class.  
So, we have *member* procedures and *free* procedures (outside a class).

I keep wondering ...

### Why we use the term "*method*" insted of "*procedure*"?

My guess is that with the establishment of [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) as one of the most popular programming languages, also saw the popularization of its terminology. From that moment, other languages ​​and programmers adopt the terminology popularized by Java and it becomes more frequent use than traditional terminology.

Now, I want to make a search through the history of programming languages ​​to understand why we began calling "method" to the "procedures". I will go from modern to ancient times ...

### Java

In [Java](https://en.wikipedia.org/wiki/Java_(programming_language)), there are no *free procedures*, all procedures have to be a member of a class, these member procedures actually are called methods.

According to [Java 8 specification [3]](#Ref3):

- The body of a class declares members (fields and methods and nested classes and interfaces), instance and static initializers, and constructors.
- Method declarations describe code that may be invoked by method invocation expressions.

The Java specification describes the relationship between a method and a class, but it does not specify what the word "method" means.

Beyond the definition, in the specification we will not find why language designers decided to call "method" to procedures, so we must go even further back.

Java inherits most of its syntax (not its semantics) and terminology from [C++](https://en.wikipedia.org/wiki/C%2B%2B).


### C++

[C++](https://en.wikipedia.org/wiki/C%2B%2B) born in the late 1970s, as a superset of the [C programming language](https://en.wikipedia.org/wiki/C_(programming_language)) with the addition object technology.

Therefore, in C++ we have member procedures and free procedures, called *member* and *non-member functions*.

According to the [C++ standard [4]](#Ref4):

- Member functions: Functions declared in the definition of a class, excluding those declared with a friend specifier, are called member functions of that class.

In other words, the word "method" is not used by C++ programmers. Maybe some C++ programmers use it because the term is very popular today; but neither the C++ standard nor the core C++ programmers use "method".

So ... What is the correct term for the code that models the behavior of objects? Is it "method"? Is it "procedure"? Which language uses the most appropriate terminology?  

I must go back in time.

C++ inherits its objects "side" from [the Simula programming language](https://en.wikipedia.org/wiki/Simula).

### Simula

[Simula](https://en.wikipedia.org/wiki/Simula) is considered the first *object-oriented* programming language.  
It is a statically typed language based on [ALGOL 60](https://en.wikipedia.org/wiki/ALGOL_60).

Simula allows procedures to be declared within a class and also outside it. The former are called the *local procedures* and the last *non-local procedures*. [[5]](#Ref5)

So, if C++ and Simula not make mention of something called "method" Where does Java take that word? Is it an invention of language designers? Is it copied from some other language?

The answer is ...


### Smalltalk

[Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) is an object-oriented programming language, it is inspired by Simula (in part), it was developed during the 1970s and was born in the early 80's.  
Unlike Simula, Smalltalk is a dynamically typed language.

Smalltalk incorporates the concepts of *messages* and *methods*.

According to the [Smalltalk standard [6]](#Ref6):

- A message is a request to perform a designated computation. An object is a computational entity
  that is capable of responding to a well defined set of messages. An object may also encapsulate
  some (possibly mutable) state.
- An object responds to a message by executing a method. Each method is identified by an
  associated method selector. A behavior is the set of methods used by an object to respond to
  messages.
- A method consists of a sequence of expressions. Program execution proceeds by sequentially
  evaluating the expressions in one of more methods. There are three types of expressions:
  assignments, message sends, and returns.

As I could not find references of the word "method" on languages older than Smalltalk, I consulted [Paul McJones](http://www.softwarepreservation.org/author/pmcjones), member of the [Software Preservation Group](http://www.softwarepreservation.org/) and coauthor of [Elements of Programming](http://www.elementsofprogramming.com/). 
I consider Paul an authority when it comes to computing and programming language history.

> Fernando: ... Do you know any programming language, before Smalltalk, that use the word "method"? ...

> Paul: You ask a very interesting question. I think you are correct that the word “method” was first used in that sense by the Smalltalk community. I looked through some early documents, such as the Smalltalk-72 Instruction Manual, and I don’t see “method” being used yet...
Dan Ingalls’s 1978 POPL paper on Smalltalk-76 is the earliest paper I’ve found so far that uses method in the sense you are interested in...

Paul believes, as I do, that the word "method" was first used by the Smalltalk community. He also said that he was reviewing old manuals; the word "method" seems to emerge between 1972 and 1976, acording to the Smalltalk-72 Instruction Manual [[7]](#Ref7) and a paper of 1978 which talks about Smalltalk-76. [[8]](#Ref8)  

In other words, I'm pretty sure the Smalltalk community coined the term, but they didn't do from the beginning but as the language evolved.

### Other languages

Here I want to discuss other programming languages that also support object technology to verify how "procedures" are called.

### Eiffel

[Eiffel](https://en.wikipedia.org/wiki/Eiffel_(programming_language)) is is a language born in the mid 1980s and, like C++, is a direct heir of Simula.

In Eiffel every member of a class is called *feature*. The state is called *attributes* and the behavior *routines*. In turn, the *routines* are divided into *functions* and *procedures* depending on whether or not return a result. [[9]](#Ref9)

In Eiffel all *routines* are members of a class, the existence of free procedures is not allowed.

### Python

The [Python programming language](https://en.wikipedia.org/wiki/Python_(programming_language)) supports free and member procedures. They are called *functions* and *methods* respectively. [[10]](#Ref10)

Python caught my attention because it's created a few years before Java; the first implementation of Python is about 1989 [[11]](#Ref11) while Java first implementation is from 1995 [[12]](#Ref12).  
It seems that this breaks my guess that Java was the *promoter* of the word "method".

While the first implementation of Java comes out in 1995, in just a few years, in 1998, Java was one of the most popular languages. Instead, Python had a longer way to popularity, it began to be popular in 2003/2004. [[13]](#Ref13)  
So my guess is still valid, the *promoter* of "method" was Java and not Python.

Returning to Python, the word "method" is mentioned in recent versions (3.4.3 and 2.7.10) of the language documentation.  
Then I hesitated about whether Python uses "method" from its origins or its terminology was mutating over time, especially with the popularity of Java.  
Thanks to excellent job done by the [python.org](http://python.org) guys keeping the historical versions of documentation I could verify that the word "method" is used since version 0.9.1 [[14]](#Ref14) (unless the documentation has been altered over time, but I hope that is not the case).

In other words, Python is the first language, after Smalltalk, to use the word "method". At least in the languages ​​I could verify.

Now I wonder, why Python used method instead of a more common term?.
No one better than the creator of language, [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum) to enlighten. I wrote an email to him, Guido was very king to answer and let me quote him:

> Fernando: Why did you use "method" instead of any other word? Have you taken from Smalltalk?  Or,... from any other programming language?

> Guido: Good question. I don't recall, but it's likely that I was somehow influenced by Smalltalk, or people around me who were influenced by Smalltalk. I definitely opened a big book about Smalltalk to learn about byte code, and I also recall we had a Smalltalk implementation that we sometimes played with (some things that were wrong with that influenced some of my philosophy for Python).

Guido does not remember well, but admits to being influenced by Smalltalk at that time.

### C\#

[C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) is a programming language that is born being very similar to Java (almost identical) with some reminiscences of C++.  
Then, over the years the language formed his own identity.

C# copy many terms of Java. One of the words that copy is "method".

According to the [C# standard [15]](#Ref15):

  - A method is a member that implements a computation or action that can be performed by an object or class.

Unlike Java spec, the C# standard defines the meaning of the word "method".

As C# is a widely used language, especially by followers of the Microsoft "philosophy", it is a major contributor on the popularization of the term.

### Objective-C

[Objective-C](https://en.wikipedia.org/wiki/Objective-C) is a language developed in the early 1980's. Like C ++, born as a super-set of C adding object technology.  
Unlike C++, the object model of Objective-C is based on Smalltalk and not in Simula.

Objective-C, like Smalltalk, has the concept of messages and methods. [[16]](#Ref16)

### Languages ​​before Smalltalk

I looked in manuals, standards and documentation of programming languages older than Smalltalk, unrelated to object-oriented programming, but very recognized for their influence on others languages.  
Specifically, the languages ​​are [Fortran](https://en.wikipedia.org/wiki/Fortran), [Algol](https://en.wikipedia.org/wiki/ALGOL) and [C](https://en.wikipedia.org/wiki/C_(programming_language)). The word "method" is not mentioned in the documentation of any of them. Instead they use terms like routine, subroutine, procedure or function [[17]](#Ref17).


### Other sources

To enhance my investigation I've done a search in some books (about programming in general) I have at my disposal:

  - [Elements of Programming](http://www.elementsofprogramming.com/) by Alexander A. Stepanov and Paul McJones
  - The Art of Computer Programming Volumes 1, 2, 3 and 4A by Donald E. Knuth

I found no reference to the word "method" in any of the 3,456 pages of these 5 books. Obviously the word "method" appears on several occasions, but not in the sense that I'm looking for.

### Pending issues 

1. Read documentation/manuals about the following programming languages:
	- Lisp
	- Scheme
	- Ada
	- Modula-2
	- Common Lisp


2. Look at some classic texts:
	- [A Discipline of Programming](http://www.amazon.com/Discipline-Programming-Edsger-W-Dijkstra/dp/013215871X/ref=sr_1_1?s=books&ie=UTF8&qid=1440444447&sr=1-1) by Edsger W. Dijkstra
	- [Algorithms and Data Structures](http://www.amazon.com/Algorithms-Data-Structures-Niklaus-Wirth/dp/0130220051/ref=pd_sim_14_5?ie=UTF8&refRID=1WFYYC7DTMCR58G3TVVA) by Niklaus Wirth
	- [Structured Programming, First Edition Edition](http://www.amazon.com/Structured-Programming-A-P-I-C-studies-processing/dp/0122005503/ref=pd_sim_14_3?ie=UTF8&refRID=1WFYYC7DTMCR58G3TVVA) by Edsger W. Dijkstra, C. A. R. Hoare and Ole-Johan Dahl
	- [Systematic Programming: An Introduction](http://www.amazon.com/Systematic-Programming-Introduction-Prentice-Hall-Computation/dp/0138803692/ref=pd_sim_14_4?ie=UTF8&refRID=0E9BAZYMCCHZFEB38592) by Niklaus Wirth

3. Send the question to the following programming languages designers:
	- Alan Kay
	- Dan Ingalls
	- Dick Gabriel
	- James Gosling
	- Anders Hejlsberg

I have tried to contact them, unsuccessfully at the moment.

## Conclusions

The word "method" was introduced to programming by the Smalltalk community. Smalltalk was not practically used in the industry in the late 80's and early 90's, so I think the word "method" was not as common as it is now.

Maybe it was a mistake of the Smalltalk designers had not used existing nomenclature, or maybe not, as Smalltalk introduced a object model different from Simula and that change perhaps merited a change of names. It is very difficult to determine if it was a wrong decision or not.

Java and Python adopt Smalltalk terminology in their vocabulary. I do not find a strong relation between Smalltalk and Java / Python justifying the use of the term, this makes me think that the use of "method" is an error in these languages. Although, as I said, is very difficult to judge whether the decision to use certain nomenclature is wrong or not.

C++, Objective-C and Eiffel used similar terminology than its predecessors, perhaps with some variations, which may be minimal or necessary to adapt to changes introduced by the languages.

Some languages, such as C#, copied Java features, but also copied the "error" to incorporate "method" to its terminology.

The word "method" is infiltrated into the vocabulary of programmers.  
There is no turning back ;)

You can use the term that you like, I'll keep using procedure or function (as long as I remember that I do not like the word "method").

---

## Acknowledgements

Special thanks to Paul McJones and Guido van Rossum for kindly respond to my questions and for giving very useful information.  
Also thanks to Mario dal Lago and Javier Velilla for reviewing the article and suggest corrections.

---

## Notes / References

<a name="Ref1">[1]</a> Here we refer to the definition of "object" in the context of *Object-Oriented Programming*:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 1198]  
which differs from the definition of "object" given in:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Elements of Programming](http://www.elementsofprogramming.com/) by Stepanov and McJones [2009, page 4]  
This last definition is preferred by the author of the blog. If it is not specified, the reader must assume that I am talking about the definition given by Stepanov.

<a name="Ref2">[2]</a> This is a simplified definition, for a more detailed definition refer to:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, page 174]

<a name="Ref3">[3]</a> [The Java Language Specification (Java SE 8 Edition)](https://docs.oracle.com/javase/specs/jls/se8/jls8.pdf), Chapter 8 [pages 191, 192]

<a name="Ref4">[4]</a> [ISO International Standard ISO/IEC 14882:2014(E) – Programming Language C++, current working draft (at Aug, 2015)](http://open-std.org/JTC1/SC22/WG21/docs/papers/2015/n4527.pdf), sections: 9.3 [class.mfct] and 8.3.5 [dcl.fct]  

<a name="Ref5">[5]</a> There is almost no bibliography available about Simula, but [here](http://www.edelweb.fr/Simula/) you can find an excellent collection of old manuals.

<a name="Ref6">[6]</a> [ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft](http://smalltalk.org/versions/ANSISmalltalk/ANSISmalltalkStandard_v1.9_199712_NCITS_X3J20_draft.pdf), Section 3.1 [page 9]

<a name="Ref7">[7]</a> Smalltalk-72 Instruction Manual by Adele Goldberg and Alan Kay [page 44]

<a name="Ref8">[8]</a> [The Smalltalk-76 Programming System. Design and Implementation](https://classes.soe.ucsc.edu/cmps112/Spring03/readings/Ingalls78.html)

<a name="Ref9">[9]</a> Specified in:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Object-Oriented Software Construction (2nd Ed) by Bertrand Meyer [1997, pages 174, 175]  
and:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Standard ECMA-367. Eiffel: Analysis, Design and Programming Language. 2nd edition (June 2006)](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-367.pdf), Section 8.5.10 [page 38]  

<a name="Ref10">[10]</a> [Python 2.7.10 Documentation](https://docs.python.org/2/download.html)

<a name="Ref11">[11]</a> [A Brief Timeline of Python](http://python-history.blogspot.com.ar/2009/01/brief-timeline-of-python.html)

<a name="Ref12">[12]</a> [The History of Java Technology](http://www.oracle.com/technetwork/java/javase/overview/javahistory-index-198355.html)

<a name="Ref13">[13]</a> On the popularization of languages, one of the sources on which I rely is [Tiobe Index](http://www.tiobe.com/index.php/content/paperinfo/tpci/index.html). Although I have some doubts about the measuring method, Tiobe it is the best we have today.  
The other source is my memory. I do not remember Python as a popular language in the 90's.  
I think Python starts to become popular with the boom of dynamic languages ​​in the early 2000's and it had an even greater impetus to the creation of the [Django web framework](https://en.wikipedia.org/wiki/Django_(web_framework)).

<a name="Ref14">[14]</a> [Repository of older versions of Python](https://www.python.org/ftp/python/src/)

<a name="Ref15">[15]</a> [Standard ECMA-334. C# Language Specification. 4th edition (June 2006)](http://www.ecma-international.org/publications/standards/Ecma-334.htm), Section 8.7.3 [page 34]

<a name="Ref16">[16]</a> Objective-C has neither a standard nor a specification. The only "formal" documentation I could find was a website:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Programming With ObjectiveC](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)

<a name="Ref17">[17]</a> For documentation on [FORTRAN](http://www.softwarepreservation.org/projects/FORTRAN/), [ALGOL](http://www.softwarepreservation.org/projects/ALGOL/) and C: [ISO/IEC JTC1/SC22/WG14 - The international standardization working group for the programming language C](http://www.open-std.org/JTC1/SC22/WG14/).