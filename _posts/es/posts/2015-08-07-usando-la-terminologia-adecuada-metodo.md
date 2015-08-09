---
layout: post
title:  "Usando la terminología adecuada: ¿Método?"
date:   2013-08-05 12:00:00
comments: true

# description: "Portland in shoreditch Vice, labore typewriter pariatur hoodie fap sartorial Austin. Pinterest literally occupy Schlitz forage."
category: spanish

tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming, book, fmgp]
---



En esta serie de artículos mi intensión es revisar por qué los programadores usamos cierta terminología, ciertas palabras, algunas de las cuales considero inadecuadas.  
En este caso quiero hablar sobre la palabra _método_ (_method_ en inglés).

Antes que nada...

## ¿Qué es un _método_?

(En el contexto de la programación, obviamente)
Cualquier programador moderno sabe que un _objeto_ tiene _estado_ y _comportamiento_.
El estado se almacena en _campos_ (_fields_ en inglés) y el comportamiento se logra a través de _métodos_.

Ejemplo en pseudo-código:

{% highlight cpp %}
class empleado {
  sueldo : real

  trabajar() {
    //...
  }
}
{% endhighlight %}

En el ejemplo de arriba, un empleado tiene un sueldo (estado) y realiza acciones, como "trabajar" (comportamiento). "trabajar" es un _método_.
El método trabajar no tiene código, pero si lo tuviese, el código sería <span class="underline">una secuencia de acciones con el fin de lograr cierto objetivo</span>, en este caso... trabajar :)

Recuerdo que cuando mi padre me enseño a programar, hace casi 30 años, no me enseñó lo que es un método, él no usaba esa palabra y supongo que la mayoría de los programadores de la época tampoco la usaban.
usaba la palabra "metodo" y de repente ahora es muy común.
Pero, antes de continuar con mi conjetura, me gustaría repasar (muy burdamente) sobre teoría de objetos.

Algunos de mis colegas, más que nada colegas con background en Java o .Net suelen usar esta palabra, como por ejemplo: "Escribí un método que tome una fecha y retorne un string con el nombre del día".
Yo me pregunto: ¿Por qué decimos "metodo" y no utilizamos otra palabra como "procedimiento", "función", etc?







O sea, un método es un procedimiento, funcion, routine, subroutine, pero que está incluido dentro de una clase en particular.
>>> O sea, un método es una serie de instrucciones, a las que se les pone un nombre.

Java y C# copian gran parte de su sintáxis y terminologia (glosario) de C++ (no así la semántica).
Pero en C++ no se usa el termino Method, sino que al comportamiento de los objetos se los codifica usando Member Functions.
(Al estado de los objetos se lo almacena en Data Members)
C++ es un lenguaje que soporta el paradigma de objetos, pero desde el nacimiento de C++, este no está atado a un solo paradigma.
C++ hereda de C el paradigma de programación estructurada, o sea, C++ es un lenguaje multi-paradigma, por lo tanto, permite la creacion de funciones, tanto dentro de una clase como fuera de ella. A las funciones que son creadas fuera de una clase se las suele llamar Non-Member Functions o Free Functions.

Más allá de esto, el termino "Method" se ha popularizado de tal forma que si dicen "metodo" cualquier programador C++ sabe de que estás hablando.

¿Por qué Java y C# no adoptaron la misma terminologia que C++? (En lo que respecta a comportamiento de objetos)

Bueno, C# borrowed a lot from Java, así que la pregunta sería, ¿Por qué Java no adoptaró la misma terminologia que C++?
(
  Al margen: mas alla de que C# en sus comienzos era casi identico a Java, en ciertas cuestiones toma un camino separado a Java y quizás más cercano a C++, por ejemplo:
    - No todos los métodos son virtuales
    - In C# a parent and child classes are named Base and Derived clases, respectively (like in C++, see D&E of C++), but in Java are called Super and Sub classes.
 )
Eso es dificil de saber, habría que charlar con los creadores del lenguaje para saber el porqué de la nomenclatura.



Para saber que es un método, primero me gustaría explorar distintas fuentes para saber cual es el origen de esa palabra en el ámbito informático.


...............................................................
Procedure
Function
Routine
Subroutine
Feature
Method


FORTRAN
  FORTRAN was the first high-level programming language and the first high-quality optimizing compiler. 

  PROGRAM, FUNCTION, SUBROUTINE


  Statement function
  External function
  Subroutine


  "Method"



  Fortran STANDARs Committee
    http://www.nag.co.uk/sc22wg5/
  
  Fortran 66
    ftp://ftp.nag.co.uk/sc22wg5/ARCHIVE/Fortran66.pdf
  
  Fortran 77
    ftp://ftp.nag.co.uk/sc22wg5/ARCHIVE/Fortran77.html

  Fortran 90
    ftp://ftp.nag.co.uk/sc22wg5/N001-N1100/N692.pdf

  Fortran 95
    ftp://ftp.nag.co.uk/sc22wg5/N1151-N1200/N1191.pdf

  Fortran 2003
    ftp://ftp.nag.co.uk/sc22wg5/N1601-N1650/N1601.pdf

  Fortran 2008 (working)
    http://j3-fortran.org/doc/year/10/10-007r1.pdf


  http://www.softwarepreservation.org/projects/FORTRAN/

Algol
  
  ALGOL (short for ALGOrithmic Language)[1] is a family of imperative computer programming languages, originally developed in the mid-1950s, which greatly influenced many other languages and was the standard method for algorithm description used by the ACM in textbooks and academic sources for more than thirty years.[2]

  In the sense that most modern languages are "algol-like",[3] it was arguably the most successful of the four high-level programming languages with which it was roughly contemporary


  http://www.softwarepreservation.org/projects/ALGOL/

Simula
  Procedure          (ALGOL)
  function procedure (ALGOL)

  Parece que en SIMULA I un objeto (de OOP) es llamado Process

    slp-complete.pdf - Chapter 2 - page 10
    "It has its own local data and
    its own behaviour pattern.
    A system may contain several processes with a similar data
    structure and the same behaviour pattern. Such processes are
    said to belong to the same class, called an activity."" 

  SIMULA 67
    1. 3. 3 Classes

      A central new concept in SIMULA 67 is the "object".
      An object is a self-contained program (block instance)
      having its own local data and actions defined by a
      "class declaration". The class declaration defines a
      program (data and action) pattern, and objects conforming
      to that pattern are said to "belong to the same class".
      If no actions are specified in the class declaration,
      a class of pure data structures is defined.   


Smalltalk

  NCITS J20 DRAFT December, 1997 of ANSI Smalltalk Standard revision 1.9
  ANSI Smalltalk Standard v1.9 199712 NCITS X3J20 draft (PDF)


  A Smalltalk program is a means for describing a dynamic computational process. This section
  defines the entities that exist in the computational environment of Smalltalk programs.
  
  A variable is a computational entity that stores a single reference (the value of the variable) to an
  object.
  
  A message is a request to perform a designated computation. An object is a computational entity
  that is capable of responding to a well defined set of messages. An object may also encapsulate
  some (possibly mutable) state.
  
  An object responds to a message by executing a method. Each method is identified by an
  associated method selector. A behavior is the set of methods used by an object to respond to
  messages.
  
  A method consists of a sequence of expressions. Program execution proceeds by sequentially
  evaluating the expressions in one of more methods. There are three types of expressions:
  assignments, message sends, and returns.

CLOS

C

C++
  n3936.pdf

  9.3 Member functions [class.mfct]
  1 Functions declared in the definition of a class, excluding those declared with a friend specifier (11.3), are called member functions of that class. A member function may be declared static in which case it is a static member function of its class (9.4); otherwise it is a non-static member function of its class (9.3.1, 9.3.2).



Eiffel
  1. ECMA Standard
  2. BM - Object Oriented Software Construction vol.2



    Eiffel - Object-Oriented Software Construction (2nd Ed) - Bertrand Meyer

    Representing a
    point in
    cartesian
    coordinates


    Feature: Computation or Memory


    This example shows the need for two kinds of feature:
    • Some features will be represented by space, that is to say by associating a certain
    piece of information with every instance of the class. They will be called attributes.
    For points, x and y are attributes in cartesian representation; rho and theta are
    attributes in polar representation.

    • Some features will be represented by time, that is to say by defining a certain
    computation (an algorithm) applicable to all instances of the class. They will be
    called routines. For points, rho and theta are routines in cartesian representation; x
    and y are routines in polar representation.

    A further distinction affects routines (the second of these categories). Some routines
    will return a result; they are called functions. Here x and y in polar representation, as well
    as rho and theta in cartesian representation, are functions since they return a result, of type
    REAL. Routines which do not return a result correspond to the commands of an ADT
    specification and are called procedures. For example the class POINT will include
    procedures translate, rotate and scale.



Java

  Java Language Specification

    8.4 Method Declarations
    A method declares executable code that can be invoked, passing a fixed number of values as arguments.
    227
    8.4 Method Declarations
    CLASSES
    228
    MethodDeclaration:
    {MethodModifier} MethodHeader MethodBody
    MethodHeader:
    Result MethodDeclarator [Throws]
    TypeParameters {Annotation} Result MethodDeclarator [Throws]
    MethodDeclarator:
    Identifier ( [FormalParameterList] ) [Dims]
    The following production from §4.3 is shown here for convenience:
    Dims:
    
    The FormalParameterList is described in §8.4.1, the MethodModifier clause in §8.4.3, the TypeParameters clause in §8.4.4, the Result clause in §8.4.5, the Throws clause in §8.4.6, and the MethodBody in §8.4.7.
    The Identifier in a MethodDeclarator may be used in a name to refer to the method (§6.5.7.1, §15.12).
    It is a compile-time error for the body of a class to declare as members two methods with override-equivalent signatures (§8.4.2).
    The scope and shadowing of a method declaration is specified in §6.3 and §6.4.
    The declaration of a method that returns an array is allowed to place some or all of the bracket pairs that denote the array type after the formal parameter list. This syntax is supported for compatibility with early versions of the Java programming language. It is very strongly recommended that this syntax is not used in new code.

  Java Tutorials
    Software objects are conceptually similar to real-world objects: they too consist of state and related behavior. An object stores its state in fields (variables in some programming languages) and exposes its behavior through methods (functions in some programming languages). Methods operate on an object's internal state and serve as the primary mechanism for object-to-object communication. Hiding internal state and requiring all interaction to be performed through an object's methods is known as data encapsulation — a fundamental principle of object-oriented programming.

    https://docs.oracle.com/javase/tutorial/java/concepts/object.html

C#
  C# Specification
  C# ECMA Standard (ISO Standard)


  8.7.3 Methods
  A method is a member that implements a computation or action that can be performed by an object or class. Methods have a (possibly empty) list of formal parameters, a return value (unless the method’s return-type is void), and are either static or non-static. Static methods are accessed through the class. Non-static methods, which are also called instance methods, are accessed through instances of the class. A generic method (§25.6) has a list of one or more type parameters. The example

Python

  APPENDIX A - GLOSSARY

    method A function which is defined inside a class body. If called as an attribute of an instance of that class, the
    method will get the instance object as its first argument (which is usually called self). See function and
    nested scope.

    function A series of statements which returns some value to a caller. It can also be passed zero or more arguments
    which may be used in the execution of the body. See also parameter, method, and the Function definitions
    section.  


    6.1 Expression statements
    procedure
    (a function that returns no meaningful result; in Python, procedures return the value None).


Knuth - The Art of Computer Programming
      - Concrete Mathematics

Elements of Programming

Dijstra ?
Wirth ?


RAE
Britsh


Mathematics
  "asymptotic methods"
  "repertoire method"
  general method









Real Academia Espanola

  método.
  (Del lat. methŏdus, y este del gr. μέθοδος).
  1. m. Modo de decir o hacer con orden.
  2. m. Modo de obrar o proceder, hábito o costumbre que cada uno tiene y observa.
  3. m. Obra que enseña los elementos de una ciencia o arte.
  4. m. Fil. Procedimiento que se sigue en las ciencias para hallar la verdad y enseñarla.
  



...............................................................

{% highlight cpp %}
class employee {
  id: natural32
  other: natural32	
}

class test {
  a: natural32 := 0x88FF7799
  employees: array<employee> := { {0xA1B2C3D4, 0x11223344}, 
                                  {0x92817348, 0x96161728}, 
                                  {0x61592308, 0xa8857472 } }
  b: natural32 := 0x12345678
}

//program entry-point
main() {	
  tc := test{}
  // analyze memory here!
}
{% endhighlight %}



The program consists of a main function (entry-point) in which is created an object of type "test".  
The test class has three data members (or Fields, in order to use Java/C# jargons):

- a: it is 32-bits natural number (like C/C++'s uint32_t). It is set to 88FF7799 (base16)
- employees: it is a sequence of elements of type "employee".
             The employees sequence is filled with three elements.
- b: it is 32-bits natural number. It is set to 12345678 (base16)

The employee class has two data members:
- id: it is 32-bits natural number
- other: it is 32-bits natural number

Note: "array" is a data structure that stores elements contiguosly in memory.
	  The size of the sequence is dynamic, it is resizable.
	  Equivalents: C++ std::vector, .Net List<T>, Java ArrayList<T>		 

For example it is not necessary runtime polymorphism neither runtime type introspection (aka Reflection).
For simplicity all the data members are public.


Now, let's code in real programming languages:








C++ code

{% highlight cpp %}
#include <vector>
using namespace std;

struct employee {
  uint32_t id;
  uint32_t other;
};

struct test {
  uint32_t a {0x88FF7799};
  vector<employee> employees { {0xA1B2C3D4, 0x11223344}, 
                               {0x92817348, 0x96161728}, 
                               {0x61592308, 0xa8857472}};
  uint32_t b {0x12345678};
};

int main(int argc, char const* argv[]) {
  test t;
  // analyze memory here!
  return 0;
}
{% endhighlight %}



Java code: 

{% highlight cpp %}
import java.util.ArrayList;

class Employee {
  public int id;
  public int other;

  public Employee(int id, int other) {
    this.id = id;
    this.other = other;
  }
}

class Test {
  public int a = 0x88FF7799;
  public ArrayList<Employee> employees = new ArrayList<Employee>();
  public int b = 0x12345678;

  public Test() {
    employees.add(new Employee(0xA1B2C3D4, 0x11223344));
    employees.add(new Employee(0x92817348, 0x96161728));
    employees.add(new Employee(0x61592308, 0xa8857472));
  }
}

public class MainClass {
  public static void main(String args[]) {
    Test t = new Test();
    // analyze memory here!
  }    
}
{% endhighlight %}



C# code

{% highlight cpp %}
using System;
using System.Collections.Generic;

internal class Employee
{
  public uint Id;
  public uint Other;

  public Employee(uint id, uint other)
  {
    Id = id;
    Other = other;
  }
}

internal class Test
{
  public uint A = 0x88FF7799;
  public List<Employee> Employees = new List<Employee> {
    new Employee(0xA1B2C3D4, 0x11223344),
    new Employee(0x92817348, 0x96161728),
    new Employee(0x61592308, 0xa8857472) };
  public uint B = 0x12345678;
}

class Program
{
  static void Main(string[] args)
  {
    var t = new Test();
    // analyze memory here!
  }
}
{% endhighlight %}




I tried to write idiomatic code (as possible) in each of the languages.
I am not trying to be OO-purist.
I just tried to write the simplest code to later analyze the memory more easily.
Disclaimer: ....









References:

	.Net BCL System.Array class specification:
		https://msdn.microsoft.com/en-us/library/system.array%28v=vs.110%29.aspx

	.Net BCL System.Array class source code:
		http://referencesource.microsoft.com/#mscorlib/system/array.cs,1f52f2a267c6dbe7

	.Net BCL System.Collections.Generic.List<T> class specification:
		https://msdn.microsoft.com/en-us/library/6sh2ey19%28v=vs.110%29.aspx
		
	.Net BCL System.Collections.Generic.List<T> class source code:
		http://referencesource.microsoft.com/#mscorlib/system/collections/generic/list.cs,cf7f4095e4de7646


	Drill Into .NET Framework Internals to See How the CLR Creates Runtime Objects
		https://msdn.microsoft.com/en-us/magazine/cc163791.aspx


	Java ARTICLES
		https://www.yourkit.com/docs/kb/sizes.jsp
		https://wikis.oracle.com/display/HotSpotInternals/CompressedOops
		http://www.docjar.com/docs/api/sun/misc/Unsafe.html
		http://mishadoff.com/blog/java-magic-part-4-sun-dot-misc-dot-unsafe/
		http://java-performance.info/memory-introspection-using-sun-misc-unsafe-and-reflection/



