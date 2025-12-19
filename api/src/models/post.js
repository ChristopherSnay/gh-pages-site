function createPostModel({
  filename,
  title,
  type,
  tags,
  author,
  cover,
  blocks,
  date,
  updated
}) {
  return {
    filename,
    title,
    type,
    tags,
    author,
    cover,
    blocks,
    date,
    updated
  };
}

module.exports = {
  createPostModel
};
