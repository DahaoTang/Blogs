import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import Image from "next/image";

type BlogProps = {
	params: { slug: string };
};

// Fetch the Markdown content for the blog
const getBlogContent = (slug: string): string => {
	const filePath = path.join(process.cwd(), "public", "blogs", slug, "main.md");
	if (!fs.existsSync(filePath)) {
		throw new Error(`Markdown file not found for blog: ${slug}`);
	}
	return fs.readFileSync(filePath, "utf8");
};

// Function to resolve asset paths
const getAssetPath = (slug: string, assetPath: string): string => {
	if (assetPath.startsWith("./")) {
		assetPath = assetPath.slice(2);
	}
	return `/blogs/${slug}/assets/${assetPath}`;
};

// Custom Image Renderer using next/image
const ImageRenderer = ({
	src,
	alt,
	slug,
}: {
	src?: string;
	alt?: string;
	slug: string;
}) => {
	if (!src) return null;

	const resolvedSrc = getAssetPath(slug, src);

	return (
		<Image
			src={resolvedSrc}
			alt={alt || ""}
			width={800}
			height={450}
			className="rounded-lg my-4"
			layout="responsive"
		/>
	);
};

export default function BlogPost({ params }: BlogProps) {
	const { slug } = params;
	const content = getBlogContent(slug);

	return (
		<main className="container mx-auto p-6">
			<article className="prose max-w-none">
				<ReactMarkdown
					remarkPlugins={[remarkMath]}
					rehypePlugins={[rehypeKatex]}
					components={{
						img: ({ src, alt }) => (
							<ImageRenderer src={src} alt={alt} slug={slug} />
						),
					}}
				>
					{content}
				</ReactMarkdown>
			</article>
		</main>
	);
}
