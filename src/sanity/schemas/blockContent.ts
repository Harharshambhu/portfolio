import { defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    // Standard block (no defineField — block type doesn't require name in arrays)
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: true,
              },
            ],
          },
        ],
      },
    },
    // Inline images
    defineField({
      name: "inlineImage",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    // Code blocks
    defineField({
      name: "codeBlock",
      type: "object",
      title: "Code Block",
      fields: [
        defineField({ name: "language", type: "string", title: "Language", initialValue: "javascript" }),
        defineField({ name: "code", type: "text", title: "Code" }),
        defineField({ name: "filename", type: "string", title: "Filename (optional)" }),
      ],
    }),
    // Table — registered by the @sanity/table plugin
    { type: "table" },
    // Embeds — YouTube/Vimeo render as an iframe, anything else as a link card
    defineField({
      name: "embed",
      type: "object",
      title: "Embed",
      fields: [
        defineField({ name: "url", type: "url", title: "URL" }),
        defineField({ name: "caption", type: "string", title: "Caption (optional)" }),
      ],
      preview: {
        select: { title: "url" },
      },
    }),
    // Toggle / collapsible section
    defineField({
      name: "toggle",
      type: "object",
      title: "Toggle",
      fields: [
        defineField({ name: "title", type: "string", title: "Summary", validation: (Rule) => Rule.required() }),
        defineField({
          name: "body",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
      preview: {
        select: { title: "title" },
        prepare({ title }: { title?: string }) {
          return { title: title ? `Toggle: ${title}` : "Toggle" };
        },
      },
    }),
  ],
});
