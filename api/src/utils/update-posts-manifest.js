const fs = require('fs/promises');
const path = require('path');
const { createPostModel } = require('../models/post');
const { createManifestEntry } = require('../models/manifest-entry');

module.exports = updatePostsManifest = async (dataDir, manifestPath) => {
  try {
    const files = await fs.readdir(dataDir);
    const manifest = [];

    for (const filename of files) {
      if (!filename.endsWith('.json')) continue;
      const filePath = path.join(dataDir, filename);

      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const parsedContent = JSON.parse(fileContent);
        const post = createPostModel(parsedContent);

        if (!post) continue;
        if (!post.filename) continue;

        const manifestEntry = createManifestEntry(post);
        console.debug('manifestEntry', manifestEntry);
        manifest.push(manifestEntry);
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
