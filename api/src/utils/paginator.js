module.exports = paginator = {
  paginate: (array, page = 1, pageSize = 10) => {
    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(pageSize) || pageSize < 1) pageSize = 10;
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
    defaultPageSize = 10,
    defaultType = 'all'
  ) => {
    let {
      page = defaultPage,
      pageSize = defaultPageSize,
      type = defaultType
    } = req.query;

    page = parseInt(page, 10);
    pageSize = parseInt(pageSize, 10);

    if (isNaN(page) || page < 1) page = defaultPage;
    if (isNaN(pageSize) || pageSize < 1) pageSize = defaultPageSize;
    if (!type) type = defaultType;

    return { page, pageSize, type };
  }
};
