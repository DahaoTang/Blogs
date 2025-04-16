# Test

April 17

This file serves as a test for the [customized mardown parser](https://github.com/DahaoTang/Blogs/blob/main/lib/markdownParser.ts) written in pure TS and [Katex](https://katex.org/).

# Heading Level 1

## Heading Level 2

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

---

This is a paragraph with **bold text**, _italic text_, and a [link](https://example.com).

Here's an image:
![Zhizi](./zhizi.png)

A bullet list:

- First item
- Second item with **bold** and $a^2 + b^2 = c^2$
  - Nested level 1
    - Nested level 2
      - Nested level 3 (should cap at level 3)

An ordered list:

1. First
2. Second
   1. Sub-item
   2. Another sub-item

Some inline code: `console.log("Hello, world!")`

Horizontal rule below:

---

### Inline Math Tests

Inline math should render properly:

- Basic: $x + y$
- Fractions: $\frac{a}{b}$
- Exponents: $e^{i\pi} + 1 = 0$
- Subscripts: $a_1 + a_2$
- Combined: $x_{i}^{2} + \frac{1}{2}$

Edge cases:

- Unclosed math: $x + y
- Escaped dollar: \$100 is not math
- Empty math block: $$ $$

### Block Math Tests

Block math should be centered and rendered cleanly:

$$
\int_0^1 x^2 \, dx
$$

Multiple lines with complex expression:

$$
f(x) =
\begin{cases}
  x^2 & \text{if } x \geq 0 \\
  -x & \text{if } x < 0
\end{cases}
$$

Edge case: block with missing closing tag

$$
a + b = c

More text after invalid block.

### Code Block Tests

\`\`\`js
function add(a, b) {
  return a + b;
}
\`\`\`

\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`

### Mixed Content

**Bold $a^2$ and _italic $\frac{x}{y}$ inside_ the same line.**

Back to plain text. Double blank lines follow:


Now here again.

---

Testing [link with inline math](https://math.org) $E=mc^2$ and `code with $ symbols`.

Last line with weird math: $\sqrt{(a^2 + b^2)}$

And an invalid inline math: $a + b


$$
