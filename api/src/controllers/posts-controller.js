const fs = require('fs/promises');
const path = require('path');
const getPostFilename = require('../utils/post-filename');
const sortFilenamesDesc = require('../utils/sort-filenames-desc');
const paginator = require('../utils/paginator');
const readJsonFiles = require('../utils/read-json-files');
const updatePostsManifest = require('../utils/update-posts-manifest');

const DATA_DIR = path.resolve(__dirname, '../../../public/data');
const MANIFEST_PATH = path.resolve(DATA_DIR, 'posts-manifest.json');

module.exports = postsController = {
  get: async (req, res) => {
    try {
      const { page, pageSize } = paginator.parsePaginationParams(req);

      let files = await fs.readdir(DATA_DIR);
      files = files.filter((f) => f !== 'posts-manifest.json');
      files = sortFilenamesDesc(files);

      const {
        items: pagedFiles,
        total,
        totalPages
      } = paginator.paginate(files, page, pageSize);

      const posts = await readJsonFiles(DATA_DIR, pagedFiles);

      res.json({
        posts,
        page,
        pageSize,
        total,
        totalPages
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getByFilename: async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(DATA_DIR, filename);
      if (!filePath.startsWith(DATA_DIR)) {
        return res.status(400).json({ error: 'Invalid file path' });
      }
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const post = JSON.parse(fileContent);
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  save: async (req, res) => {
    try {
      const { title, content, type, tags, author, blocks, date } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Missing title or content' });
      }

      const postDate = date ? new Date(date) : new Date();
      const filename = getPostFilename(title, postDate);
      const filePath = path.join(DATA_DIR, filename);

      if (!filePath.startsWith(DATA_DIR)) {
        return res.status(400).json({ error: 'Invalid file path' });
      }

      await fs.writeFile(
        filePath,
        JSON.stringify(
          {
            title,
            content,
            type,
            tags,
            author,
            blocks,
            date: postDate.toISOString()
          },
          null,
          2
        ),
        'utf-8'
      );

      await updatePostsManifest(DATA_DIR, MANIFEST_PATH);

      res.json({ message: 'Post saved', filename });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { file } = req.body;
      const filePath = path.join(DATA_DIR, file);

      if (!filePath.startsWith(DATA_DIR)) {
        return res.status(400).json({ error: 'Invalid file path' });
      }

      await fs.unlink(filePath);

      // Update manifest after deleting post
      await updatePostsManifest(DATA_DIR, MANIFEST_PATH);

      res.json({ message: 'File deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
