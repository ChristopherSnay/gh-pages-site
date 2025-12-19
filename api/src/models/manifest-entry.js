function createManifestEntry(data) {
  return {
    filename: data.filename,
    title: data.title || '',
    date: data.date || '',
    type: data.type || '',
    tags: data.tags || [],
    updated: data.updated || '',
    cover: data.cover || '',
    author: data.author || ''
  };
}

module.exports = { createManifestEntry };
