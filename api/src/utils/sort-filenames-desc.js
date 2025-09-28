module.exports = sortFilenamesDesc = (files) => {
  return files.sort((a, b) => b.localeCompare(a));
};
