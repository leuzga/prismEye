import { defineCollection, z } from "astro:content";

// Post collection schema
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
});

// Author collection schema
const authorsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .array(
        z
          .object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Define el esquema para about
const aboutCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// Define el esquema para contact
const contactCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// Define el esquema para homepage
const homepageCollection = defineCollection({
  type: "content",
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.object({
        enable: z.boolean().optional(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        content: z.string(),
        image: z.string().optional(),
        bulletpoints: z.array(z.string()).optional(), // Añadido bulletpoints
        button: z
          .object({
            enable: z.boolean().optional(),
            label: z.string(),
            link: z.string(),
          })
          .optional(),
      }),
    ),
  }),
});

// Define el esquema para sections
const sectionsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    enable: z.boolean().optional(),
    description: z.string().optional(),
  }),
});

// Exporta las colecciones
export const collections = {
  blog: blogCollection,
  authors: authorsCollection,
  pages: pagesCollection,
  about: aboutCollection,
  contact: contactCollection,
  homepage: homepageCollection,
  sections: sectionsCollection,
};
