// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  contentApiUrlOverride: "/api/tina/gql",
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        defaultItem: () => ({
          exclude: ["**/-index.md"]
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
            }
          },
          router: ({ document }) => `/blog/${document._sys.filename}`,
          beforeSubmit: async ({ values }) => {
            return {
              ...values,
              date: values.date || /* @__PURE__ */ new Date()
            };
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "HH:mm"
            }
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            ui: {
              validate: (value) => {
                if (!value)
                  return "A featured image is required";
              }
            }
          },
          {
            type: "string",
            name: "categories",
            label: "Categories",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "error"]
                  },
                  {
                    name: "content",
                    label: "Content",
                    type: "rich-text"
                  }
                ]
              },
              {
                name: "Image",
                label: "Image",
                fields: [
                  {
                    name: "src",
                    label: "Source",
                    type: "image"
                  },
                  {
                    name: "alt",
                    label: "Alt Text",
                    type: "string"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "authors",
        label: "Authors",
        path: "src/content/authors",
        format: "md",
        defaultItem: () => ({
          exclude: ["**/-index.md"]
        }),
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
            }
          },
          router: ({ document }) => `/authors/${document._sys.filename}`
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "email",
            label: "Email",
            ui: {
              validate: (value) => {
                if (!value?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                  return "Please enter a valid email";
                }
              }
            }
          },
          {
            type: "image",
            name: "image",
            label: "Avatar"
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "social",
            label: "Social Links",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name };
              }
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Platform Name"
              },
              {
                type: "string",
                name: "icon",
                label: "Icon Name"
              },
              {
                type: "string",
                name: "link",
                label: "URL"
              }
            ]
          }
        ]
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        ui: {
          filename: {
            readonly: false
          },
          router: ({ document }) => `/${document._sys.filename}`
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "error"]
                  },
                  {
                    name: "content",
                    label: "Content",
                    type: "rich-text"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "about",
        label: "About",
        path: "src/content/about",
        format: "md",
        defaultItem: () => ({
          exclude: ["**/-index.md"]
        }),
        ui: {
          global: true,
          router: () => "/about"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "error"]
                  },
                  {
                    name: "content",
                    label: "Content",
                    type: "rich-text"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "contact",
        label: "Contact Pages",
        path: "src/content/contact",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "homepage",
        label: "Homepage",
        path: "src/content/homepage",
        format: "md",
        defaultItem: () => ({
          exclude: ["**/-index.md"]
        }),
        ui: {
          global: true,
          router: () => "/"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "error"]
                  },
                  {
                    name: "content",
                    label: "Content",
                    type: "rich-text"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "sections",
        label: "Sections",
        path: "src/content/sections",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "boolean",
            name: "enable",
            label: "Enable Section"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "Callout",
                fields: [
                  {
                    name: "type",
                    label: "Type",
                    type: "string",
                    options: ["info", "warning", "error"]
                  },
                  {
                    name: "content",
                    label: "Content",
                    type: "rich-text"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  cmsCallback: (cms) => {
    cms.flags.set("branch-switcher", true);
    cms.flags.set("rich-text", true);
    return cms;
  }
});
export {
  config_default as default
};
