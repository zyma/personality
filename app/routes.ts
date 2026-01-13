import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/root_redirect.tsx"),

  // Language prefixed routes
  route(":lang", "routes/home.tsx"),
  route(":lang/types/:type", "routes/types/profile.tsx"),

  // New Feature Routes
  route(":lang/scenarios", "routes/scenarios.tsx"),
  route(":lang/fandoms", "routes/fandoms.tsx"),
  route(":lang/battle", "routes/battle.tsx"),

  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route(":lang/*", "routes/content.tsx"),
] satisfies RouteConfig;

