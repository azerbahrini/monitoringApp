const SlaContract = require('../../models/SlaContract');
const logger = require('../../config/logger');
const mongoose = require('mongoose');

module.exports = async (customerId, page, size, searchValue) => {
  try {
    const options = {
      page: page,
      limit: size
    };

    const slaContracts = SlaContract.aggregate([
      {
        '$match': {
          'customer': mongoose.Types.ObjectId(customerId),
          'isActive': true
        }
      }, {
        '$lookup': {
          'from': 'sysclasses',
          'localField': 'class',
          'foreignField': '_id',
          'as': 'class'
        }
      }, {
        '$unwind': {
          'path': '$class',
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$match': {
          'class.libelle': { $regex: searchValue ? searchValue : '.', $options: 'i' }
        }
      }
    ])

    const paginatedSla = await SlaContract.aggregatePaginate(slaContracts, options)

    if (slaContracts.totalDocs === 0) {
      return {
        err: { message: 'No Sla Contracts match this criteria !' },
        status: 'error',
        statusCode: 404
      };
    }
    return {
      data: paginatedSla,
      status: 'success'
    };
  } catch (err) {
    logger.error('Get by Customer Error :', err);
    return { err, status: 'error' };
  }
};
