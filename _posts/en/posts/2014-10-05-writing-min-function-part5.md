---
layout: post
type: post
title:  "Writing min function, part 5: Stabilizing the algorithm"
date:   2014-10-05 12:00:00
comments: true
tags: [components, programming, components programming, componentsprogramming, stepanov, knuth, stroustrup, generic, genericprogramming, generic programming, genericity, concepts, math, mathematics, elements, eop, contracts, performance, c++, cpp, c, java, dotnet, c#, csharp, python, ruby, javascript, haskell, dlang, rust, golang, eiffel, templates, metaprogramming]
---

This is the fifth article of the series called *"Writing min function"*.

Finally I will address the last pending issue.  
To see the importance of the point I want to show to you, we have to write another function of our API, the *max function*.  
This issue is not related to C++, you could be see it in the implementation of the *min*/*max* functions of any programming language. Because of that, I want to go back to pseudo-code.  
So, let’s take *min* written in pseudo-code and adapt it to write *max*.

{% highlight cpp %}
// Requires:
//       a and b are of the same type, here called T,
//  and, T models TotallyOrdered
min(a, b) {
    if (a < b) return a
    return b
}

// Requires:
//       a and b are of the same type, here called T,
//  and, cmp models StrictWeakOrdering on T
min(a, b, cmp) {
    if (cmp(a, b)) return a
    return b
}
{% endhighlight %}

Now, it easy to write the *max* function:

{% highlight cpp %}
// Requires:
//       a and b are of the same type, here called T,
//  and, T models TotallyOrdered
max(a, b) {
    if (a < b) return b
    return a
}

// Requires:
//       a and b are of the same type, here called T,
//  and, cmp models StrictWeakOrdering on T
max(a, b, cmp) {
    if (cmp(a, b)) return b
    return a
}
{% endhighlight %}


*Min* and *max* are almost the same, the only difference resides at the two return clauses.

Now, to see the problem, let’s write some usage code:

{% highlight cpp %}
usage_with_employees() {
    e1 := employee {1, "John", 5000.0}
    e2 := employee {2, "Peter", 6000.0}
    e3 := employee {3, "George", 4500.0}
    e4 := employee {4, "Frank", 5000.0}

    min_e1 := min(e1, e2, salary_comparator{})
    max_e1 := max(e1, e2, salary_comparator{})
    min_e2 := min(e1, e4, salary_comparator{})
    max_e2 := max(e1, e4, salary_comparator{})

    print(min_e1.name) //#1
    print(max_e1.name) //#2
    print(min_e2.name) //#3
    print(max_e2.name) //#4
}
{% endhighlight %}

According to the code above, what will be printed by the lines marked as #1, #2, #3 and #4?

Let’s analyze it:

- min_e1 is the employee with lower salary between e1 and e2. Because 5000 (John salary) is less than 6000 (Peter salary) then e1 is the *min* employee, so in #1 “John” will be printed. Trivial case.

- max_e1 is the employee with higher salary between e1 and e2. Doing a similar analysis, in #2 “Peter” will be printed. Another trivial case.

- min_e2 is the employee with lower salary between e1 and e4. But, in this case both salaries are equal, so, what will be printed?
  Well, according to the implementation of our *min* function, in case of equality (or equivalence) the second return clause will executed, so, in this case "Frank" will be printed for #3.

- max_e2 is the employee with higher salary between e1 and e4. Doing a similar analysis, in #2 “John” will be printed.

Let's focus on the last two cases, where we have the equal or equivalent objects.
Are our *min* and *max* functions correct?  
What should they return in that case?

You might wonder:  
“Why worry about returning one or another object if both are equal?”  
In mathematics, this question makes sense, because for example, in the set of Natural numbers, 14 is equal to 14, indeed they are **identical**, so in:

{% highlight cpp %}
min(14, 14)
{% endhighlight %}

returning the first 14 or the second 14 does not matter, because they are the same number.

But, in computer science we deal with things that reside in memory (objects). In a computer I can represent, for example, the chair where I'm sitting now. My chair maybe **is equal to** the chair next to me, but for sure they are not the same chair, they are not **identical**.  
So, in cases like this, it is important to distinguish exactly what to return.

Let's look at what options we have for returning in case of equality of the objects:

1. *min* returns a and *max* returns a
2. *min* returns a and *max* returns b
3. *min* returns b and *max* returns a
4. *min* returns b and *max* returns b

Our *min/max* functions fall in the case number 3. But... why? Have we consciously designed in that way?  
Which of these options is more correct?

The 1st case looks good, both functions returns the same object in case of equality, the left-hand object. Sounds consistent.  
The 4th function too, both functions returns the same object, but... they are returning the right-hand object... hmm, at least to me, it seems a bit odd.  
The 3rd case sounds more illogical still.

But, what about the case 2?

The answer here lies in the concept of **stability**.  
Surely you know the property of *stability* from algorithms such as *sort*.  
An *stable algorithm* preserves the relative order of equivalent objects.

But, what have to do *stability* and sorting with *min* and *max*?  
*“To see it, let us implement another function that could be done with two objects and a strict weak ordering on them, namely, a sorting function”* [[1]](#Ref1)

{% highlight cpp %}
// Requires:
//       a and b are of the same type, here called T,
//  and, T models TotallyOrdered
sort_2_wrong(ref a, ref b) {
    if (!(a < b)) swap(a, b)
}
//Note: ref if used for passing by reference
//Note: the swap function exchanges the values a and b.
{% endhighlight %}

*sort_2_wrong* has two problems:

- it does more work than necessary, because equivalent objects are swapped
- it is not *stable*, because the relative order of equivalent objects is not preserved.
                    
*“Stability is an important property, and we should not abandon it without necessity. As a matter of fact, it is trivial to fix the problem by performing the swap only when the second object is strictly less than the first”* [[1]](#Ref1)
                
{% highlight cpp %}
// Requires:
//       a and b are of the same type, here called T,
//  and, T models TotallyOrdered
sort_2(ref a, ref b) {
    if (b < a) swap(a, b)
}
{% endhighlight %}
Now, we can see that there should be a relationship between *min*, *max* and *sort_2*: after we sort two elements, the first one should be the *minimum* and the second one should be the *maximum*.

{% highlight cpp %}
// Type Requirement:
//            a and b are of the same type, here called T,
//       and, T models TotallyOrdered
// Postcondition: 
//       a = min(a, b) and b = max(a, b)
sort_2(ref a, ref b) {
    if (b < a) swap(a, b)
}
{% endhighlight %}

In the code above, note the specification of the postcondition written as a comment:

{% highlight cpp %}
a = min(a, b) and b = max(a, b)
{% endhighlight %}

But this postcondition never holds. Our *min* function returns the second object and our *max* function returns the first one when both objects are equivalent.  
We need to make *min* and *max* *stable* [[2]](#Ref2): 

{% highlight cpp %}
// Requires:
//       a and b are of the same type, here called T,
//  and, T models TotallyOrdered
min(a, b) {
    return b < a ? b : a
}

// Requires:
//       a and b are of the same type, here called T,
//  and, cmp models StrictWeakOrdering on T
min(a, b, cmp) {
    return cmp(b, a) ? b : a
}

// Requires:
//       a and b are of the same type, here called T,
//  and, T models TotallyOrdered
max(a, b) {
    return b < a ? a : b
}

// Requires:
//       a and b are of the same type, here called T,
//  and, cmp models StrictWeakOrdering on T
max(a, b, cmp) {
    return cmp(b, a) ? a : b
}
{% endhighlight %}
                        

You could argue, "*Stability* is not a property of the *min* (or *max*) function, according to its definition. So, if we add *stability* to *min*, it will become something else, other than *min*”

Thoughts like this are wrong.  
The first thing you have to think is: What is the definition of *min*?  
Remember, this is Computer Science, we deal non-identical things.

Think!. What are our options?  
There are three ways a library can implement *min*:

1. Random
2. Anti-Stable
3. Stable

The *random* way is obviously crazy and expensive.  
The *stable* way is more useful and as efficient as the *anti-stable* one.

So, what would you choose?

Whatever your decision, you must **specify** (document) in your library/API the behavior of *min* (and *max*) in case of equality (or equivalence) of its arguments.  
Do not make me guess or have to look at the implementation details of your API to discover the behavior!  
This would be wrong, for sure.

We will see in the following articles some languages/libraries whose specification ​​is definitely wrong.

**Conclusion**: Make *min* and *max* functions **stable**, and so **consistent** with the other functions of your API.  
**Specify** their behavior in the library documentation.


---

## The Series

&nbsp;&nbsp;&nbsp;[Part 1: The rise of Concepts]({% post_url en/posts/2014-05-20-writing-min-function-part1 %})  
&nbsp;&nbsp;&nbsp;[Part 2: Understanding Concepts]({% post_url en/posts/2014-05-28-writing-min-function-part2 %})  
&nbsp;&nbsp;&nbsp;[Part 3: Weakening the ordering]({% post_url en/posts/2014-07-15-writing-min-function-part3 %})  
&nbsp;&nbsp;&nbsp;[Part 4: Const-Correctness]({% post_url en/posts/2014-09-24-writing-min-function-part4 %})  
&nbsp;&nbsp;&nbsp;[Part 5: Stabilizing the algorithm]({% post_url en/posts/2014-10-05-writing-min-function-part5 %})  


---

## References

<a name="Ref1">[1]</a> Notes on Programming by Alexander Stepanov [2007, Pages 61-62]  
<a name="Ref2">[2]</a> Note the use of the [Conditional operator](http://en.wikipedia.org/wiki/%3F:)
