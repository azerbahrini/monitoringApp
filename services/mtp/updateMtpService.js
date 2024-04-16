const MTP = require('../../models/MTP');
const logger = require('../../config/logger');

module.exports = async (mtpId, mtpData) => {
  try {
    const updatedMtp = await MTP.findOneAndUpdate(
      {
        _id: mtpId,
        isActive: true
      },
      mtpData,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedMtp) {
      return {
        status: 'no data',
        err: { message: 'No MTP matched this criteria !' },
        statusCode: 204
      };
    }

    return {
      status: 'success',
      data: updatedMtp
    };
  } catch (err) {
    logger.error('Update Error :', err);
    return { err, status: 'error' };
  }
};
