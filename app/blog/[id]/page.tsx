import path from "path";
import { promises as fs } from "fs";
import { parseMarkdown } from "../../../lib/markdownParser";
import Headbar from "../../components/headbar";

type PageProps = {
  params: { id: string };
};

export default async function BlogPost({ params }: PageProps) {
  const { id } = params;
  const blogFolder = path.join(process.cwd(), "public", "blogs", id);
  const files = await fs.readdir(blogFolder, { withFileTypes: true });
  const mdFile = files.find(
    (file) => file.isFile() && file.name.endsWith(".md")
  );

  if (!mdFile) {
    // Optionally, you could throw a 404 error or render a not found page.
    // For example, in Next.js 13 you could call `notFound()`.
    throw new Error("Blog post not found");
  }

  // Extract the markdown file name (without extension)
  const name = mdFile.name.replace(/\.md$/, "");
  const mdPath = path.join(blogFolder, mdFile.name);
  const markdownContent = await fs.readFile(mdPath, "utf-8");
  const baseUrl = `/blogs/${id}/${name}.assets/`;
  const htmlContent = parseMarkdown(markdownContent, baseUrl);

  return (
    <div className="bg-red-500">
      <div>
        <div className="text-xl font-bold">Dahao&apos;s Blogs</div>
        <div className="pt-5 pb-5">
          <Headbar />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
