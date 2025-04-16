import path from "path";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import { parseMarkdown } from "../../../lib/markdownParser";
import Headbar from "../../components/headbar";

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "public", "blog");
  const folders = await fs.readdir(blogDir, { withFileTypes: true });
  return folders
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({ id: dirent.name }));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const { id } = params;

  const blogFolder = path.join(process.cwd(), "public", "blog", id);

  try {
    const files = await fs.readdir(blogFolder, { withFileTypes: true });
    const mdFile = files.find(
      (file) => file.isFile() && file.name.endsWith(".md")
    );
    if (!mdFile) notFound();

    const name = mdFile.name.replace(/\.md$/, "");
    const mdPath = path.join(blogFolder, mdFile.name);
    const markdownContent = await fs.readFile(mdPath, "utf-8");
    const baseUrl = `/blog/${id}/${name}.assets/`;
    const htmlContent = parseMarkdown(markdownContent, baseUrl);

    return (
      <div>
        <Headbar />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  } catch (error) {
    console.error(`Error loading blog post ${id}:`, error);
    notFound();
  }
}
