import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    topic: z.string().optional(),
    cover: z
      .object({ src: z.string(), alt: z.string(), caption: z.string().optional() })
      .optional(),
    url: z.string().startsWith('/'),
    lang: z.enum(['en', 'es']),
    date: z.coerce.date(),
    type: z.enum(['post', 'page', 'home']),
    published: z.boolean().default(true),
    translationKey: z.string().optional(),
    description: z.string().optional(),
    comments: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    feature: z.string().optional(),
  }),
});
export const collections = { blog };
