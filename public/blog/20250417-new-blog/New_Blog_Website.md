# New Personal Blog Website

April 17, 2025

![zhizi](./zhizi.PNG)

_Zhizi from Three Body, Produced by [ASK](https://x.com/askziye)_

## Introduction

I have always wanted a personal blog website built with the minimum packages and easy to use. Intuitively, I would want the website to be able to convert a Markdown file, which is commonly used for my daily research and development, into a web page blog directly. Hence, here I introduce the major update of my personal blog website.

## Tech Stack

This blog website you are looking at is built upon **Next.js 15** using Tailwind and TypeScript, which are both embedded as options for modern Next.js applications. The only additional package used is **[KaTex](https://katex.org/)**, a package that quickly renders a LaTeX-syntax formula in modern browsers. _I wanted to build the customized formula renderer, yet it soon came to me that it is a huge amount of work that clearer too much for a small personal side project._

## Technical Core

The core of this website is a [markdown parser](https://github.com/DahaoTang/Blogs/blob/main/lib/markdownParser.ts) that reads through the markdown file line by line and converts it into HTML pieces. The idea sounds similar to a basic compiler/interpreter, yet it is in practice much simpler.

I treat the markdown content as two main categories: **line-based** and **block-based**.

Line-based contents are simple: like regular text, headings, bold text, italic text, etc These are easy to implement: simply try to match the markdown syntax and use HTML to do the rendering. For instance, for bolded text, check if the current line matches the expression of `**<some content>**`; if so, convert the line into HTML: `<strong>${some content}</strong>`. Additional styling/formatting, like margin or padding, can be added as required.

Block-based content is a bit more complex yet still easy to understand and implement. Imagine using a simple while/for loop and a pointer $i$ to represent and control where you are in the markdown file; in practice, this is how I implement the parser as well. For block-based content, you are expected to take a portion of content (several lines usually) as a whole and **toggle** the pointer $i$ **within** the several lines of content, which intuitively involves a sub-while/for loop:

```
while (i < file length) {

	# Do block-based processes
	...

	# Code block: ```<optional: language><code content, usually multiple lines>```
	while (within the code block) {
		Do some line-based processes with different patterns than outside this sub-loop

		i++; # This is almost certainly used as we are inside a sub-loop
	...
	}

	# Do line-based processes
	...

	i++;
}
```

`i++` is almost guaranteed to be used within the sub-loop. Because once the lines within the block are processed, you don’t want to process them again using a single line-based process.

Hence, the major difference between the two categories, in terms of implementation, is whether the pointer $i$ is toggled when processing the content (single line or multiple lines).

## Implementation

Currently, only the following Markdown syntax is implemented:

- Regular text
- Headings
- Horizontal line
- Bold text
- Italic text
- Images
- Links
- Sorted list
- Unsorted list
- Inline code
- Inline math
- Code block
- Math block

## Test

The following is a simple test of the implementation, as this blog is written in Markdown as well.

# Heading 1

Some text for Heading 1

## Heading 2

Some text for Heading 2

### Heading 3

Some text for Heading 3

#### Heading 4

Some text for Heading 4

##### Heading 5

Some text for Heading 5

###### Heading 6

Some text for Heading 6

Horizontal line:

---

This is a **Bold text**

This is an _Italic text_

This is a **_Bold italic text_**. Note: _** italic bold text**_ doesn’t work

This is an image of Zhizi from the sci-fi novel Three Body, drawn by ASK:

![zhizi](./zhizi.PNG)

This is a link to [ASK](https://x.com/askziye) on X.

This is a sorted list:

1. Hello
2. there
   1. It
   2. is
      1. you
      2. and
         1. me

This is an unsorted list:

- Hello
- there
  - It
  - is
    - you
    - and
      - Me

This is an inline code: `printf("Welcome to my personal blog!\n");`

This is an inline math: $x_{i}^{2} + \frac{1}{2}$

This is a code block:

```
// Code Block
if (line.startsWith("```")) {
  html += `<div class="p-2 rounded-md bg-neutral-300 my-4">`;
  const language = line.slice(3).trim();
  i++;
  const codeLines: string[] = [];
  while (i < lines.length && !lines[i].startsWith("```")) {
    codeLines.push(lines[i]);
    i++;
  }
  i++; // Skip closing ```
  const codeContent = codeLines.join("\n");
  html += `<pre class="overflow-x-auto whitespace-pre"><code${
    language ? ` class="language-${language}"` : ""
  }>${escapeHtml(codeContent)}</code></pre></div>\n`;
  continue;
}
```

This is a math block:

$$
f(x) =
\begin{cases}
  x^2 & \text{if } x \geq 0 \\
  -x & \text{if } x < 0
\end{cases}
$$
