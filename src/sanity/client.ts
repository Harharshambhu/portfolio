import { createClient } from "next-sanity";

/**
 * Sanity client for data fetching in Server Components.
 * For queries and types, use @/sanity/queries.ts
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});
