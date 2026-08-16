import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

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

const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
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
}`;

/**
 * Single post by slug — includes full chapter bodies.
 * Reads unpublished drafts when Next.js draft mode is on (i.e. when
 * viewed inside the Sanity Presentation tool), otherwise published-only.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { isEnabled: isDraft } = await draftMode();

  const client = isDraft
    ? sanityClient.withConfig({
        token: process.env.SANITY_API_TOKEN,
        useCdn: false,
        perspective: "previewDrafts",
      })
    : sanityClient;

  return client.fetch(
    POST_BY_SLUG_QUERY,
    { slug },
    isDraft ? undefined : { next: { revalidate: 60 } }
  );
}

/** All slugs for dynamic route pre-rendering hints */
export async function getAllSlugs(): Promise<string[]> {
  const posts: { slug: { current: string } }[] = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)] { slug }`
  );
  return posts.map((p) => p.slug.current);
}
