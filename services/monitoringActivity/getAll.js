const MonitoringActivity = require("../../models/MonitoringActivity");
module.exports = async (paginationQuery, page, size, activeFilter , searchValue) => {
  try {
    let paginate = false
    if(paginationQuery === "true"){
      paginate = true
    }
    let options = {
      lean: true,
      offset: page * size,
      limit: size,
      pagination: paginate,
    };

    const mySearch = searchValue?.split(" ");
    let searchArray = [{ $or: [
      {
        activity: { $regex: "", $options: "i" },
      },
      { type: { $regex: "", $options: "i" } },
      {
        description: {
          $regex: "",
          $options: "i",
        },
      },
    ],}]

mySearch?.map((searchFragment) => {

searchArray.push({
  $or: [
    {
      activity: { $regex: searchFragment, $options: "i" },
    },
    { type: { $regex: searchFragment, $options: "i" } },
    {
      description: { $regex: searchFragment, $options: "i",},},
  ],
});

})

    const findFilter = {
      ...activeFilter,
      $and: 
        searchArray
      ,
    };

    const docs = await MonitoringActivity.paginate(findFilter, options);
    return {
      data: docs,
      status: "success",
    };
  } catch (err) {
    console.error(err);
    return {
      err,
      status: "error",
    };
  }
};
