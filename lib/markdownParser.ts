/**
 * ========== IMPORTANT ==========
 * BE CAREFUL WHEN CHANGING THE ORDER OF THE RENDERING!!!
 * ===============================
 */
export function parseMarkdown(md: string, baseUrl: string = ""): string {
  let html = md;

  // 1. Escape HTML characters to prevent XSS
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Headings
  html = html.replace(
    /^###### (.*)$/gim,
    `<div class="heading heading-6 text-base font-semibold my-2">$1</div>`
  );
  html = html.replace(
    /^##### (.*)$/gim,
    `<div class="heading heading-5 text-md font-bold my-2">$1</div>`
  );
  html = html.replace(
    /^#### (.*)$/gim,
    `<div class="heading heading-4 text-lg font-semibold my-3">$1</div>`
  );
  html = html.replace(
    /^### (.*)$/gim,
    `<div class="heading heading-3 text-lg font-bold my-3">$1</div>`
  );
  html = html.replace(
    /^## (.*)$/gim,
    `<div class="heading heading-2 text-xl font-semibold my-4">$1</div>`
  );
  html = html.replace(
    /^# (.*)$/gim,
    `<div class="heading heading-1 text-2xl font-bold my-4">$1</div>`
  );

  // 3. Bold and Italic
  html = html.replace(
    /\*\*(.*?)\*\*/gim,
    `<strong class="font-bold">$1</strong>`
  );
  html = html.replace(/\_(.*?)\_/gim, `<em class="italic">$1</em>`);

  // 4. Horizontal Rules
  html = html.replace(/^\s*([-_*]){3,}\s*$/gm, '<hr class="my-4" />');

  // 5. Code Blocks
  html = html.replace(
    /```([\s\S]*?)```/g,
    (match: string, codeBody: string): string => {
      // Split into lines
      let lines: string[] = codeBody.split("\n");

      // Remove any leading/trailing blank lines
      while (lines.length && lines[0].trim() === "") {
        lines.shift();
      }
      while (lines.length && lines[lines.length - 1].trim() === "") {
        lines.pop();
      }

      // If the first line is a language marker (no spaces), remove it
      if (
        lines.length > 1 &&
        lines[0].trim().length > 0 &&
        lines[0].trim().indexOf(" ") === -1
      ) {
        lines.shift();
      } else if (lines.length === 1) {
        // For a single-line code block, check if the first token is a marker.
        const tokens = codeBody.split(" ");
        if (tokens.length > 1 && tokens[0].trim().indexOf(" ") === -1) {
          tokens.shift();
          lines = [tokens.join(" ")];
        }
      }

      // Dedent:
      //  - Skip lines that are empty or only punctuation like `)`, `}`, `]`
      //    to avoid them forcing minIndent=0.
      const isOnlyClosingPunctuation = (s: string) =>
        /^[)\]}]+$/.test(s.trim());
      const dedentCandidates = lines.filter(
        (l) => l.trim() !== "" && !isOnlyClosingPunctuation(l)
      );

      if (dedentCandidates.length > 0) {
        // Find the minimum leading space among dedent candidates
        const indentLengths = dedentCandidates.map((line) => {
          const matchIndent = line.match(/^\s+/);
          return matchIndent ? matchIndent[0].length : 0;
        });
        const minIndent = Math.min(...indentLengths);

        // Remove that indentation from each line
        if (minIndent > 0) {
          lines = lines.map((line) => line.slice(minIndent));
        }
      }

      // Join lines with <br /> to preserve newlines (including empty lines)
      const codeContent: string = lines.join("<br />");

      // 2. Do not render inline code markers inside code block - replace backticks with the HTML entity.
      const codeContentEscaped = codeContent.replace(/`/g, "&#96;");

      // 3. Render with horizontal scrolling and copy button moved above the code block.
      // Note: The copy button script now fetches the code block from the nextElementSibling.
      return `
        <div class="code-block-container my-4">
          <div class="text-right mt-1">
            <button
              class="copy-btn text-xs text-white border rounded px-2 py-1 mb-1
                    border-neutral-500 bg-neutral-500 hover:border-neutral-900
                    hover:bg-neutral-900 hover:text-green-600 cursor-pointer"
              onclick="(async function(el){
                try {
                  const codeEl = el.parentElement.nextElementSibling.querySelector('code');
                  const codeText = codeEl ? codeEl.innerText : '';
                  await navigator.clipboard.writeText(codeText);
                  el.innerText='copied';
                  setTimeout(() => { el.innerText='copy'; }, 2000);
                } catch(err) {
                  console.error(err);
                  el.innerText='error';
                }
              })(this)"
            >
              copy
            </button>
          </div>
          <pre class="code-block bg-neutral-800 text-neutral-100 p-2 rounded overflow-x-auto"><code class="code-content font-mono text-sm">${codeContentEscaped}</code></pre>
        </div>
      `.trim();
    }
  );

  // 6. Inline Code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="inline-code bg-green-100 text-green-800 px-1 py-0.5 rounded whitespace-pre align-baseline">$1</code>'
  );

  // 7. Images
  html = html.replace(
    /!\[([^\]]*)\]\((.*?)\)/gim,
    (match: string, alt: string, src: string): string => {
      let finalSrc = src.trim();
      if (finalSrc.startsWith("./") && baseUrl !== "") {
        finalSrc = finalSrc.slice(2);
        finalSrc = baseUrl.replace(/\/$/, "") + "/" + finalSrc;
      }
      return `<img src="${finalSrc}" alt="${alt}" class="img-responsive max-w-full h-auto" />`;
    }
  );

  // 8. Links
  html = html.replace(
    /\[([^\]]+)\]\((.*?)\)/gim,
    `<a href="$2" class="link text-blue-600 hover:underline" target="_blank">$1</a>`
  );

  // 9. Block-level Processing
  html = html
    .split(/\n\s*\n/)
    .map((block: string) => {
      const trimmed = block.trim();
      if (trimmed === "") {
        return "<br />";
      }
      if (
        /^(<div class="heading"|<div class="code-block-container"|<pre class="code-block"|<hr|<ul |<ol |<img |<a |<p)/.test(
          trimmed
        )
      ) {
        return trimmed;
      }
      // Check for list blocks
      const lines: string[] = trimmed.split("\n").map((line) => line.trim());
      if (lines.every((line) => /^([-+*]|\d+\.)\s+/.test(line))) {
        const listItems = lines.map((line) => {
          return `<li class="ml-4">${line
            .replace(/^([-+*]|\d+\.)\s+/, "")
            .trim()}</li>`;
        });
        return /^\d+\./.test(lines[0])
          ? `<ol class="list-decimal ml-4">${listItems.join("")}</ol>`
          : `<ul class="list-disc ml-4">${listItems.join("")}</ul>`;
      }
      // Normal paragraph
      let normalized = trimmed.replace(/  \n/g, "<br />");
      normalized = normalized.replace(/\n/g, " ");
      return `<p class="paragraph break-word my-2">${normalized}</p>`;
    })
    .join("");

  return html.trim();
}
