---
layout: post
type: post
title:  "C++26 Wraps Up: Notes from the Croydon WG21 Meeting"
date:   2026-04-05 12:00:00
comments: true
tags: [c++, cpp, c++26, wg21, iso, contracts, reflection, eiffel, design by contract, clang, gcc, components programming, componentsprogramming, generic programming]
description: "The ISO C++ committee wrapped up C++26 on March 28 in Croydon, UK. Around 210 people participated representing 24 nations. No more features, no more additions. C++26 is done."
---

<figure>
<img src="{{ site.url }}/images/wg21-2026-croydon.png" alt="WG21 group photo at the Croydon meeting, March 2026">
<figcaption>Photo credit: Herb Sutter</figcaption>
</figure>

The ISO C++ committee wrapped up C++26 on March 28 in Croydon, UK. Around 210 people participated (130 in person, 80 remote) representing 24 nations, resolving the last of 411 national body comments. From here the document goes to its final approval ballot. No more features, no more additions. C++26 is done.

This was my first in-person WG21 meeting. I've been a member since 2022 and attended remotely before, but I've followed the language's evolution since the C++0x era, when "0x" was becoming a running joke and nobody was sure it would ship. Being there for the closing of C++26 felt like the right moment to finally show up.

## Contracts: Approved, Debated, Divisive

Contracts made it into C++26. The final vote was 114 in favor, 12 opposed, 3 abstaining. That level of opposition is unusual for a feature at this stage, and the debate in the room was tangible.

My perspective on contracts comes from Eiffel and its Design by Contract philosophy. In that model, contracts are part of program semantics. A precondition violation means the caller has a bug. A postcondition violation means the callee has a bug. Responsibility is unambiguous, and violations are always bugs, never runtime situations to be handled flexibly.

C++ took a more configurable path. That's not necessarily wrong; C++ has always been a language of options. But the added flexibility comes at a visible cost in conceptual simplicity. The gap between what C++ calls "contracts" and the original Design by Contract philosophy is wider than I expected.

## Reflection: The Big One

If contracts were the most debated feature, reflection was the most transformative.

C++26 reflection enables compile-time introspection of types, members, and program structure, things that previously required external tooling or heavy template metaprogramming. GCC already has an implementation merged in trunk.

This changes what's possible inside the language. Not incrementally, but categorically. The way we write libraries, generate code, and express abstractions is going to look different. I think we'll be discovering new patterns around reflection for a long time.

## The Evening Session That Changed My Direction

One evening session was about a structural problem that's been building for years: there are far more proposals than there is implementation capacity. Compiler teams at Clang, GCC, and MSVC are stretched thin. The bottleneck is no longer design. It's implementation. Features get approved on paper and then take years to become usable.

Several ideas came up: that paper authors should bring at least partial implementations, that proposals should be tested against reality before advancing, and even that AI-assisted tooling could help lower the barrier. That last one triggered a visible reaction in the room: murmurs, people speaking out of turn, frustration. It was a brief moment, but telling.

What stayed with me was the core message from the implementers. The next day, I started contributing to both Clang and GCC, at the library and compiler level. Not out of any grand plan, but because the message landed: if you care about the language moving forward, help build it.

## Being There

There's something about being in the room that remote attendance can't replicate. The hallway conversations, the body language during debates, the energy when a contentious vote lands.

C++ keeps getting more powerful, and the cost of keeping up is real. But the community behind it is deeply invested in getting it right, and that was evident in Croydon.

I'm glad I was there for this one.
