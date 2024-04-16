const System = require('../../models/System');

module.exports = async (page, size, paginate) => {
  try {
    paginate = paginate === 'true' ? true : false;
    const options = {
      offset: page * size,
      limit: size,
      pagination: paginate
    };
    const systems = await System.paginate({ isActive: true }, options);
    return { data: systems, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
