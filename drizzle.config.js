import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",

  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_3yBACuZIljF5@ep-hidden-union-a5biqic8-pooler.us-east-2.aws.neon.tech/Interview.AI?sslmode=require',
  },
});
