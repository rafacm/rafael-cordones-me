---
author: Rafael Cordones
pubDatetime: 2025-11-01T12:00:00Z
modDatetime:  2025-11-01T12:00:00Z
title: The Computer - the Ultimate Asshole
slug: the-computer-the-ultimate-asshole
featured: true
draft: false
tags:
  - computing
  - programming
  - software development
  - books
description:
  What type of personality, what type of psychology, makes someone good at programming?
---

<figure>
  <img src="/assets/images/the-computer-the-ultimate-asshole/coders-book-cover.jpg" alt="'Coders' book cover"/>
</figure>

From “Chapter 3 - Constant Frustration and Bursts of Joy” in the book <a href="https://www.goodreads.com/book/show/40406806-coders">“Coders: The Making of a New Tribe and the Remaking of the World”</a> by Clive Thompson:

_What type of personality, what type of psychology, makes someone good at programming? Some traits are the obvious ones. Coders tend to be good at thinking logically, systematically. All day long you’re having to think about *if-then* statements or ponder wickedly complex ontologies, groups that are subgroups of subgroups. (Philosophy students, it seems, make excellent coders: I met philosophy majors employed at Kickstarter, start-ups, and oodles of other firms.) Coders are curious, relentlessly so, about how things work._
 
_[…]_

_But if you had to pick the central plank of coder psychology, the one common thread in nearly everyone who gravitates to this weird craft?_

_**It’s a boundless, nigh masochistic ability to endure brutal, grinding frustration.**_

_That’s because even though they’re called “programmers,” when they’re sitting at the keyboard, they’re quite rarely writing new lines of code. What are they actually doing, most of the time? Finding bugs._

_What exactly is a bug? A bug is an error in your code, something mistyped or miscreated, that throws a wrench into the flow of a program. They’re often incredibly tiny, picky details. They’re often incredibly tiny, picky details. One sunny day in Brooklyn, I met in a café with Rob Spectre, a lightly grizzled coder who whipped out his laptop to show me a snippet of code written in the language Python. It contained, he said, a single fatal bug. This was the code:_

```python
stringo = [rsa,rsa1,lorem,text]
_output_ = “backdoor.py”
_byte_ = (_output_) + “c”
if (sys.platform.startswith(“linux”))
  if (commands.getoutput(“whoami”)) != “root”:
    print(“run it as root”)
    sys.exit() #exit
```

_The bug? It’s on the fourth line. The fourth line is an `if` statement—if the program detects that (`sys.platform.startswith (“linux”))` is “true,” it’ll continue on with executing the commands on line five and onward._

_The thing is, in the language Python, any “if” line has to end with a colon. So line 4 should have been written like this..._

```python
if (sys.platform.startswith(“linux”)):
```

_That one tiny missing colon breaks the program._

_“See, this is what I’m talking about,” Spectre says, slapping his laptop shut with a grimace. **“The distance between looking like a genius and looking like an idiot in programming? It’s one character wide.”**_

_In reality, though, bugs are rarely an accident of happenstance. They are the fault of the programmers themselves. The joy and magic of the machine is that it does precisely what you tell it to, but like all magic, it can quickly flip into monkey’s-paw horror: When a coder’s instructions are in error, the machine will obediently commit the error. And when you’re coding, there are a lot of ways to screw up the commands. Perhaps you made a simple typo. Perhaps you didn’t think through the instructions in your algorithm very clearly. Maybe you referred to the variable numberOfCars as NumberOfCars—you screwed up a single capital letter. Or maybe you were writing your code by taking a “library”—a piece of code written by someone else—and incorporating it into your own software, and that code contained some hidden flaw. Or maybe your software has a problem of timing, a “race condition”: The code needs Thing A to take place before Thing B, but for some reason Thing B goes first, and all hell breaks loose. There are literally uncountable ways for errors to occur, particularly as code grows longer and longer and has chunks written by scores of different people, with remote parts of the software communicating with each other in unpredictable ways. In situations like this, the bugs proliferate until they blanket the earth like Moses’s locusts. The truly complex bugs might only emerge after years of coding, when your team suddenly realizes that a mistake they made on the first few weeks of work is now interfering with more recent programming._

_As [Michael Lopp](https://randsinrepose.com/), the vice president of engineering at Slack, once noted: **“You are punished swiftly for obvious errors. You are punished more subtly for the less obvious ones.”**_

_[…]_

_Coding is, in a profound way, less about making things than about fixing them. The pioneering computer scientist Seymour Papert had a koan: **No program works right the first time.**_

_[…]_

_This explains a lot about the mental style of those who endure in the field. “The default state of everything that you’re working on is fucking broken. Right? Everything is broken,” he says with a laugh. “The type of people who end up being programmers are self-selected by the people who can endure that agony. That’s a special kind of crazy. You’ve got to be a little nuts to do it.”_

_Nearly every coder who works on big, complex software will tell you a version of this. The dictates of working with ultraprecise machines, so brutally intolerant of error, can wind up rubbing off on the coder._

<figure>
  <img src="/assets/images/the-computer-the-ultimate-asshole/hal-9000-i-m-sorry-dave.png" alt="HAL 9000 in '2001: Space Odyssey'"/>
    <figcaption class="text-center">
    <a href="https://www.youtube.com/watch?v=ARJ8cAGm6JE">I'm sorry, Dave. I'm afraid I can't do that.</a> <br/> HAL 9000 to Dr. David Bowman in <a href="https://en.wikipedia.org/wiki/2001:_A_Space_Odyssey">"2001: Space Odyssey"</a>.
  </figcaption>
</figure>

_Why can coders be so snippy? [Jeff Atwood](https://blog.codinghorror.com/) asks, rhetorically. He thinks it’s because working with computers all day long is like being forced to share an office with a toxic, abusive colleague. “If you go to work and everyone around you is an asshole, you’re going to become like that,” Atwood says. **“And the computer is the ultimate asshole. It will fail completely and spectacularly if you make the tiniest errors.** ‘I forgot a semicolon.’ Well guess what, your spaceship is a complete ball of fire because you forgot a fucking semicolon.” (He’s not speaking metaphorically here: In one of the most famous bugs in history, <a href="https://www.nasa.gov/history/60-years-ago-mariner-1-launch-attempt-to-venus/">NASA was forced to blow up its Mariner 1 spacecraft only minutes after launch</a> when it became clear that a bug was causing it to veer off course and possibly crash in a populated area. The bug itself was caused by a single incorrect character.)_

_“The computer is a complete asshole. It doesn’t help you out at all,” Atwood explains. Sure, your compiler will spit out an error message when things go wrong, but such messages can be Delphic in their inscrutability. When wrestling with a bug, you are brutally on your own; the computer sits there coolly, paring its nails, waiting for you to express what you want with greater clarity. **“The reason a programmer is pedantic,” Atwood says, “is because they work *with* the ultimate pedant. All this libertarianism, all this ‘meritocracy,’ it comes from the computer.** I don’t think it’s actually healthy for people to have that mind-set. It’s an occupational hazard! It’s why you get the stereotype of the computer programmer who’s being as pedantic as a computer. Not everyone is like this. But on average it’s correct.”_

_[…]_
 
_**There’s a flip side to dealing with the agonizing precision of code and the grind of constant, bug-ridden failure. When a bug is finally quashed, the sense of accomplishment is electric.** You are now Sherlock Holmes in his moment of cerebral triumph, patiently tracing back the evidence and uncovering the murderer, illuminating the crime scene using nothing but the arc light of your incandescent mind._

<figure>
  <img src="/assets/images/the-computer-the-ultimate-asshole/lawrence-of-arabia-the-trick-william-potter-is-not-minding-that-it-hurts.jpg" alt="Lawrence of Arabia: the trick is not minding that it hurts"/>
    <figcaption class="text-center">
    <a href="https://youtu.be/xe3hAyooenk?si=Yfe7ejiA55PjG-vE">"The trick William Potter is not minding that it hurts."</a> <br/> Scene from <a href="https://en.wikipedia.org/wiki/Lawrence_of_Arabia_(film)">"Lawrence of Arabia (1962)"</a>.
  </figcaption>
</figure>
