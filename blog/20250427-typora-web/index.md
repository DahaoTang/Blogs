# New Website Release: Typora-based

[Home](../../index.html)

April 27, 2025

**TL;DR** The current version of my blog website is built upon static HTML files. These HTML files are generated from Markdown files using Typora. The old blog website with a customized parser can still be found [here](https://github.com/DahaoTang/Blogs/blob/customized-markdown-parser-archive/lib/markdownParser.ts).

_Notes: Typora is no longer free; you need to purchase a lifetime license to use it._

## Pipeline

The current version of my blog website is built upon static HTML files generated from Markdown files using [Typora](https://typora.io/). The theme in Typora will be kept when exporting the Markdown files into HTML files. The current theme is the official theme, [Newsprint](https://theme.typora.io/theme/Newsprint/).

Here, I also introduce the simple pipeline:

1. Download Typora from the official website: https://typora.io/. If you are using Homebrew, you can also use this command: `brew install --cask typroa`. _Note that Typora is no longer free; you need to purchase a lifetime license to use it._
2. Activate Typora using the license: https://support.typora.io/activation/.
3. To export the Markdown file into an HTML file, we need to utilize a third-party plugin called [Pandoc](https://pandoc.org/). Here is the official guideline for installing Pandoc in Typora: https://support.typora.io/Install-and-Use-Pandoc/.
4. Open the Markdown file using Typora.
5. Export the file as an HTML file.

If you would like to use the HTML file for a web page, you can choose to add the title and icon manually:

```html
<!doctype html>
<html>
<head>
<meta charset='UTF-8'><meta name='viewport' content='width=device-width initial-scale=1'>
<!-- Add the title and icon here -->
<title>Dahao's Blog</title>
<link rel="icon" href="../../favicon.ico">
<!-- End -->
<link href='https://fonts.googleapis.com/css?family=PT+Serif:400,400italic,700,700italic&subset=latin,cyrillic-ext,cyrillic,latin-ext' rel='stylesheet' type='text/css' /><style type='text/css'>html {overflow-x: initial !important;}:root { --bg-color: #ffffff; --text-color: #333333; --select-text-bg-color: #B5D6FC; --select-text-font-color: auto; --monospace: "Lucida Console",Consolas,"Courier",monospace; --title-bar-height: 20px; }
.mac-os-11 { --title-bar-height: 28px; }
<!-- The rest of your file -->
```

_Note that you will need to do this for each of such static HTML files used as web pages._

## Legacy Blog Website

The previous version of my blog website was built upon Next.js and Katex, using a customized Markdown parser. It basically reads the Markdown file line by line and converts it into HTML syntax. You can find the website in the branch `customized-markdown-parser-archive` [here,](https://github.com/DahaoTang/Blogs/tree/customized-markdown-parser-archive) and the parser itself [here](https://github.com/DahaoTang/Blogs/blob/customized-markdown-parser-archive/lib/markdownParser.ts).
