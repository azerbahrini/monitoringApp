const User = require("../../models/User");

module.exports = async (page, size, searchValue) => {
  try {
    options = {
      offset: page * size,
      limit: size,
      select :{password:0},
      lean : true
    };
    const mySearch = searchValue?.split(" ");
    let searchArray = [{ $or: [
      { firstName: { $regex: "", $options: "i" },},
      { lastName: { $regex: "", $options: "i" } },
      { phoneNumber: { $regex: "", $options: "i",},},
      { email: { $regex: "", $options: "i",},},
    ],}]

mySearch?.map((searchFragment) => {
searchArray.push({
  $or: [
      { firstName: { $regex: searchFragment, $options: "i" },},
      { lastName: { $regex: searchFragment, $options: "i" } },
      { phoneNumber: { $regex: searchFragment, $options: "i",},},
      { email: { $regex: searchFragment, $options: "i",},},
    ]
});
})
    const user = await User.paginate(
      {
       isActive: true,
        $and: searchArray,
      },
      options
    )
    return { data: user, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
