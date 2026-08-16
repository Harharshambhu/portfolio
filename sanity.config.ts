import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

// Hardcoded rather than read from env: the Sanity CLI's own build (used by
// `sanity deploy`) doesn't load NEXT_PUBLIC_* vars the way Next.js does, so
// process.env.NEXT_PUBLIC_SANITY_PROJECT_ID resolved to undefined in the
// deployed Studio bundle. These values are public/non-secret (see .env.local).
const projectId = "j80py9ok";
const dataset = "production";

export default defineConfig({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool()],
});
