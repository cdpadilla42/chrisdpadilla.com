---
title: The Pragmatic Programmer by Andy Hunt and Dave Thomas
tags:
  - Books
  - Tech
date: '2022-12-07T05:35:07.322Z'
---

I kept thorough notes while reading [The Pragmatic Programmer](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/). This isn't a review so much as a public sharing of those notes! To serve as a refference for present you and future me.

## A Pragmatic Philosophy

### Software Entropy

Entropy = level of disorder in a system. The universe works towards maximum entropy.

_Broken Windows_ are the first sign of entropy. When one thing is out of place and not fixed, the rest of the neighborhood goes.

When adding code, **do no harm**.

Technical debt = rot. Same topic.

### Stone Soup and Boiled Frogs

Ask for forgiveness, not permission. Be a catalyst for change.

Show success before asking for help.

Remember the Big Picture.

Maintain awareness around you. A la Navy SEALS.

### Good-Enough Software

The scope and quality of your software should be a part of the discussion when planning for it. With clients, talk about tradeoffs. Don't aim for perfection every time. Know when to ship good-enough software. Again, discuss this with the client. It's not all up to you.

Example: SSR and React Portal aren't playing nice. Do the research to discuss solutions. Leave the decision to client for whether or not this should stop us from shipping the code.

### Your Knowledge Portfolio

Investing in your knowledge and experience is your most valuable asset. Stagnating will mean the industry will pass you by.

Serious investors:

1. Invest regularly
2. Diversify for long term success
3. Balance Conservative and high risk/high reward investments
4. Investors aim to buy low and sell high (emerging tech)
5. Portfolio's should be reviewed and re-evaluated regularly

Suggested Goals:

1. Learn one new language every year (this year — Python)
2. Read a technical book each month
3. Participate in User Groups
4. Experiment with different environments (atm - shell and markdown)
5. Stay Current (Syntax)

It doesn't matter if you use this tech on a project or not - the engagement with new ideas and ways of doing things will change how you program.

Think critically. Be mindful of weather or not something is valuable to place in the knowledge portfolio. Consider:

1. 5 why's
2. Who benefits?
3. What's the context?
4. When or Where would this work?
5. Why is this a problem?

Go far: If you are in implementation, find a book on design.

## A Pragmatic Approach

### The Essence of Good Design

ETC — Make everything **Easy To Change**. We can't predict the needs of the future, so mainain flexibility in design now. That means modularity, decoupling, and single sources of truth.

### DRY — The Evils of Duplication

**DRY** Don't repeat yourself. This is more nuanced than "Don't Copy/Paste"

Maintenance is not done after a project is completed, it is a continual part of the process. You are a gardener, continue to garden and maintain.

**DRY** Is maintaining so that every piece of knowledge has a single, unambiguous, authoritative representation within the system.

Example: Regions stored in the DB.

GraphQL is a brilliant implementation of DRY - It's self documenting and APIs are automatically generated.

```
def validate_age(val):
	validate_type(val)
	validate_min_integer(val)

def validate_quantity(val):
	validate_type(val)
	validate_min_integer(val)
```

This does not violate the DRY principle because these are separate pieces of knowledge. They use the same code (think of CSS copying), but they don't need to share the same function. One validates age, one validates quantity. We keep it ETC by keeping these procedures separate, even if they use the same code.

_Documentation_ is often duplication. Write readable code, and you won't have to worry about documenting.

DRY in _Data_ can often be mitigated through calculation.

You don't need to store the averageRent, just the rent prices. You _can_ break this rule, so long as you keep it close to the module. Make it so that when a value changes, calculations are done to update it.

A general rule for Classes and modular coding is to make any outside endpoints an accessor or setting function as opposed to exposing access to the metal. By doing this, you make it easier to add adjustments to those methods (setting a value can allow for later triggering off other internal methods. Getting methods allow you to obfuscate if the value is calculated or directly accessed, it shouldn't matter either way.

#### Inter-developer Duplication

Keeping clear communication among teams will help keep from code duplication.

### Orthogonality

```

^
|
|
|
__________>

```

Two lines are orthogonal if they can move in their direction without going into the other axis. So an X/Y axis is orthogonal because no movement in their direction requires a change in another axis.

This is an ideal in our code. It's not necessarily achievable to perfection, but getting 80% there is a goal. The author's note that in reality, most real-world requirements will require multiple function changes in the system. In an orthological system, though, it's only one module within those functions that changes. That's the scope of it.

A helicopter is a non orthogonal system, requiring regular balancing.

Benefits include a boost in productivity, flexibility, and simplicity.

You also reduce the risk of one change ruining another part of the code.

You know this as _component-based_ design.

Even in design, consider the orthogonality. Is your system for user id's orthogonal if your user id is their phone number? No!

Be mindful of third party libraries in orthogonal systems. If you need to access objects in a special way with other libraries, it's likely not orthogonal. At the very least, wrap the handler in something that can isolate that logic.

#### Coding

What to do this while coding:

- Keep code decoupled. More later.
- Avoid global data. You can mitigate this by passing context into modules or as parameters in React. So redux stores app level data, but you mitigate this by only requesting what you need.
- Avoid similar functions.

### Reversibility

**There are no final decisions**

We can't rely on the same vendors over time. To mitigate this, hide third-party APIs behind your own abstraction layers. Break your code into components, even if you deploy to a single server. This mirror's Wes Bos' advice to, when working with server code, write the function itself, then write a handler that imports that code and runs it.

**Forgo Following Fads**

### Tracer Bullets

An approach that is _not_ the same as Prototyping. The means of tracer bullets is to find the target while laying down the skeleton for your project.

An example: Getting a "hello, world" app up that utilizes many different systems together.

_Tracer bullets don't always hit their target_, get accustomed to the fact that they most likely won't up front. Using light weight code makes it easier to adapt.

### Prototyping and Post It Notes

Prototyping by contrast is a throw away. It can include high level code, or not. It can be post it notes and still images, or even just drawing on a white board!

You can prototype:

- Architecture
- New functionality
- Structure or contents of external data
- Third party tools or components
- Performance issues
- User Interface Design

Again, many of these solutions are fine on a white board, or you can code something up that's more involved for testing.

You can forget about:

- Correctness
- Completeness (limited functions)
- Robustness (minimal error checking)
- Style (code style and documentation)

**Communicate that this code is meant to be thrown away.** You may be better of with tracer bullets if your management is likely to want to deploy this.

### Domain Languages

#### Internal Language

That using a programming language primarily as its means of communication. React and Jest are good examples of this.

The strength here is that you have a lot of flexibility with the language. You can use the language to create several tests automatically, for example.

#### External Language

That using a meta-language, requiring a parser to implement. JSON, YAML, and CSV are good examples of this. They contain information and data, but needs parsing to turn into action. The most extreme example is an application that uses its own custom language (GROQ is an example of this). If there is a client using your product, use this and reach for off the shelf external language solutions (JSON, YAML, CSV for client products)

#### Mix of both

Using methods and functions are a good in between. Jest uses functions (do, if, case) that have their own language and "syntax", but are, at the end of the day, functions. This is most ideal in most cases if programmers are using your solution.

```
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

#### Chris' Notes!

An example of this is ACNM. You're using React to write code for yourself. You're using Sanity to generate JSON objects that are then parsed and controlled by your application.

### Estimating

You can't truly estimate a specific project until you are iterating on it, if it's large enough.

Consider the time range of the project, and use appropriate quote to estimate in (330 days is specific, 6 months is vague).

Breaking down a project can help you give a ballpark answer to how long something will take. It will also help you say "If you want to do Y instead, we could cut time in half"

Keeping track of your estimates is good — It well help teach your gut and intuition on how to give better estimates as a lead.

PERT (Program Evaluation Review Technique) is a system using Optimistic, most likely, and pessimistic estimates. A good way to start, allowing for a range with specific scenarios, vs just a large ball park guess with padding.

The only way to refine an estimate is to iterate. How long will this take? How long is a string? There are so many factors at play that are not the same - team productivity, features, unforeseen issues....

The schedule will iterate with the project. You won't get a clear answer until you are getting closer. Avoid hard dates off into the future.

Always say "I'll get back to you." Let things take how long they take.

This is for you too! Allow things to take as long as they take, don't feel rushed or pressured to produce. They take as long as they take.

## The Basic Tools

At this point, the tools become conduits from he maker's brain to the finished product

Start with a basic set of generally applicable tools. Let need drive your acquisitions.

Many new programmers make the mistake of adopting a single power tool, such as... an IDE.

### The Power of Plain Text

- Insurance against obsolescence
- Leverage existing tools
- Easier testing

[There's a] difference between human readable and human understandable.

**Easier Testing** If you use plain text to create synthetic data to drive system tests, then it is a simple matter to add, update, or modify the test data _without having to create any special tools to do so_ (Chris here – AKA, no mocking!)

### Version Control

Invaluable tool. Serves as a time machine, collaborative tool, safe test space for concurrent development, and a back up of the project. (and your most important files!!)

### Text Manipulation

(This book was done in plain text and manipulation is done in a number of ways)

- Building the book
- Code inclusion and highlighting
- Website updates
- Including equations
- **Index generator**

### Engineering Daybooks

We use them to take notes in meetings, to jot down what we're working on.... leave reminders where we put things, etc...

It acts as a kind of rubber duck... when you stop to write something down, your brain may switch gears, almost as if talking to someone...you may realize that what you'd just done is just plain wrong.

## Pragmatic Paranoia

You can't trust the data out there or even your own application. You have to continually write safeguards for your code. Consider python - When writing a crawler, you have to assume you'll get bad information, or changes will occur. Assume the data you are trying to grab is very brittle.

True in react as well. Assume error

### Design by Contract

In the human world, contracts help add predictability to our interactions. In the computer world, this is true too.

A contract has a precondition, a postcondition... and then there's Class Invariants

**Precondition** Handled by the caller, ensuring that good data and conditions are being passed to the routine.

The alternative? Bugs and errors. By setting up preconditions, you allow a safe post condition

Example:

```Python
if availability_regex:
	unit_dict['date_available'] = standardize_date(availability_regex[0], output='str', default=True)
```

Here we're only calling standardize_date if we have an availability_regex. Another python example

```Python
if chunk.getAttribute('name'):
	name = chunk['name']

# Condensed into

name = chunk.getAttribute('name')

if not name:
	rause AptError("No Name found")
```

The Authors in **Dead Programs Tell No Lies** Actually say to crash when necessary. Get this straight - some of this advice is conflicting and situational. Sometimes you'll want to avoid running code from the outside as above. Sometimes you'll want to raise exceptions.

This is actually why people like TypeScript. There's an initial headache of getting everything set up. BUT once things are up and running, then you can rest assured that your code will work solidly. Communication will be clear, it incorporates documentation in that way.

#### Who's responsible?

Who is responsible for checking the precondition - the caller or the routine being called?

Here's an example in React. The routine is:

```JavaScript
renderGraph = () => {
	const {data, color, options, responsiveOptions, animationStyle, showPoints} = this.props;

	let update = false;
	if(this.graphElement.current && Array.isArray(data?.series)) {
		// Render the graph
	}
}
```

and here is the caller

```JavaScript
componentDidMount() {
	this.renderGraph();
}
```

Here the routine is responsible for validating the inputs. The issue here is that it will be called, but then there's no guarantee that it's doing what it set out to do. The contract is broken silently.

Perhaps this is just more acceptable in asynchronous code? We are accepting that "We may not have all the information we need on first call. So let's wait until the next call."

The issue is in clarity. I see it as I code. I see "Oh, it's called on mount, but it's called on updates too, so there's no telling if it's actually doing what it needs to do."

But again - we are dealing with heavily event driven programming, so the rules may not apply. For now, file this under "Good to know for Python."

**Assertions** You can partially emulate these checks with an assertive language such as TypeScript. However, it won't cover all of your bases. Consider DBC more of a design philosophy than a need for tooling.

#### DBC and Crashing Early

Crashing early, although painful, is a good thing. When you crash early, you can get to the root of the problem quicker.

The author's answered the thought I had: It's actually not as desirable in this philosophy for `sqrt` to return `NaN`, because it may only be ages later that you realize that the issue was with what you provided to `sqrt`, several functions later.

In conclusion - DBC is a proactive way of writing code so that you can find problems earlier. This can be implemented with test and documentation, or consider it a personal design philosophy.

The author's even make a case that DBC is different and preferable to TDD as it's more efficient and

#### Possible examples

Some libraries exist to use this in JS. Here's a babel plugin with pre and post conditions:

```
function withdraw (fromAccount, amount) {
  pre: {
    typeof amount === 'number';
    amount > 0;
    fromAccount.balance - amount > -fromAccount.overdraftLimit;
  }
  post: {
    fromAccount.balance - amount > -fromAccount.overdraftLimit;
  }

  fromAccount.balance -= amount;
}
```

and with Invariants:

```
function withdraw (fromAccount, amount) {
  pre: {
    typeof amount === 'number';
    amount > 0;
  }
  invariant: {
    fromAccount.balance - amount > -fromAccount.overdraftLimit;
  }

  fromAccount.balance -= amount;
}
```

The current JS in your writing is to handle assertions manually:

```
function withdraw (fromAccount, amount) {
	if(!fromAccount || !amount) return null;
	. . .
}
```

but this is only the precondition. Not to mention that this is part of the routine handling the issue.

#### Semantic invariants

These are a philosophical contract. A more broad principle that guides development. Example: Credit card transactions: "Err in favor of the consumer."

#### Dynamic contracts and agents

"I can't provide this, but if you give me this, then I might provide something else." High level stuff. Contracts negotiated by our programs. If you have xyz, I can return abc. Very interesting. Think of how GraphQL dynamically creates types. When it can dynamically look for what it needs out of given inputs, then it can solve negotiation issues.

### Dead Programs Tell No Lies

Here we go!!

In some environments, it may be inappropriate simply to exit a running program. You may have claimed resources that may need released, error logs to handle, open transactions to clean, or to interact with other processes still.

AND YET the basic principle stays the same. Terminate the function within that system when an error occurs to prevent

Example in Python:

```
def collect_and_update(region, address, update = True):

	db = Db().db
	building = db.buildings.find_one({'region': region, 'address': address}, projection={'region': 1, 'name': 1, 'address': 1, 'state': 1, 'city': 1, 'collector': 1})
	if not building:
		raise AptError('Building not found: {}, {}'.format(address, region))
	if not building.get('collector', {}).get('url'):
		raise AptError('{} does not have Collector url'.format(address))

	if not building.get('collector', {}).get('collectorType'):
		raise AptError('{} does not have Collector type'.format(address))
```

Here, the raise keyword stops the program.

Example in React:

```
const data = useMemo(() => {
	if(averagePriceAggregate) {
		const dataRes = {series: [], labels: []};
		...
	}
}
```

No error is raised, but the code is encapsulated by an if statement to ensure it has the data it needs and will not run the script if it doesn't.

_Who's Responsible for the precondition?_ Well, it actually depends on your environment.

### Assertive Programming

Assert against the impossible. If you think it is impossible... It's probably possible. Validate often.

This is not to replace real error handling. If there is an issue, log and handle the error. Use assertions to pass on to the error logger. Terminate if necessary.

When asserting, do not create side effects. No (array.pop() == null) checks

### How to Balance Resources

_Finish what you start_ - close files. Careful of coupling.

_Act Locally_ Keep scope close. Encapsulate. Smaller scope = better. Less coupling.

When Deallocating resources, do so in the opposite order of allocation.

When allocating the same set of resources in different places, always allocate in the same order

Be mindful of balancing long term. Log files are an often ignored memory hog over time.

Object oriented languages mirror this - there's a constructor and then destructor (you don't normally worry about the de-structure.)

In your case, event listeners - you want to add, then remove.

With _exceptions_, you can balance this neatly with a try...catch...finally block, or with context managers.

In python, the with...as keyword allows you to open a file, and then it gets closed after leaving the scope.

In JS, you have try, catch, finally. Though, be sure to allocate the resource _before_ the try catch statement.

```
try {
	allocateResource() // Goes wrong, the resource is not opened
} catch {
	// handle error
} finally {
	closeResource() // oops, it never got fully opened!
}
```

Wrapper functions are helpful for managing and logging your resources. More advanced topic, but this can be a way to go about it in other languages.

### Don't Outrun Your Headlights

In small and big ways, don't outrun your headlights. Avoid "Fortune Telling." Keep the feedback loop tight. Hit save after a few lines. Pass a test when you add code. Plan work a few hours or days ahead at most.

Notice that headlights also only go _in one direction_ You may be thinking about the UI when you code, and then need to take a moment to see how it's balanced out the API or another resource.

_Black Swans_ are unpredictable, and yet are guaranteed. No one talks about Motif or OpenLook anymore, because the browser-centric web quickly dominated the landscape.

Not to mention the current Federal Reserve raise in interest rates.

Oh hey! You are a REAL DEAL programmer as you create REAL UIs with the web!

## Bend or Break

### Decoupling

#### Train Wrecks

Be careful about how much knowledge one part of the code is expected to have about the other part of the code. Ideally, it's only a few levels deep.

For example, this...

```
customer
	.orders()
	.find(order_id)
	.getTotals()
	.applyDiscount()
```

should more ideally be

```
customer
	.findOrder(order_id)
	.applyDiscount
```

Not necessarily

```
customer.applyDiscountToOrder(order_id)
```

Because it is ok for _some_ global understanding. It is assumed that orders can be adjusted directly after being accessed from the customer.

_The Law (rule of thumb) of Demeter simplified:_ Don't chain method calls.

Again, this is not a _law_, but a rule of thumb, as the above example demonstrates. Not chaining helps with decoupling.

Language level api's are the exception. It's perfectly find to chain:

```
orders
	.filter(filterFunc)
	.map(mapFunc)
	.slice(0, 5)
```

because you won't expect that to change anytime soon. It's about mitigating change.

### Configuration

Use external configuration for your app (.env files). It's secure and keeps your app flexible. You can have different configs for different environments and deploys.

You can store it behind an API and DB for most flexible use. DB solution is best if it will be changed by the customer.

_configuration-as-a-service_ Keeping it behind an API, again, keeps it flexible. An app shouldn't need to stop and rerun if something here changes (different API key, different port, credentials change). API-ify this aspect for maximum flexibility.

## While You are Coding

### Refactoring

It is natural for software to change. Software is not a building. It is akin to _gardening_, meant to be flexible and organic and needing regular nurturing.

**Martin Fowler** - An early writer on Refactoring

Definition: Refactoring is intentional and is a process that does not change the external behavior. No new features while refactoring!

_When to Refactor_

Often and in small doses. Best done when you see a pain point.

Also, right upon getting a feature to work. How can this be made more clear?

You shouldn't need a week to refactor.

Good tests are integral to refactoring. You are alerted immediately when you make an unintentional change thanks to tests.

## Before the Project

### The Requirements Pit

**No one knows exactly what they want**

In the early days, people only automated when they knew exactly what they wanted. This is not the case today. Software needs greater flexibility.

When given a requirement, your gut instinct should be to ask more clarifying questions. If you don't have any, build and ask "is this what you mean?"

Deliver facts on the situation and let the client make the decision.

_Requirements are learned in a feedback loop_

Consulting - ask why 5 times, and you'll get to the root. Yes, be annoying, it's ok.

Requirements vs policy: Requirements are a hard and fast thing (Must run under 500ms). Policy, however, is often configurable. For example: Color scheme, text, fonts, authorizations: These are configurable, and are therefor policy.

Requirements may shift when the user gets their hands on it. They may prefer different workflows. This is why short iterations work best.

#### A Better Way

Use index cards to gather requirements. Use a kanban board to show progress. Share the board with clients so they can see the effect of a "wafer thin mint" and they can help decide what to move along. Get them involved in the process - it's all feedback loops.

Maintain a glossary to align communication.
