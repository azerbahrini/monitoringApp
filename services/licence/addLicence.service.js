const Licence = require('../../models/Licence');

module.exports = async (doc) => {
  try {
    const licences = await Licence.find({ endDate: { $gte: doc.startDate }, customer: doc.customer, isActive: true});
    if (licences.length !== 0) {
      return {
        err: { message: 'Licence Already Exist During This Periode' },
        status: 'error'
      };
    }

    const licenceDocument = await Licence.create({ ...doc });
    if (!licenceDocument) {
      return {
        err: { message: 'Licence creation problem' },
        status: 'error'
      };
    }

    return { data: licenceDocument, status: 'success' };
  } catch (err) {
    return { err, status: 'error' };
  }
};
