/**
 * Generates the version number at compile time, which is displayed in the footer.
 */
import { writeFileSync } from 'node:fs';
const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const version = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(
  now.getDate()
)}.${pad(now.getHours())}${pad(now.getMinutes())}`;
writeFileSync('src/version.ts', `export const VERSION = "${version}";\n`);
