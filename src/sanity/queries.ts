import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ─── Types ─────────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: { _ref: string };
  alt?: string;
  caption?: string;
}

export interface Chapter {
  title: string;
  body: unknown[];
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: SanityImage;
  tags?: string[];
  chapters?: Chapter[];
}

// ─── Queries ───────────────────────────────────────────────────────────────

/** All posts for the index page (no chapter body — keeps payload small) */
export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      tags,
      coverImage { asset, alt }
    }`,
    {},
    { next: { revalidate: 60 } } // ISR-like: revalidate every 60s
  );
}

/** Single post by slug — includes full chapter bodies */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      tags,
      coverImage { asset, alt },
      chapters[] {
        title,
        body
      }
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

/** All slugs for dynamic route pre-rendering hints */
export async function getAllSlugs(): Promise<string[]> {
  const posts: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] { slug }`
  );
  return posts.map((p) => p.slug.current);
}
