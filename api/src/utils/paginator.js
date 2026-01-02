module.exports = paginator = {
  paginate: (array, page = 1, pageSize = process.env.DEFAULT_PAGE_SIZE) => {
    page = parseInt(page);
    pageSize = parseInt(pageSize);

    // validate the page and pageSize values
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(pageSize) || pageSize < 1) pageSize = process.env.DEFAULT_PAGE_SIZE;

    const total = array.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      items: array.slice(start, end),
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    };
  },
  parsePaginationParams: (
    req,
    defaultPage = 1,
    defaultPageSize = process.env.DEFAULT_PAGE_SIZE,
    defaultType = 'all',
    defaultTags = ''
  ) => {
    let {
      page = defaultPage,
      pageSize = defaultPageSize,
      type = defaultType,
      tags = defaultTags
    } = req.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);
    tags = tags ? tags.split(',') : [];

    // validate the page and pageSize values
    if (isNaN(page) || page < 1) page = defaultPage;
    if (isNaN(pageSize) || pageSize < 1) pageSize = defaultPageSize;
    if (!type) type = defaultType;

    return { page, pageSize, type, tags };
  }
};
