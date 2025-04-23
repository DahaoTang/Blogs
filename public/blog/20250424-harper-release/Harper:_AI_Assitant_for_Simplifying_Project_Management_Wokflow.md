# Harper: AI Assistant for Simplifying Project Management Workflow

April 24

**TL;DR:** Introduce Harper, an AI assistant helping simplify project management workflow. Include where the idea is from, an example of basic use cases of Harper, and the folder structure of the technical core.

## Where does this idea come from?

I introduce [Harper](https://github.com/DahaoTang/Harper), an AI assistant helping simplify project management workflow. It was initially developed as a tool for the Proteome project at the David James Lab at Charles Perkins Centre, USYD.

The idea starts with “develop for develop” — how can we develop something to improve efficiency for future development? The idea of developing a **new** application is always more exciting than building upon existing ones. So we have to be more careful with such ideas or decisions. With this being said, it is still valuable to think about whether it is possible to just do something to make life easier.

The answer is obviously “Yes!”. The question is “What?”.

Starting with workflow seems a plausible answer to me. As a small project with only around 5 developers (the majority of whom are undergraduates), we prioritized making the main product, ProteHome, work over designing a very reasonable workflow. However, the basic elements include:

1. GitHub: Where we collaborate to work on the code
2. Slack: Where we communicate with each other.
3. Trello: A project management board we really seldom use…

If we take a closer look at the time we spend on each of these tools, the answer to what to improve is obvious:

1. GitHub: We spend little time on it, actually, mainly for PRs.
2. Slack: We spend **a massive amount of time** on Slack; this is the only way we do all kinds of communication besides the one-hour-long weekly meetings.
3. Trello: **ALMOST ZERO**.

But we all know such a board (like Trello) is important — otherwise, why is it taught in all Agile classes lol. Just kidding, but at least I can foresee, when the project gets larger, the importance of not having, but utilizing such a board, will be more and more important.

Yet, why didn’t we use it much? Or a better question: how can we make it easier to utilize the board?

**_Why not utilize the board through Slack, where we spend the most time?_**

## Integration with Slack

There are different ways of doing it.

One obvious way does not require coding at all: such boards like Trello or Linear provide native support for external applications like Slack. We can do it by simply linking them together. However, we do need to use “commands” for such control. These commands serve as an intermediate interface between Slack and Trello/Linear. Such a way is easier to implement, but with less flexibility in the long term.

Another way is, make it possible to control the board, and potentially many other tools/elements, through talking to a bot on Slack using natural language. Hence, we have the idea of **Harper**.

_What is better is, we can adopt both ways at the same time._

## Harper: A glance at use cases

Based on the idea that we want to control the board, and potentially many other tools/elements, through talking to a bot on Slack using natural language, I developed the basic version of Harper.

The following is an example:

![example_1](./example1.png)

![example_2](./example2.png)

As you can see, currently Harper supports only interactions with a board, Linear, and mainly focuses on the management of cards/issues. I chose Linear over Trello because Linear is optimized for programming. But more importantly, I am not the admin of the Trello board we are using (hence I cannot use the APIs), and I prioritize passion and speed :)

## A very quick glance at the core folder structure

The project is made public on GitHub: [Harper](https://github.com/DahaoTang/Harper).

The core of Harper is the `lib` folder:

```
lib
├── adapters
│   ├── linear
│   │   └── api.ts
│   ├── openai
│   │   └── api.ts
│   └── slack
│       └── api.ts
├── config
│   └── harper.ts
├── services
│   ├── handlers
│   │   ├── general.ts
│   │   ├── linear.ts
│   │   └── welcome.ts
│   └── intent
│       ├── detector.ts
│       ├── index.ts
│       └── router.ts
└── types
    ├── intent.ts
    └── linear.ts
```

The `adapters` talk to the APIs from the provider. The `services`, especially the `handlers`, deal with the logic for user messages from Slack.

_I may post another blog on the details of the implementation, including the process of development and an explanation of the current code._
