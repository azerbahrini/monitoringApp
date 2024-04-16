const RoleHistory = require('../../models/RoleHistory')

module.exports = async (page, size) => {
  try {
    options = {offset: page * size,limit: size}

    const docs = await RoleHistory.paginate({},options)
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
