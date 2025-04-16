# Personal Blog Website Major Update

**April 15**

This update marks a further step in embracing simplicity.

This new blog website uses a barebones [Next.js](https://nextjs.org/) and [Katex](https://katex.org/), nothing more. Serving as both a website and a template, it takes a Markdown file, expected to follow GitHub-style syntax, and turns it into a web page.

The idea is simple: Take the content of the Markdown file as a string, recognize the Markdown syntax, and substitute it with HTML. The customized [markdown parser](https://github.com/DahaoTang/Blog/blob/main/lib/markdownParser.ts) does all the heavy lifting.

I’ll continue polishing the parser as I use this site/template myself along the way. I will post about the road to implementing the parser.
