const CustomerContact = require('../../models/CustomerContact');
module.exports = async (customerId, page, size, searchValue) => {
  try {
    const options = { offset: page * size, limit: size };
    const mySearch = searchValue?.split(' ');
    const searchArray = [
      {
        $or: [
          { lastName: { $regex: '', $options: 'i' } },
          { mail: { $regex: '', $options: 'i' } }
        ]
      }
    ];

    mySearch?.map((searchFragment) => {
      searchArray.push({
        $or: [
          { lastName: { $regex: searchFragment, $options: 'i' } },
          { mail: { $regex: searchFragment, $options: 'i' } }
        ]
      });
    });

    const docs = await CustomerContact.paginate(
      {
        customer: customerId,
        isActive: true,
        $and: searchArray
      },
      options
    );

    return {
      data: docs,
      status: 'success'
    };
  } catch (err) {
    return {
      err,
      status: 'error'
    };
  }
};
