const MAP = require('../../models/MonitoringActivityPlannification');

module.exports = async (systemIds) => {
  try {
    const maps = await MAP.find(
      {
        system: { $in: systemIds },
        active: true
      }
    ).populate(
      [
        { path: 'monitoringAct', select: ['activity', 'description'] },
        {
          path: 'system',
          select: 'name',
          populate: { path: 'customer', select: 'label' }
        }
      ]
    )
    .lean().exec();

    return {
      data: maps,
      status: 'success'
    };
  } catch (err) {
    return { err, status: 'error' };
  }
};
