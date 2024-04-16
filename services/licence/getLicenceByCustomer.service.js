const Licence = require('../../models/Licence');
const logger = require('../../config/logger');
module.exports = async (customer_Id, page, size) => {
  try {
    options = {
      offset: page * size,
      limit: size
    };

    const licence = await Licence.paginate(
      {
        customer: customer_Id,
        isActive: true
      },
      options
    );

    if (licence.totalDocs === 0) {
      return {
        err: {
          message: 'No Licence Exist with this Customer Id:',
          customer_Id
        },
        status: 'error',
        statusCode: 404
      };
    }
    return {
      data: licence,
      status: 'success'
    };
  } catch (err) {
    logger.error('Error occur while Getting Licence By Customer Id :', err);
    return { err, status: 'error' };
  }
};
