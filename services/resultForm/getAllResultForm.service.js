const ResultForm = require('./../../models/ResultForm');

module.exports = async (page, size, paginate, searchValue) => {
    try {
    const options = {
        offset: page * size,
        limit: size,
        pagination: paginate
      }
      const docs = await ResultForm.paginate(
        {
          isActive: true,
          monitActTitle: { $regex: searchValue ? searchValue : ".", $options: "i" },
        },
        options
      );
      return { data: docs, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };