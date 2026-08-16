import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dashboardTool } from "@sanity/dashboard";
import { presentationTool, defineLocations } from "sanity/presentation";
import { projectInfoWidget, projectUsersWidget } from "@sanity/dashboard";
import { schemaTypes } from "@/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool(),
    dashboardTool({
      widgets: [projectInfoWidget(), projectUsersWidget()],
    }),
    presentationTool({
      resolve: {
        locations: {
          post: defineLocations({
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Untitled post",
                  href: `/blog/${doc?.slug}`,
                },
                { title: "Blog index", href: "/blog" },
              ],
            }),
          }),
        },
      },
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],
});
