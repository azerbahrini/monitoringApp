const Shift = require('../../models/Shift');
module.exports = async (userId, start, end) => {
  try {
    const memberShift = await Shift.findOne({
        user: userId,
        type: 'shift',
        $or: [
            {
                startDate: {$gte: start, $lt: end}
            },
            {
                endDate: {$gt: start, $lt: end}
            }
        ]
    })
    .lean()
    .exec();

    if (memberShift) {
    return { data: memberShift, status: 'success' };
    }

    return { data: 'no shift', status: 'success' };

  } catch (err) {
    return { err, status: 'error' };
  }
};
