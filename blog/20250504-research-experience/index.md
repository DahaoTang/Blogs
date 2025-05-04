# My Naive Experience with Researching

[Home](../../index.html)

Initial start: May 4, 2025; Last update: May 4, 2025

## Introduction

I am in my fifth year at the University of Sydney, taking the Honors pathway. I am very new to research, having little experience, making all kinds of errors. Yet, I would like to take notes on my journey doing research. I hope, on one hand, this serves as a reminder for my future self; on the other hand, it could be helpful to those who are new to research as well.

_Notes: Unless specified, in this blog, I use the term “ChatGPT” for general AI chatbots, like Claude, DeepSeek, etc.._

## Experience

In this section, I introduce some general experiences with my journal of doing research.

### How to find background knowledge?

It can be difficult to quickly get the well-structured general background knowledge. You can start by finding surveys in relevant areas. However, there could be no surveys if the area is too niche, or the surveys could be out of date. In this case, you could start with recent important papers. They tend to focus on a detailed aspect of a problem, but they also tend to include related work, which contains a brief introduction to the background knowledge, alongside a citation. You can look into these cited papers for the background knowledge. Based on my experience, this approach is faster than trying to find the most suitable literature for such background knowledge yourself.

You can also utilize tools like Connected Papers (introduced in the Tools section of this blog) for similar papers and ChatGPT for summarizing a paper and answering your follow-up questions.

## Tools

In this section, I introduce some tools I use for research.

### [Perplexity](https://www.perplexity.ai/)

“Perplexity is a free AI-powered answer engine that provides accurate, trusted, and real-time answers to any question.” – their official website

By using Perplexity, you can search by not just providing keywords like how you would interact with traditional search engines like Google or Bing, but also prompting like how you would interact with ChatGPT. You can toggle between a general search and an in-depth search. You can also select the sources from the general internet, or from academic sources, etc. The answers will be provided with citations, a.k.a links to the resources, which means, unlike other LLM chatting services, you almost get NO information _made up by the model_. But you still need some prompting skills to make sure the resources are acceptable in your use case. For instance, you may want only literature from top conferences or journals; if so, you should mention this in the prompt.

The in-depth search is limited under the free plan; you can only use it for limited times within a period. But you can subscribe to a Pro plan to gain almost unlimited deep search.

### [Connected Papers](https://www.connectedpapers.com/)

Connected Papers (CP) will build a graph based on the information you provide (the title of a paper, keywords in one area, etc), which links similar papers in the field. In the graph, the bigger the node is, the more citations it contains; the darker the node is, the more recent it is. Node A and node B are connected if A is citing B or B is citing A. By using it, you may find extra papers you tend to miss when interacting with traditional search engines like Google or Bing, or with LLM-based services like ChatGPT or Perplexity.

CP is good for: (1) finding related papers, (2) understanding the development of a field from a higher level.

## Pipelines for Utilizing Tools

In this section, I introduce some pipelines I use to boost the efficiency of using the tools mentioned in the previous section.

### Start with a plan

You can provide resources (like some papers or specifications, etc) to a reasoning model (like OpenAI o3, etc) and ask for a **plan** for the task you would like to complete. The reasoning model tends to generate a decent plan. Then you can take the plan together with the resources to a regular model, and ask it to start implementing from the first step.

The reflection here is, based on my emperical experience, reasoning models like OpenAI o3 tend to give a better plan but suck at producing detailed answers especially when you want to improve the answer based on your feedback. On the other hand, general models like GPT-4o are better at implementing and polishing answers.

### If you need a search result…

LLMs can be hallucinating: where an LLM generates responses that are factually incorrect, nonsensical, or otherwise disconnected from the input or its training data. Hence, we should adopt a different approach if we need a search result.

Here I provide three simple approaches.

Firstly, you can use Perplexity, which is introduced in the Tools section.

Secondly, you can use OpenAI Deep Search. It is integrated in almost all models. When toggled on, it will do a deep search based on your prompt. It will also ask for clarity before searching to improve the quality of results. However, based on my empirical result, it may still be hallucinating when the context is too long. So I encourage you to double-check if you use this approach.

Thirdly, you can utilize ChatGPT and Perplexity together. You can tell ChatGPT that you intend to search using Perplexity and ask it to generate the prompt for Perplexity. Then you provide the ChatGPT-generated prompt and potentially other resources to Perplexity. The result from Perplexity can be exported in different formats, like Markdown, PDF, etc. Finally, you provide the result to ChatGPT again for the following tasks.

