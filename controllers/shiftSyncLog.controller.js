const syncShiftService = require('../services/syncShiftLog');

exports.getLatestSyncLog = async function (req, res) {
  const result = await syncShiftService.getLastSyncLog();

  if (result.status === 'success') {
return res.status(200).json({ data: result.data });
} else {
res.status(400).json({ message: result.err.message });
}
};
