import path from "path";
import { promises as fs } from "fs";
import { parseMarkdown } from "../../../lib/markdownParser";
import Headbar from "../../components/headbar";
import { notFound } from "next/navigation";

// Updated type to use Promise for params as required in Next.js 15+
type Params = Promise<{ id: string }>;

export default async function BlogPost({ params }: { params: Params }) {
  // Await the params Promise to get the actual values
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const blogFolder = path.join(process.cwd(), "public", "blog", id);

  try {
    const files = await fs.readdir(blogFolder, { withFileTypes: true });
    const mdFile = files.find(
      (file) => file.isFile() && file.name.endsWith(".md")
    );

    if (!mdFile) {
      notFound();
    }

    const name = mdFile.name.replace(/\.md$/, "");
    const mdPath = path.join(blogFolder, mdFile.name);
    const markdownContent = await fs.readFile(mdPath, "utf-8");
    const baseUrl = `/blog/${id}/${name}.assets/`;
    const htmlContent = parseMarkdown(markdownContent, baseUrl);

    return (
      <div>
        <div>
          <div className="text-xl font-bold">Dahao&apos;s Blog</div>
          <div className="pt-5 pb-5">
            <Headbar />
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  } catch (error) {
    console.error(`Error loading blog post ${id}:`, error);
    notFound();
  }
}
