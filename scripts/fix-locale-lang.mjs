// Rewrites the static <html lang> to "en" for every generated English page.
// The single root layout renders "es" (the default locale) at build time;
// this keeps each English route programmatically identified as English
// without introducing a second, nested root layout (see the note in
// src/app/layout.tsx).
//
// Hardened invariant (P4-QA-09, extended for P7 and P9): this script FAILS
// the build (non-zero exit) if out/en/ is missing, or if the set of patched
// files does not exactly match the expected English route inventory —
// silently warning and succeeding on a missing/partial/duplicated patch
// would let an unlocalized <html lang="es"> ship under /en/ undetected.
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out", "en");

// Exactly the English route pages expected after P9: Home, the three
// English Core Pages (About, Work, Contact), and the two English case
// studies (VitaLink, BM Envios).
const EXPECTED_RELATIVE_PATHS = [
  "index.html",
  "about/index.html",
  "work/index.html",
  "contact/index.html",
  "work/vitalink-digital-ecosystem/index.html",
  "work/bm-envios-digital-experience/index.html",
].sort();

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const dirExists = await stat(outDir).then(() => true).catch(() => false);
  if (!dirExists) {
    console.error(`[fix-locale-lang] FATAL: ${outDir} does not exist. The /en/ build output is missing.`);
    process.exitCode = 1;
    return;
  }

  const files = await walk(outDir);
  const relativePaths = files.map((file) => path.relative(outDir, file)).sort();

  const missing = EXPECTED_RELATIVE_PATHS.filter((expected) => !relativePaths.includes(expected));
  const unexpected = relativePaths.filter((found) => !EXPECTED_RELATIVE_PATHS.includes(found));

  if (missing.length > 0 || unexpected.length > 0) {
    console.error(
      `[fix-locale-lang] FATAL: expected exactly the English route inventory ${JSON.stringify(EXPECTED_RELATIVE_PATHS)} ` +
        `under out/en/, found ${JSON.stringify(relativePaths)}. Missing: ${JSON.stringify(missing)}. Unexpected: ${JSON.stringify(unexpected)}.`,
    );
    process.exitCode = 1;
    return;
  }

  const changedFiles = [];

  for (const file of files) {
    const original = await readFile(file, "utf8");
    const updated = original.replace(/<html lang="es"/, '<html lang="en"');
    if (updated !== original) {
      await writeFile(file, updated, "utf8");
      changedFiles.push(file);
    }
  }

  if (changedFiles.length !== EXPECTED_RELATIVE_PATHS.length) {
    console.error(
      `[fix-locale-lang] FATAL: expected exactly ${EXPECTED_RELATIVE_PATHS.length} file(s) with lang="es" under out/en/, ` +
        `patched ${changedFiles.length}: ${JSON.stringify(changedFiles)}`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(`[fix-locale-lang] patched lang="en" in ${changedFiles.length} file(s) under out/en/: ${changedFiles.join(", ")}`);
}

await main();
