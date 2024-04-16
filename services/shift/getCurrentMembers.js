const Shift = require('../../models/Shift');
module.exports = async (start, end, shiftName) => {
  try {
    // const currentDate = moment().utc().format();
    const currentShifts = await Shift.find({
      $or: [
        {
          $and: [
            { endDate: { $lte: end } },
            { startDate: { $gte: start } },
            { type: 'shift' },
            {name: shiftName}
          ]
        },
        {
          $and: [
            { endDate: { $gte: start } },
            { endDate: { $lte: end } },
            { type: 'shift' },
            {name: 'intermediate shift'}
          ]
        },
        {
          $and: [
            {startDate: { $gte: start } },
            {startDate: {$lte: end}},
            { type: 'shift' },
            {name: 'intermediate shift'}
          ]
        }

      ]
    })
      .populate('user', '-password -accessToken')
      .lean()
      .exec();
    if (currentShifts.length > 0) {
      const users = currentShifts.map((shift) => shift.user).map(item => item)
      .filter((value, index, self) => self.indexOf(value) === index);
      return { data: users, status: 'success' };
    } else {
      return { err: { message: 'No shifts can be found.' }, status: 'error' };
    }
  } catch (err) {
    return { err, status: 'error' };
  }
};
