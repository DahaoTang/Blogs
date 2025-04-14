import fs from "fs";
import path from "path";
import Link from "next/link";
import Headbar from "./components/headbar";

type BlogPost = { id: string; name: string };

export default function Home() {
  const blogDir = path.join(process.cwd(), "public", "blog");

  const blogFolders = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const blogPosts = blogFolders
    .map<BlogPost | null>((folder) => {
      const folderPath = path.join(blogDir, folder);
      const files = fs.readdirSync(folderPath, { withFileTypes: true });
      const mdFile = files.find(
        (file) => file.isFile() && file.name.endsWith(".md")
      );
      if (mdFile) {
        const name = mdFile.name.replace(/\.md$/, "");
        return { id: folder, name };
      }
      return null;
    })
    .filter((post): post is BlogPost => post !== null)
    .reverse();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      <div className="text-xl font-bold">Dahao&apos;s Blog</div>
      <div className="pt-5 pb-5">
        <Headbar />
      </div>
      <div>
        <ul className="space-y-2">
          {blogPosts.map((post) => {
            const year = post.id.substring(0, 4);
            const monthNum = post.id.substring(4, 6);
            const day = post.id.substring(6, 8);
            const monthName =
              monthNames[parseInt(monthNum, 10) - 1] || monthNum;
            const displayName = post.name.replace(/_/g, " ");
            return (
              <li key={`${post.id}-${post.name}`}>
                {day} {monthName}, {year} &nbsp;&nbsp;
                <Link
                  href={`/blog/${post.id}/`}
                  className="text-blue-600"
                >
                  {displayName}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
