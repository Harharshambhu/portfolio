import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short description shown on the blog index page.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "chapters",
      title: "Chapters",
      type: "array",
      of: [
        {
          type: "object",
          name: "chapter",
          title: "Chapter",
          fields: [
            defineField({
              name: "title",
              title: "Chapter Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "blockContent",
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare({ title }: { title?: string }) {
              return { title: title ?? "Untitled Chapter" };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, media, publishedAt }: { title?: string; media?: { asset?: { _ref?: string } }; publishedAt?: string }) {
      return {
        title: title ?? "Untitled Post",
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "Draft",
        media: media as never,
      };
    },
  },
});
