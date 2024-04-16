const Role = require('../../models/Role');

exports.getRolesPermission = async ( roles, path, type ) => {

  let permission= false;

  try {
    const role = await Role.find( 
      {
         _id : { $in : roles }
         }
         )
         .populate({
          path : 'listModule',
          populate : {
            path : 'listPermission',
            populate : {
              path : 'relatedPermissions'
            }
          }
        })
    .lean()
    .exec();

    if (!role) {
      return res.status(400).json({ message: 'Role not found' });
      
    }
   // console.log("permissions",role[0].listModule[0].listPermission[2])
    role.map( x =>{
      x.listModule.map(z =>{
        z.listPermission.map(y =>{
      
          if((path===y.route)&&(type===y.type))
          {
          permission = true;
          }
        })
        if(permission!==true){
          z.listPermission.map(y =>{
if(permission !==  true){
            y.relatedPermissions.map(w=>{
              if((path===w.route)&&(type===w.type))
          {
          permission = true;
          }
            })
          }
          })
        }
      })
      
    })

    return({
      result: "success",
      data: permission
    })
  } catch (err) {
    console.error(err.message);
    return({
      result: "error",
      message: err.message
    })
  }
}