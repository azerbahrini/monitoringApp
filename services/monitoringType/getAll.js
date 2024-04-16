const MonitoringType = require('../../models/MonitoringType');

module.exports = async (page, size, isActive, searchValue) => {
  try {
    const options = {
      offset: page * size,
      limit: size
    }
    if (isActive){
    const docs = await MonitoringType.paginate({isActive: isActive, libelle: { $regex: searchValue ? searchValue : '.', $options: 'i' }}, options)
    return { data: docs, status: 'success' };
    } else {
      const docs = await MonitoringType.paginate({libelle: { $regex: searchValue ? searchValue : '.', $options: 'i' } }, options)
      return { data: docs, status: 'success' };
    }
  } catch (err) {
    return { err, status: 'error' };
  }
};
