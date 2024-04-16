const { getRolesPermission } = require('../services/authorization/getUserAuthorization');

module.exports = async (req, res, next) => {
  try {
    if (req.user?.id) {
      const permissions = await getRolesPermission(req.user.id)
      if (permissions.data) {
        const userPermissions = [];
        const userRelatedPermissions = [];
        permissions.data.map(item => {
          item.populatedPermissions.map(x => (
            userPermissions.push({
              route: x.route,
              type: x.type
            })
          ))
          item.relatedPermissions.map(x => (
            userRelatedPermissions.push({
              route: x.route,
              type: x.type
            })
          ))
        })
        console.log(userPermissions)
        console.log(userRelatedPermissions)
        if (!userPermissions.some((element) => element.route === req.baseUrl + req.route.path && element.type === req.method)) {
          if (!userRelatedPermissions.some((element) => element.route === req.baseUrl + req.route.path && element.type === req.method)) {
            console.log('Access denied 1')
            return res.status(401).json({ message: 'Access denied' });
          }
        }
        next()
      } else {
        console.log('Access denied 2')
        return res.status(401).json({ message: 'Access denied' });
      }
    } else {
      return res.status(500).json({ message: 'Server Error' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
