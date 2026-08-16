import { getAllPosts } from "@/sanity/queries";
import BlogList from "./BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I wish I was Not So Sober — Anirudh",
  description: "Essays, notes, and structured thinking on design, technology, and craft.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Header */}
      <section className="flex flex-col gap-4 items-center text-center pt-16">
        <h1
          className="font-extrabold tracking-tight leading-none text-center"
          style={{ fontSize: "clamp(2.25rem, 5.5vw, 5.125rem)", color: "var(--foreground)" }}
        >
          I wish I was Not So Sober
        </h1>
      </section>

      {/* Post List */}
      <BlogList posts={posts} />
    </div>
  );
}
