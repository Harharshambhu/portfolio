import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: "we47y7oecc84i0tw0kdqjy5u",
  },
});
