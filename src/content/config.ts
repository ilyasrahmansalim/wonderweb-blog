import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featuredImage: z.string(),
    featuredImageAlt: z.string().default(''),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Wonderweb Team'),
    authorAvatar: z.string().optional(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readingTime: z.number().optional(), // menit, auto-fallback jika kosong
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    canonicalUrl: z.string().optional(),

    // GEO / AI fields
    aiSummary: z.string().optional(),
    keyTakeaways: z.array(z.string()).default([]),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .default([]),
  }),
});

export const collections = { blog };
