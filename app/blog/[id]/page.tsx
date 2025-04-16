import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { parseMarkdown } from "../../../lib/markdownParser";
import Headbar from "../../components/headbar";

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Get the path to the folder of the blog
  const blogFolder = path.join(process.cwd(), "public", "blog", id);
  if (!fs.existsSync(blogFolder)) {
    notFound();
  }

  // Get the markdown file of the blog
  const mdFile = fs
    .readdirSync(blogFolder, { withFileTypes: true })
    .find((file) => file.isFile() && file.name.endsWith(".md"));
  if (!mdFile) {
    notFound();
  }

  // Get meta data
  const name = mdFile.name.replace(/\.md$/, "");
  const mdPath = path.join(blogFolder, mdFile.name);
  const markdownContent = fs.readFileSync(mdPath, "utf-8");
  const baseUrl = `/blog/${id}/${name}.assets/`;
  const htmlContent = parseMarkdown(markdownContent, baseUrl);

  return (
    <div>
      <Headbar />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
