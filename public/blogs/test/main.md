# Markdown Syntax Guide

This document showcases **all possible Markdown grammar** commonly used in GitHub READMEs.

---

## 1. Headings

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## 2. Text Formatting

### Bold and Italic

```markdown
**Bold**
_Italic_
_Italic_
**_Bold and Italic_**
```

**Bold**  
_Italic_  
_Italic_  
**_Bold and Italic_**

---

### Strikethrough

```markdown
~~Strikethrough~~
```

~~Strikethrough~~

---

## 3. Lists

### Unordered List

```markdown
- Item 1
  - Sub-item 1
  - Sub-item 2
- Item 2
```

- Item 1
  - Sub-item 1
  - Sub-item 2
- Item 2

---

### Ordered List

```markdown
1. Item 1
2. Item 2
   1. Sub-item 1
   2. Sub-item 2
```

1. Item 1
2. Item 2
   1. Sub-item 1
   2. Sub-item 2

---

### Task List

```markdown
- [x] Task 1
- [ ] Task 2
- [ ] Task 3
```

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

---

## 4. Links

### Basic Link

```markdown
[Link text](https://example.com)
```

[Link text](https://example.com)

---

### Link with Title

```markdown
[Link text with title](https://example.com "Title")
```

[Link text with title](https://example.com "Title")

---

## 5. Images

```markdown
![Alt text](https://via.placeholder.com/150 "Optional Title")
```

![Alt text](https://via.placeholder.com/150 "Optional Title")

---

## 6. Code Blocks

### Inline Code

```markdown
`Inline code`
```

`Inline code`

---

### Fenced Code Block

```markdown

```

Code block

```

```

```
Code block
```

---

### Syntax Highlighting

````markdown
```javascript
const greet = () => {
	console.log("Hello, World!");
};
```
````

````

```javascript
const greet = () => {
  console.log("Hello, World!");
};
````

---

## 7. Blockquotes

```markdown
> Blockquote
>
> > Nested Blockquote
```

> Blockquote
>
> > Nested Blockquote

---

## 8. Tables

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |
```

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |

---

## 9. Horizontal Rule

```markdown
---
```

---

---

## 10. Emojis

```markdown
:smile: :+1: :sparkles:
```

:smile: :+1: :sparkles:

---

## 11. HTML in Markdown

```markdown
<div style="color:blue;">This is a div block in Markdown.</div>
```

<div style="color:blue;">This is a div block in Markdown.</div>

---

## 12. Footnotes

```markdown
Here is a footnote reference[^1].

[^1]: Here is the footnote.
```

Here is a footnote reference[^1].

[^1]: Here is the footnote.

---

## 13. Escaping Special Characters

```markdown
\*Escaped asterisk\*
```

\*Escaped asterisk\*

---

## 14. GitHub-Specific Syntax

### Mention Users

```markdown
@username
```

@username

---

### Reference Issues or Pull Requests

```markdown
#123
```

#123

---

### Task List Progress

```markdown
- [x] Completed
- [ ] In Progress
```

- [x] Completed
- [ ] In Progress

---

## 15. Advanced Markdown Extensions

### Math Expressions

```markdown
$$
E = mc^2
$$
```

$$
E = mc^2
$$

---

### Mermaid Diagrams

````markdown
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

````

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
````

---

## Conclusion

This file showcases **all possible Markdown syntax** used in GitHub README files. Feel free to modify it as needed!
