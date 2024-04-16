const CustomerContact = require("../../models/CustomerContact");
const System = require("../../models/System");
const getContactList = require("../../services/system/getContactList");

function getUnassigned(tab1, tab2) {
  const output = tab1?.filter(
    ({ _id: id1 }) =>
      !tab2?.some(({ _id: id2 }) => id2.toString() === id1.toString())
  );
  return output.map((item) => ({
    _id: item._id,
    lastName: item.lastName,
    mail: item.mail,
    phoneNumber: item.phoneNumber
  }));
}
module.exports = async (customerId, systemId) => {
  try {
    let unssignedListContact = [];
    const systemContacts = await getContactList(systemId);
    const customerContacts = await CustomerContact.find({
      customer: customerId,
      isActive: true
    })
      .lean()
      .exec();
    unssignedListContact = getUnassigned(customerContacts, systemContacts.data);
    if (unssignedListContact.length === 0) {
      return {
        data: "All Customer Contact are assigned to system",
        status: "success"
      };
    }
    return {
      data: unssignedListContact,
      status: "success"
    };
  } catch (err) {
    console.error(err);
    return {
      err,
      status: "error"
    };
  }
};
