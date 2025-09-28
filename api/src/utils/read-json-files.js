const fs = require('fs/promises');
const path = require('path');

module.exports = readJsonFiles = async (dir, filenames) => {
  return Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(dir, filename);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        return { ...JSON.parse(content), filename };
      } catch (err) {
        return { error: `Failed to read ${filename}` };
      }
    })
  );
};
