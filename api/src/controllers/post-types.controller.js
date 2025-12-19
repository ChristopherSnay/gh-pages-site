const fs = require('fs/promises');
const path = require('path');
const DATA_DIR = path.resolve(__dirname, '../../../public/data');
const MANIFEST_PATH = path.resolve(DATA_DIR, 'posts-manifest.json');

module.exports = postTypesController = {
  get: async (_req, res) => {
    try {
      const manifest = await fs.readFile(MANIFEST_PATH, 'utf-8');
      const manifestData = JSON.parse(manifest);
      const postTypes = [...new Set(manifestData.map((entry) => entry.type))];
      res.json({ data: postTypes });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
