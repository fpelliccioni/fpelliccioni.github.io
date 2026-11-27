---
{
  "title": "C++26 and Contracts: What Búzios Left Me With",
  "url": "/cpp26-contracts-what-buzios-left-me-with/",
  "lang": "en",
  "date": "2026-11-27T12:00:00+01:00",
  "type": "post",
  "published": true,
  "comments": true,
  "tags": ["c++", "c++26", "wg21", "iso", "contracts", "gcc", "governance"],
  "translationKey": "cpp26-contracts-what-buzios-left-me-with",
  "description": "For the first time, the international ballot rejected the draft of a C++ edition. In Búzios the committee kept Contracts and approved a second attempt. What happened, and why I want Contracts in C++26.",
  "topic": "C++ / WG21"
}
---

On October 23, something happened that had never happened to C++ before: the international ballot rejected the draft of a new edition of the standard. The edition was C++26, and a large share of the objections targeted a single feature, Contracts. A month later, in Búzios, the C++ committee decided to keep Contracts, made one concrete change to it, and approved sending the text to a second ballot.

The rejection frustrated me a lot. I want to tell you what happened and, above all, why I think Contracts belongs in C++26.

## What happened

WG21 is the ISO and IEC working group that develops the C++ standard. It is what we usually call “the committee.” In March, in Croydon, the group voted 114 in favor, 12 against, with three abstentions, to send the complete text of C++26 to an international ballot. Contracts had been part of that text since February 2025. [C++ working group](https://www.open-std.org/jtc1/sc22/wg21/) · [Croydon minutes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/n5040.pdf)

At that stage the text is called a DIS (*Draft International Standard*), and the people who attend the meetings no longer vote. The national standards bodies (*National Bodies*) vote, one per country. It is the last step before an edition is published, and until now it had been close to a formality: every previous C++ DIS had been approved unanimously.

Not this time. The ballot closed on October 23 and the national bodies did not approve the draft. The objections were concentrated on Contracts, but the rejection held up the entire edition, along with everything else C++26 brings. [Ballot result](https://train-it.eu/blog/cpp26-contracts-the-ballot-result/)

In November, in Búzios, the committee went through the comments that came with the votes. A motion, that is, a formal proposal, was made to remove Contracts. It did not get the support it needed. A change that answers one of the objections was approved, and I explain it below. In plenary, the session where the whole group meets, the committee voted 111 in favor, nine against, with eight abstentions, to send the revised text out again. The decision is back in the hands of the national bodies. [Búzios agenda](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/n5058.html) · [Meeting report](https://herbsutter.com/2026/11/21/c26-is-done-again-trip-report-november-2026-iso-c-standards-meeting-buzios-brazil/)

## What a contract is for

Every function has a contract, even when it is not written in the code. A **precondition** is what must hold when you call it. A **postcondition** is what the function guarantees when it returns, provided the call held up its side. Today that contract lives in the documentation, in a comment, or in the head of whoever wrote the function.

One example from the standard library is `std::lower_bound`, a binary search. In a sorted list it finds where a value would have to be inserted. If we look for `5` in `[1, 3, 8]`, it returns the position of the `8`. Its specification says two things. The precondition is that all the elements less than the value we are looking for come before the rest. The postcondition is that the result marks exactly the boundary between those two groups. [Specification of `lower_bound`](https://eel.is/c++draft/lower.bound)

What happens today if we call `std::lower_bound` on an unsorted list? Nothing visible. The function returns a position that means nothing and the program carries on. The error shows up much later, far from the call that caused it.

With Contracts, those two conditions are written in the declaration, with `pre` and `post`. This is a simplified version, for integers only, that is enough to show the idea:

```cpp
std::vector<int>::const_iterator
lower_bound(const std::vector<int>& v, const int value)
  // What it requires: the elements less than `value` come before the rest.
  pre(std::ranges::is_partitioned(v, [&](int e) { return e < value; }))
  // What it guarantees: everything before the result `r` is less...
  post(r: std::all_of(v.begin(), r, [&](int e) { return e < value; }))
  // ...and nothing from `r` onward is.
  post(r: std::none_of(r, v.end(), [&](int e) { return e < value; }));
```

Now the contract is code. The compiler sees it, tools see it, and so does anyone reading the declaration. Three different uses come out of that same information.

**Checking at run time.** If we run the tests with contracts turned on and someone calls the function with an unsorted list, the program stops at that call and points to the precondition that failed. The error that used to show up far away now shows up at its source.

**Knowing whose bug it is.** If a precondition fails, the problem is in the caller. If the call was valid and a postcondition fails, the problem is in the function's implementation. That distinction, which today costs hours of debugging, is settled in the message.

**Testing without writing every case.** Postconditions say what a correct result is for any valid input. We can generate thousands of random sorted lists, search for random values, and let the contract verify each result. There is no need to write out the expected answer for each case by hand.

There is a fourth use, and it is the one that excites me most in the long run: **static analysis**. If the code says what one function guarantees and what the next one requires, a tool can try to prove, without running anything, that a call is valid. And if it cannot, it points to where a check is missing.

One important detail: checking that a list is sorted costs more than the search itself. Nobody wants to pay that in production on every call. That is why C++26 lets you choose at build time what happens with each contract: check it and terminate the program if it fails, check it and only report, or ignore it. The same code is tested with everything on and shipped with whatever each project decides. [P2900R14](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2900r14.pdf)

That flexibility was precisely one of the points under discussion. Some conditions should always be checked, with no build option able to turn them off. The change approved in Búzios answers that: it lets you mark in the code a condition that is always checked and, if it fails, the program does not continue past that point. [Approved proposal on mandatory checks](https://github.com/cplusplus/draft/issues/9399)

## It is not perfect

Does the Contracts design in the draft have flaws? Surely. There are decisions I would have made differently.

But C++ is more than forty years old. Everything added to it has to live with earlier decisions and with an enormous amount of code that already works. No new feature comes out of that process clean, and the standard has several whose design convinces me a good deal less than this one. Contracts carries many years of work and of earlier attempts. I think what is in the draft is the best that can be done today on the language we have, and it is a solid base for starting to use contract programming and improving it with experience.

Waiting for C++29 would not make it perfect. It would only push back by three more years the moment we start learning from real code.

## Why it frustrated me

Some objections deserved attention, and the Búzios change shows they could be addressed without removing anything. Others did not seem to me reason enough to pull the whole feature, much less to hold up the entire edition.

My personal impression is that politics weighed in the rejection too, alongside the technical arguments. I cannot prove it, and I do not know how much it influenced each vote. But an unprecedented rejection, at the last stage, of a text the committee had approved by a wide margin, left me with that feeling, and I did not like it.

## Before the second ballot

I prefer to stay with what happened next. The committee listened to the objections, changed what made sense to change, and backed the text again by a wide margin, with Contracts in it. The draft going back to the national bodies is better than the one they rejected.

That gives me reason to expect a different result. I hope the second ballot confirms that the rejection was a stumble and that C++26 ships with Contracts.
