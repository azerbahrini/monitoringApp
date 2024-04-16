const System = require('../../models/System');
const logger = require('../../config/logger');
module.exports = async (customerId, filter, paginate, page, size) => {
  try {

const findFilter= {
  customer: customerId,
  ...filter
}
    options = {
      offset: page * size,
      limit: size,
      pagination: paginate
    };
    const system = await System.paginate(
        findFilter,
      options
    );
    if (system.totalDocs === 0) {
      return {
        err: { message: 'No  System match this criteria !' },
        status: 'error',
        statusCode: 404
      };
    }
    return {
      data: system,
      status: 'success'
    };
  } catch (err) {
    logger.error('Get by Customer Error :', err);
    return { err, status: 'error' };
  }
};
