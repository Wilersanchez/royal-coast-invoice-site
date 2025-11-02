import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);import bannerUrl from 'url';const __dirname = bannerUrl.fileURLToPath(new URL('.', import.meta.url));

// open-next.config.ts
var open_next_config_default = {
  // Required top-level key
  default: {
    // OpenNext Cloudflare runtime overrides
    override: {
      wrapper: "cloudflare-node",
      // run SSR on Workers (Node compat layer)
      converter: "edge",
      // convert Next output to edge-compatible
      proxyExternalRequest: "fetch",
      // use fetch for outgoing requests
      incrementalCache: "dummy",
      // simple cache; swap for a function if you add KV/R2
      tagCache: "dummy",
      queue: "direct"
      // no queue; use "dummy" or a function if you wire Queues
    }
  },
  // Middleware (Next.js /_middleware, route handlers) runs on edge
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "direct"
    }
  },
  // Some Next/Clerk stacks pull crypto; keep it externalized for edge
  edgeExternals: ["node:crypto"],
  // Optional but explicit — your project layout
  nextDir: ".",
  outDir: ".open-next"
};
export {
  open_next_config_default as default
};
