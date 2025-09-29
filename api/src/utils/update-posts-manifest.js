const fs = require('fs/promises');
const path = require('path');

module.exports = updatePostsManifest = async (dataDir, manifestPath) => {
  try {
    const files = await fs.readdir(dataDir);
    const manifest = [];

    for (const filename of files) {
      if (!filename.endsWith('.json')) continue;
      const filePath = path.join(dataDir, filename);

      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const post = JSON.parse(content);

        manifest.push({
          filename,
          title: post.title || '',
          date: post.date || '',
          type: post.type || '',
          tags: post.tags || [],
          author: post.author || ''
        });
      } catch (err) {
        // skip unreadable files
        // do nothing
      }
    }

    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    return manifest;
  } catch (err) {
    throw new Error('Failed to update posts manifest: ' + err.message);
  }
};
