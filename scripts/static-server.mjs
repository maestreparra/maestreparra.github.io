// Minimal static file server for previewing the `out/` static export during
// Playwright e2e runs. Avoids adding a "serve" devDependency solely to sidestep
// its vulnerable transitive `minimatch` (see `pnpm audit --audit-level=high`).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const safePath = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const candidates = safePath.endsWith("/")
    ? [path.join(root, safePath, "index.html")]
    : [path.join(root, safePath), path.join(root, `${safePath}.html`), path.join(root, safePath, "index.html")];

  for (const candidate of candidates) {
    try {
      const stats = await stat(candidate);
      if (stats.isFile()) return candidate;
    } catch {
      // try next candidate
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");

  if (!file) {
    const notFoundPath = path.join(root, "404.html");
    try {
      const body = await readFile(notFoundPath);
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
    return;
  }

  const ext = path.extname(file);
  const body = await readFile(file);
  res.writeHead(200, { "Content-Type": contentTypes[ext] ?? "application/octet-stream" });
  res.end(body);
});

server.listen(port, () => {
  console.log(`[static-server] serving ${root} at http://127.0.0.1:${port}`);
});
