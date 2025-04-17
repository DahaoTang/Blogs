import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Headbar from "../../components/headbar";
import parseMarkdown from "../../../lib/markdownParser";

interface BlogPageProps {
  // params is now a Promise of an object with id
  params: Promise<{ id: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "public", "blog");
  const folders = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return folders.map((id) => ({ id }));
}

export default async function Page({ params }: BlogPageProps) {
  // await the params Promise before destructuring
  const { id } = await params;

  // FInd blog folder
  const postDir = path.join(process.cwd(), "public", "blog", id);
  if (!fs.existsSync(postDir)) {
    return notFound();
  }

  // Find blog markdown file
  const files = fs.readdirSync(postDir);
  const mdFile = files.find((file) => file.endsWith(".md"));
  if (!mdFile) {
    return notFound();
  }

  // Read markdown content
  const fullPath = path.join(postDir, mdFile);
  const content = fs.readFileSync(fullPath, "utf8");

  // Convert markdown to HTML
  const rawHtml = parseMarkdown(content);

  // Prefix any relative resource links (images, media) to point under /blog/[id]/
  const html = rawHtml.replace(
    /src="(?!https?:\/\/|\/)([^"]+)"/g,
    (_, p1) => `src="/blog/${id}/${p1}"`
  );

  return (
    <div>
      <Headbar />
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
