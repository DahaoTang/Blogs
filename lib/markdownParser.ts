import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Escape HTML special characters to prevent injection in non-math content
 * @param text - The input markdown string
 * @returns - Sanitized string
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");
}

/**
 * This function renders latex syntax formula in the browser: inline math
 * @param latex - LaTeX syntax string
 * @returns - Rendered result
 */
function renderInlineMath(latex: string): string {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: false,
    });
  } catch (err) {
    console.warn("KaTeX rendering error:", err);
    return escapeHtml(latex);
  }
}

/**
 * This function renders latex syntax formula in the browser: math block
 * @param latex - LaTeX syntax string
 * @returns - Rendered result
 */
function renderBlockMath(latex: string): string {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: true,
    });
  } catch (err) {
    console.warn("KaTeX block rendering error:", err);
    return `<pre class="text-red-600 bg-red-100 p-2 rounded">Invalid math: ${escapeHtml(
      latex
    )}</pre>`;
  }
}

/**
 * This function handles single-line format
 * @param text - The markdown line
 * @returns The formatted line
 */
function processLine(text: string): string {
  // Extract inline code to placeholders
  const codeArr: string[] = [];
  text = text.replace(/`(.+?)`/g, (_m, code) => {
    const idx = codeArr.length;
    codeArr.push(code);
    return `@@CODE${idx}@@`;
  });

  // Extract inline math to placeholders
  const mathArr: string[] = [];
  text = text.replace(/\$(.+?)\$/g, (_m, expr) => {
    const idx = mathArr.length;
    mathArr.push(expr);
    return `@@MATH${idx}@@`;
  });

  // Headings
  const headingMatch = text.match(/^(#{1,6})\s+(.*)$/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const content = headingMatch[2].trim();
    if (level === 1) {
      return `<div class="text-2xl font-bold my-4">${escapeHtml(
        content
      )}</div>`;
    } else if (level === 2) {
      return `<div class="text-xl font-bold mt-4 mb-3">${escapeHtml(
        content
      )}</div>`;
    } else if (level === 3) {
      return `<div class="text-l font-bold my-3">${escapeHtml(content)}</div>`;
    } else if (level === 4) {
      return `<div class="text-l font-semibold mt-3 mb-2">${escapeHtml(
        content
      )}</div>`;
    } else if (level === 5) {
      return `<div class="text-md font-bold my-2">${escapeHtml(content)}</div>`;
    } else {
      return `<div class="text-md font-semibold mt-2 mb-1">${escapeHtml(
        content
      )}</div>`;
    }
  }

  // Horizontal line: ---
  if (text === "---") {
    return `<hr class="w-full h-px border-0 bg-neutral-300 my-4"/>`;
  }

  // Bold formatting: **[bolded text]**
  text = text.replace(
    /\*\*(.+?)\*\*/g,
    (_, p1) => `<strong>${escapeHtml(p1)}</strong>`
  );

  // Italic formatting: _[italic text]_
  text = text.replace(/_(.+?)_/g, (_, p1) => `<em>${escapeHtml(p1)}</em>`);

  // Process images: ![alt text](URL)
  text = text.replace(/!\[([^\]]*)\]\((.*?)\)/g, (_m, alt, src) => {
    return `<img src="${escapeHtml(src.trim())}" alt="${escapeHtml(
      alt
    )}" class="img-responsive ml-auto mr-auto max-w-[80%] h-auto my-4" />`;
  });

  // Process links: [link text](URL)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, href) => {
    return `<a class="text-blue-600" href="${escapeHtml(href)}">${escapeHtml(
      txt
    )}</a>`;
  });

  // Restore code placeholders
  codeArr.forEach((code, idx) => {
    text = text.replace(
      new RegExp(`@@CODE${idx}@@`, "g"),
      `<code class='px-1 rounded-sm bg-neutral-300 font-mono'>${escapeHtml(
        code
      )}</code>`
    );
  });

  // Restore math placeholders
  mathArr.forEach((expr, idx) => {
    text = text.replace(
      new RegExp(`@@MATH${idx}@@`, "g"),
      renderInlineMath(expr.trim())
    );
  });

  return text;
}

/**
 * Main markdown parser
 * @param md - The input markdown string
 * @returns - The generated HTML
 */
export default function parseMarkdown(md: string): string {
  const lines = md.split("\n");
  let i = 0;
  let html = "";

  while (i < lines.length) {
    let line = lines[i];

    // ----- Block-based Process -----

    // Unordered List
    if (/^\s*[-*+]\s+/.test(line)) {
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        const match = lines[i].match(/^(\s*)([-*+])\s+(.*)/);
        if (match) {
          const indent = match[1].length;
          const level = Math.floor(indent / 2);
          const margin = 16 + level * 16;
          const bullets = ["&bull;", "&#9702;", "&#9642;"];
          const bullet = bullets[level] || "&bull;";
          html += `<div style="margin-left: ${margin}px">${bullet} ${processLine(
            match[3]
          )}</div>\n`;
        }
        i++;
      }
      continue;
    }

    // Ordered List
    if (/^\s*\d+\.\s+/.test(line)) {
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const match = lines[i].match(/^(\s*)(\d+)\.\s+(.*)/);
        if (match) {
          const indent = match[1].length;
          const level = Math.floor(indent / 2);
          const margin = 16 + level * 16;
          html += `<div style="margin-left: ${margin}px">${
            match[2]
          }. ${processLine(match[3])}</div>\n`;
        }
        i++;
      }
      continue;
    }

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

    // Block Math: $$...$$
    if (line.trim().startsWith("$$")) {
      let latexContent = line.trim().slice(2); // Remove leading $$
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("$$")) {
        latexContent += "\n" + lines[i];
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith("$$")) {
        latexContent += "\n" + lines[i].trim().slice(2); // Append closing $$
        i++; // skip closing line
      }
      html += `<div class="my-4">${renderBlockMath(
        latexContent.trim()
      )}</div>\n`;
      continue;
    }

    // Line-based content
    if (line.trim() !== "") {
      html += `<div>${processLine(line.trim())}</div>\n`;
    } else {
      html += `<br />\n`;
    }

    i++;
  }

  html = `<div class="break-word">${html}</div>`;

  return html.trim();
}
