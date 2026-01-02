const fs = require('fs/promises');
const path = require('path');
const getPostFilename = require('../utils/post-filename');
const sortFilenamesDesc = require('../utils/sort-filenames-desc');
const paginator = require('../utils/paginator');
const readJsonFiles = require('../utils/read-json-files');
const updatePostsManifest = require('../utils/update-posts-manifest');
const { createPostModel } = require('../models/post');
const DATA_DIR = path.resolve(__dirname, '../../../public/data');
const MANIFEST_PATH = path.resolve(DATA_DIR, 'posts-manifest.json');

module.exports = postsController = {
  get: async (req, res) => {
    try {
      const { page, pageSize, type, tags } = paginator.parsePaginationParams(req);

      const manifest = await fs.readFile(MANIFEST_PATH, 'utf-8');
      let manifestData = JSON.parse(manifest);

      if (type && type !== 'all') {
        manifestData = manifestData.filter((entry) => entry.type === type);
      }

      if (tags && tags.length > 0) {
        manifestData = manifestData.filter((entry) =>
          tags.every((tag) => entry.tags.includes(tag))
        );
      }

      // Sort by date descending
      manifestData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const {
        items: pagedManifest,
        total,
        totalPages
      } = paginator.paginate(manifestData, page, pageSize);

      res.json({
        data: {
          posts: pagedManifest,
          page,
          pageSize,
          total,
          totalPages
        }
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
      res.json({ data: post });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  save: async (req, res) => {
    try {
      const { title, type, tags, author, blocks, cover, date } = req.body;
      const missingFields = [];
      if (!title) {
        missingFields.push('title');
      }
      if (!blocks) {
        missingFields.push('blocks');
      }
      if (missingFields.length > 0) {
        return res
          .status(400)
          .json({ error: `Missing fields: ${missingFields.join(', ')}` });
      }

      const postDate = new Date();
      const filename = getPostFilename(title, postDate);
      const filePath = path.join(DATA_DIR, filename);

      if (!filePath.startsWith(DATA_DIR)) {
        return res.status(400).json({ error: 'Invalid file path' });
      }

      const post = createPostModel({
        filename,
        title,
        type,
        tags,
        author,
        blocks,
        cover,
        date: date || postDate.toISOString()
      });

      await fs.writeFile(filePath, JSON.stringify(post, null, 2), 'utf-8');

      await updatePostsManifest(DATA_DIR, MANIFEST_PATH);

      res.json({ message: 'Post saved', data: post });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { filename, title, blocks, type, tags, author, date, cover } = req.body;
      const missingFields = [];

      if (!filename) {
        missingFields.push('filename');
      }
      if (!title) {
        missingFields.push('title');
      }
      if (!blocks) {
        missingFields.push('blocks');
      }

      if (missingFields.length > 0) {
        return res
          .status(400)
          .json({ error: `Missing fields: ${missingFields.join(', ')}` });
      }
      const finalFilename = filename || getPostFilename(title, postDate);
      const filePath = path.join(DATA_DIR, finalFilename);
      const updatedDate = new Date().toISOString();

      if (!filePath.startsWith(DATA_DIR)) {
        return res.status(400).json({ error: 'Invalid file path' });
      }

      const post = createPostModel({
        filename: finalFilename,
        title,
        type,
        tags,
        author,
        cover,
        blocks,
        date,
        updated: updatedDate
      });

      await fs.writeFile(filePath, JSON.stringify(post, null, 2), 'utf-8');
      await updatePostsManifest(DATA_DIR, MANIFEST_PATH);
      res.json({ message: 'Post updated', data: post });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { filename } = req.params;
      const filePath = path.join(DATA_DIR, filename);

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
