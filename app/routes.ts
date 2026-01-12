import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("types/:type", "routes/types/profile.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route(":lang/*", "routes/content.tsx"),
] satisfies RouteConfig;

