import { getPostBySlug, getAllSlugs, Post } from "@/sanity/queries";
import { PortableText, PortableTextComponents } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

// ─── Static Params Hint (not required for SSR but helps with pre-rendering) ──

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Anirudh`,
    description: post.excerpt ?? undefined,
  };
}

// ─── Portable Text Renderer ───────────────────────────────────────────────────

const portableTextComponents: PortableTextComponents = {
  types: {
    inlineImage: ({ value }: { value: { alt?: string; caption?: string; asset?: { _ref?: string } } }) => (
      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${value?.asset?._ref?.replace("image-", "").replace(/-([a-z]+)$/, ".$1")}`}
          alt={value?.alt ?? ""}
          className="w-full rounded-xl border border-border"
        />
        {value?.caption && (
          <figcaption className="mt-2 text-center text-xs font-sans" style={{ color: "var(--muted)" }}>
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    codeBlock: ({ value }: { value: { language?: string; code?: string; filename?: string } }) => (
      <div className="my-6 rounded-xl overflow-hidden border border-border">
        {value?.filename && (
          <div className="px-4 py-2 text-xs font-mono border-b border-border" style={{ color: "var(--muted)", background: "var(--hover)" }}>
            {value.filename}
          </div>
        )}
        <pre className="overflow-x-auto p-5 text-sm font-mono leading-relaxed" style={{ background: "var(--background)", color: "var(--foreground)" }}>
          <code>{value?.code}</code>
        </pre>
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-10 mb-4" style={{ color: "var(--foreground)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3" style={{ color: "var(--foreground)" }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-semibold mt-6 mb-2" style={{ color: "var(--foreground)" }}>
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="leading-relaxed mb-4" style={{ color: "var(--foreground)", fontSize: "var(--fs-body-lg)" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 pl-5 my-6 italic" style={{ borderColor: "var(--accent-neon)", color: "var(--muted)" }}>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-4 flex flex-col gap-1.5" style={{ color: "var(--foreground)" }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-4 flex flex-col gap-1.5" style={{ color: "var(--foreground)" }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed" style={{ fontSize: "var(--fs-body-lg)" }}>{children}</li>,
    number: ({ children }) => <li className="leading-relaxed" style={{ fontSize: "var(--fs-body-lg)" }}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold" style={{ color: "var(--foreground)" }}>{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-sm px-1.5 py-0.5 rounded border border-border" style={{ background: "var(--hover)", color: "var(--foreground)" }}>
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="underline underline-offset-2 hover:opacity-70 transition-opacity"
        style={{ color: "var(--accent-neon)" }}
      >
        {children}
      </a>
    ),
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post | null = await getPostBySlug(slug);

  if (!post) notFound();

  const chapters = post.chapters ?? [];

  return (
    <div className="flex flex-col gap-16 pb-32">
      {/* Back link */}
      <Link
        href="/blog"
        aria-label="All Writing"
        className="no-cursor-interaction self-start inline-flex items-center justify-center w-9 h-9 text-lg font-sans rounded-sm"
        style={{ backgroundColor: "var(--accent-blue)", color: "var(--text-hover)", marginBottom: "-2.5rem" }}
      >
        ←
      </Link>

      {/* Header */}
      <header className="flex flex-col gap-6 max-w-3xl">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-sans px-2 py-0.5 rounded-full border border-border"
                style={{ color: "var(--muted)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1
          className="font-extrabold tracking-tight leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
        >
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="leading-relaxed" style={{ color: "var(--muted)", fontSize: "var(--fs-body-lg)" }}>
            {post.excerpt}
          </p>
        )}

        {post.publishedAt && (
          <span className="text-xs font-sans" style={{ color: "var(--muted)" }}>
            {formatDate(post.publishedAt)}
          </span>
        )}
      </header>

      {/* Table of Contents (if multiple chapters) */}
      {chapters.length > 1 && (
        <nav className="p-6 rounded-xl border border-border" style={{ background: "var(--background)" }}>
          <span className="text-xs font-sans uppercase tracking-wider mb-3 block" style={{ color: "var(--muted)" }}>
            Contents
          </span>
          <ol className="flex flex-col gap-2">
            {chapters.map((ch, i) => (
              <li key={i}>
                <a
                  href={`#chapter-${i + 1}`}
                  className="text-sm flex items-start gap-3 hover:opacity-70 transition-opacity"
                  style={{ color: "var(--foreground)" }}
                >
                  <span className="font-sans text-xs tabular-nums mt-0.5 shrink-0" style={{ color: "var(--muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {ch.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Chapters */}
      <article className="flex flex-col gap-16 max-w-3xl">
        {chapters.length === 0 ? (
          <p className="text-muted text-sm">This post has no content yet.</p>
        ) : (
          chapters.map((chapter, idx) => (
            <section key={idx} id={`chapter-${idx + 1}`} className="flex flex-col gap-6">
              {/* Chapter heading */}
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <span
                  className="font-sans text-xs tabular-nums mt-1 shrink-0"
                  style={{ color: "var(--muted)", minWidth: "2rem" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-semibold tracking-tight leading-snug"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--foreground)" }}
                >
                  {chapter.title}
                </h2>
              </div>

              {/* Chapter body */}
              {chapter.body && (
                <div className="prose-content">
                  <PortableText value={chapter.body as Parameters<typeof PortableText>[0]["value"]} components={portableTextComponents} />
                </div>
              )}
            </section>
          ))
        )}
      </article>
    </div>
  );
}
