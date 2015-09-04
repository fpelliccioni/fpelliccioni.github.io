---
layout: post
title:  "What your Programming Language has to offer?, part 1: Introduction"
date:   2014-10-30 12:00:00
comments: true
tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming]
---

This new series is closely related to ["Writing min function"]({% post_url 2014-05-20-writing-min-function-part1 %}), because we will see how to implement min and max in some programming languages.  
But, don't get confused, the purpose of the following articles is not to focus on min and max, but to analyze how good is a programming language for writing **Components**. *** [1]

What is a Component? [Click here if you want to know the answer.]({% post_url 2014-10-28-components-programming %})  

### Choosing a programming language

I believe there are two factors (at least) that cause programmers make mistakes when choosing a programming language: *habits* and *fanaticism*.  
Let me explain it.

All high-level programming languages ​​(or at least some of them) have been created with some design goals in mind [XXX].  
In some cases these design goals are well documented. ***2

A programming language can include one or many desirable properties, like: reliability, readability, high productivity (rapid development), simplicity to learn, flexibility, portability, efficiency, etc.

Also, programming languages ​​can be better or worse suited to different kinds of needs:

- Web development
- Mobile development
- Numeric and scientific computation
- System programming (operating systems, device drivers, etc..)
- Components programming  
and so on...

There is no single programming language ideal for every task.  
You, as a programmer, should be able to choose the appropriate programming language to a certain need/task.
I know that learning a programming language is tedious, and once we have learned one we tend to use it for everything.  
But, be careful not to fall into the arms of the called "Law of the instrument":

   *"if all you have is a hammer, everything looks like a nail"* [1]

I believe that in this modern world we can observe a very common phenomenon: The **fanaticism** for programming languages​​.  
People (I include myself) react with the same degree of fanaticism to programming languages discussions than to religious or political discussions. [B]  
Fanaticism blinds us and affects our decision to choose the right programming language.  
This is the thought of the fanatic: 'I will always choose my favorite programming language and the desicion criteria will be modified to favor it over others'.

There is no programming language that is perfect for everything. You have to choose your language acording to your needs.

### Programming language for writing Components


Since I took my first steps as a programmer I was always interested in writing **components**, rather than specific applications.  
At that time I didn't understand as now, but I was sure that I didn't like to program applications for particular domain, I wanted to program reusable components that could be used by other programmers, the application programmers.



So, in the following articles I want to test several programming languages to determine which ones are good for **Components Programming**.  
I'll start writing the functions min and max, later I'll do the same process with other algorithms.

### Evaluation Criteria

1. Is the algorithm included in the standard library of my language? [X]
    Yes: go to 2  
    No:  go to 3

2. How good the algorithms are?  
In general, for algorithms (and data structures too), I want to analyze the following:  

- Genericity: Does the algoritm expressed in a general way (usage with built-in and user-defined types)
- Efficiency: Is the implementation efficient? Is it relatively or absolutely efficient?
- Specification: Are the syntactic and semantic requirements on values and type specified?
Preconditions  
Postconditions  
Class invariants  
Complexity: time and space (memory consumption) complexity specifications  
            big-O and exact number of different computations
Where specifications are written? In a Standard, in a web page?


And, in particular for min and max, I want to analyze the following:  
Stability  
Natural and Unnatural ordering supported  
Usage with mutable and immutable objects



XXX or the functions don’t meet our needs

3. how good is the programming language to implement them on our own?

- La libreria estandar del lenguaje incluye el algoritmo en el cual estoy interesado:
    Si: 




The abstractions facilities  
Abstraction facilities provided by some programming languages ​​make the loss in performance  
expensive abstractions






Abstractions
big-O




























### Disclaimer

I want to make some clarifications:

- Don't take this work as a language war.
- I am not an expert in all programming languages, so I appeal to the reader care to give me a hand with corrections.
- These tests serve to determine which programming languages ​​are suitable for *Components Programming*. This doesn't mean that if a language is not good for programming components it is also a bad language for (for example) Web application development. Nor this doesn't mean that a language is worse than the other. I am only concerned with the programming of components, if you want to compare languages ​​with another criteria, then you could do it.




Acknowledgments

References








---

## The Series

&nbsp;&nbsp;&nbsp;[Part 1: Introduction]({% post_url 2014-11-10-what-has-to-offer-part1 %})  


---

## Notes

[A] For those who were not satisfied with current implementations of min and max, I say, I have not forgotten that there are still some things***1 to discuss, but we will see them later.

    Although our 2-arguments min and max functions are **complete and correct**, there are some topics remain to be seen. 

    Try to avoid branching (???)  
    Problems with floating points (IEEE 754) [X]  [X] Point to IEEE 754 Standard  ***
    Compare generic min/max functions with handwritten machine code  
    Implement min and max functions where the number of arguments is greater than 2.  
    Implement min and max functions for a sequence of arguments. (A sequence, like an array of elements or a linked list)  
    Implement minmax: a function that returns the minimum and the maximum elements of a sequence.  
    Implement min_and_second_min for a sequence of elements. Which returns the smallest and the second smallest element in the sequence. Same for max_and_second_max.

 
[XXX] High-level programming language = no machine code. Assembly languages also has a "design goal", write machine code.


[B] By this I don't mean that some kind of fanaticism is better than the other, fanaticism is bad, always.

## References



!!!! I believe this is the best book where the design decisions of a language is documented. It is a unique book, I recommend it.
    The Design and Evolution of C++ Paperback – April 8, 1994
    by Bjarne Stroustrup  (Author)
    http://www.amazon.com/The-Design-Evolution-Bjarne-Stroustrup/dp/0201543303/




[1] Variant of phrase said by Abraham Maslow, know as the "Law of the instrument"
The Psychology of Science: A Reconnaissance, by Abraham H. Maslow (1966). [page 15]
http://en.wikipedia.org/wiki/Law_of_the_instrument
http://www.amazon.com/Psychology-Science-Reconnaissance-Abraham-Maslow-ebook/dp/B0010K9F1O/



<a name="Ref1">[1]</a> Notes on Programming by Alexander Stepanov [2007, Pages 61-62]  
<a name="Ref2">[2]</a> Note the use of the [Conditional operator](http://en.wikipedia.org/wiki/%3F:)




















-------

OLD


This is a new article series, called "What your Programming Language has to offer?".  
It is closely related to the "Writing min function" series, in fact, this new series can be considered as a continuation of the old one.
In this series we will see how to implement min and max in some programming languages. 
But I wanted to start from scratch with a new series because I want to emphasize that the purpose of the following articles is not to focus on min and max functions, but to analyze how good is each programming language for implementing simple things.



In the future, I would like to review some of the outstanding issues***1 regarding min and max; but for now I want to change the focus.

The purpose of this series is not to focus on min and max functions, but to analyze how good is each programming language is to implement simple things.


My idea is not to teach how to use each programming language, but to analyze how good is each programming language for implementing algorithms generally and efficiently.


Although we have some unresolved issues***1 regarding min and max, I prefer temporarily ignore these issues and see how to implement min and max in different programming languages. 
My idea is not to teach how to use each programming language, but to analyze how good is each programming language for implementing algorithms generally and efficiently.




Although everything in this world is questionable, I think that these design choices should not be.


    - I don't want to get into a language war


one can build general purpose components with any Turing-complete programming language, this is the reason why efficiency is mentioned and is very important.





I believe that in today world there is a phenomenon, somewhat unpleasant, which influences the choice of programming language: **Fanaticism**.  



Think, we have become fans of the programming languages ​​we use. No comments!  
T-shirts, merchandising with legends related to programming languages ​​as if they were rock bands. I really do not understand.


### Choosing the right programming language
















Whether min, max or any other algorithm, I am interested to know:

Are the min and max functions included in the standard library of my language? [X]
If the answer is yes, then, how good they are?
If the answer is not, or the functions don’t meet our needs, we want to evaluate how good is the programming language to implement them on our own?

What are the desirable characteristics for our algorithms?




In general, for all algorithms (and data structures too), I want to analyze the following:  
Genericity  
Specification  
Efficiency

And, in particular for min and max, I want to analyze the following:  
Stability  
Natural and Unnatural ordering supported  
Usage with mutable and immutable objects


Genericity:  
How Generic is the algorithm?  
Does it work for built-in types?  
Does it work for user-defined types?

Specification:  
Syntactic requirements on types  
Semantic requirements on types  
Semantic requirements on values:  
Preconditions  
Postconditions  
Class invariants  
Complexity: time and space (memory consumption) complexity specifications  
Where specifications are written? In a Standard, in a web page?



Efficiency:  
You can make your algorithm work for a large family of types, but, if the increase in genericity comes at the cost of a detriment on efficiency, then your algorithm is not generic.

Generic programming is the process of abstracting from concrete algorithms to obtain generic algorithms maintaining efficiency of concrete implementations.

If it is impossible to you to maintain the efficiency of the generic algorithm (compared to the actual implementation of the algorithm), then maybe you're using a programming language not suited for Component Programming.


We note that here the term Genericity implies efficiency, so we could consider both as one.



