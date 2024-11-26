import fs from "fs";
import path from "path";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";

type Blog = {
	slug: string;
	title: string;
	date: string;
};

const getBlogs = (): Blog[] => {
	const blogsDir = path.join(process.cwd(), "public", "blogs");
	const metadataPath = path.join(blogsDir, "blogs.json");

	if (!fs.existsSync(blogsDir)) {
		throw new Error(`Blogs directory not found at ${blogsDir}`);
	}

	if (!fs.existsSync(metadataPath)) {
		throw new Error(`Metadata file not found at ${metadataPath}`);
	}

	// Read metadata from blogs.json
	const metadata: { slug: string; date: string }[] = JSON.parse(
		fs.readFileSync(metadataPath, "utf8")
	);

	// For each blog, read the title from main.md
	const blogs: Blog[] = metadata.map((meta) => {
		const markdownPath = path.join(blogsDir, meta.slug, "main.md");
		if (!fs.existsSync(markdownPath)) {
			throw new Error(`Markdown file not found for blog: ${meta.slug}`);
		}

		// Read the first line as the title
		const fileContent = fs.readFileSync(markdownPath, "utf8");
		const title = fileContent.split("\n")[0].replace(/^#\s*/, "").trim(); // Extract title

		return {
			slug: meta.slug,
			title,
			date: meta.date,
		};
	});

	// Sort blogs by date (newest first)
	return blogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
};

export default function HomePage() {
	const blogs = getBlogs();

	return (
		<main className="container mx-auto p-6">
			<div className="text-xl font-bold mb-6">Dahao&apos;s Blog</div>
			<Table>
				<TableBody>
					{blogs.map((blog) => (
						<TableRow key={blog.slug} className="cursor-pointer">
							<TableCell>
								<Link href={`/blog/${blog.slug}`} className="hover:underline">
									{blog.title}
								</Link>
							</TableCell>
							<TableCell>{blog.date}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	);
}
