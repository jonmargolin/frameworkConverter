import fs from 'fs/promises';
import path from 'path';
export async function findFile(
  fileName: string,
  rootDir: string
): Promise<string | null> {
  const queue = [rootDir];

  while (queue.length > 0) {
    const currentDir = queue.shift()!;
    const excludedDirs = ['node_modules', 'dist', '.git'];
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (!excludedDirs.includes(entry.name)) {
          queue.push(fullPath);
        }
      } else if (entry.name === fileName) {
        return fullPath;
      }
    }
  }

  return null;
}
