---
layout: post
type: draft
title:  "Components Programming"
date:   2014-10-28 00:00:00
comments: true
tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming]
---

As you may have noticed, *Components Programming* is the name of [this blog](http://componentsprogramming.com/).  
And perhaps you're wondering, what *Components Programming* means?

It is convenient to clarify it now, since, in upcoming articles I want to test several programming languages to determine which ones are good for *Components Programming*.

So, what *Components Programming* means?  
What is a **Component**?

No one better than [Alex](http://www.stepanovpapers.com/) to explain it:

"*One view of a Component is: you take a piece of code, ripped out something, and this is a Component.  
Let me tell you: No, it is not a Component.  
It's like, if you rip a piece of meat out of my leg. It's not a functioning component, it's a pound of flesh.*

*A __Component__ is something which solves a problem in a general way. It is something which is not specific, and then could be used by all the applications which needs this particular problem being solved.*

*A programming language is suitable for __Component Programming__ if it satisfies the following conditions:*

1. *It could describe a general purpose components*.  
2. *Without losing efficiency*

*The second condition is very, very important, because, obviously in any language you could construct anything. As long as your language is Turing-complete you could describe just about anything... but might be very, very slow.  
There are many languages which claim to possess powerful abstraction facilities. But if you start using these facilities everywhere, for example:*

   *From now on in my language I no longer use int32 I just going to use Integer*

*Guess what?  
If you start doing it your performance is going to collapse.  
It's not just going to be slow, you are going to be slow compared with stuff written this language without using abstractions.*
 
*That is, efficiency is a two-fold efficiency:*

- *A component is __relatively efficient__ is when instantiated it's as fast as a code (non-generic / hand-written) written in the same programming language.*
- *A component is __absolutely efficient__ is when instantiated it's as efficient as anything that could be done on a given machine, basically, as fast as assembly language.*

*So I want a language that allows me __Generality__ and __Absolute Efficiency__.  
That is, I can program as general as a like, that is I could talk about things like Monoids and Semigroups. And on the other hand, when the code compiles I could look at assembly code and say 'this is good!'*

*Now, we get to an interesting question.  
How do we know that a language is powerful enough to do that?*

*Long time ago I came up with a test whether your language is good enough.  
And you could come up with the following thing 'If you could implement a major operating system then the language is good enough'.  
It is a hard test, you obviously don't know whether you implemented in a general way or not.*

*So I came with a very, very simple test, and I claim this test which allows me (I still use it) to determine whether a language is suitable for what I want to do or not.*

*There are three programs which I need to implement in a general way to know that a language is suitable. These three programs are:*

- *__swap__: the program which takes two things, and swaps.*
- *__min__: the program which takes two things, and figures out which one is smaller.*
- *__linear search__: the program that goes through bunch of stuff and finds whatever.*

*You could say 'Well Alex, are these too simple?’  
Well, if we cannot do simple things, it is very unlikely that we will be able to do hard things.  
I want to see solutions to simple problems.  
People always thing that exiting thing has to be very complicated.  
I claim exiting things tend to be very simple and basic.*

*So, every time you want to come to me and say 'Alex why don't we use a new language'.  
My answer is: 'Three programs. Go, try implementing them in your favorite language. When you do them in a __general__ way, and at least __relatively efficient__, then, let us talk'.*"

Well, now we know what a **component** is and how to test if a programming language is suitable for **Components Programming**.  
We will begin the test in the upcoming articles.

Stay tuned.


---

## References


[[1] Efficient Programming with Components: Lecture 4, Part 1](http://youtu.be/4pSqzrbjq4Q)
