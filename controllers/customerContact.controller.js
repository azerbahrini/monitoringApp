const { Logger } = require("log4js");
const System = require("../models/System");
const customerContactService = require("../services/customerContact");
const systemService = require("../services/system");

//Add CustomerContact
exports.addCustomerContact = async function (req, res) {
  const result = await customerContactService.addCustomerContact(req.body);
  if (result.status == "success")
    return res.status(201).json({
      data: result.data,
    });
  if (result.status == "error")
    return res.status(400).json({
      message: result.err.message,
    });
};

//Get All CustomerContact
exports.getAllCustomerContact = async function (req, res) {
  const result = await customerContactService.getAllCustomerContact(
    req.query.page,
    req.query.size
  );
  if (result.status == "success")
    return res.status(200).json({
      data: result.data,
    });
  if (result.status == "error")
    return res.status(400).json({
      message: result.err.message,
    });
};

//Get CustomerContact by Id
exports.getCustomerContactById = async function (req, res) {
  const result = await customerContactService.getCustomerContactById(
    req.params.id
  );
  if (result.status == "success")
    return res.status(200).json({
      data: result.data,
    });
  if (result.status == "error")
    return res.status(result.statusCode ? result.statusCode : 400).json({
      message: result.err.message,
    });
};

//Update CustomerContact
exports.updateCustomerContact = async function (req, res) {
  const result = await customerContactService.updateCustomerContact(
    req.body,
    req.params.id
  );
  if (result.status == "success")
    return res.status(201).json({
      data: result.data,
    });
  if (result.status == "error")
    return res.status(result.statusCode ? result.statusCode : 400).json({
      message: result.err.message,
    });
};
//Still didn't do unit test to those controllers

//DeleteCustomerContact and delete the contact from the systems
exports.deleteCustomerContact = async function (req, res) {
  const resultGetCustomerContactById =
    await customerContactService.getCustomerContactById(req.params.id);
  if (resultGetCustomerContactById.status == "error")
    return res
      .status(
        resultGetCustomerContactById.statusCode
          ? resultGetCustomerContactById.statusCode
          : 400
      )
      .json({ message: resultGetCustomerContactById.err.message });

  const sys = await System.find({
    listCustomerContact: resultGetCustomerContactById.data._id,
  });

  if (sys) {
    sys.forEach((s) => {
      if (s.listCustomerContact) {
        let i = 0;
        s.listCustomerContact.forEach((c) => {
          if (c.toString() === req.params.id.toString()) {
            s.listCustomerContact.splice(i, 1);
          }
          System.findOneAndUpdate({ _id: s._id }, s, { new: true })
            .lean()
            .exec();

          i++;
        });
      }
    });
  }

  const resultDeleteCustomerContact =
    await customerContactService.deleteCustomerContact(req.params.id);
  if (resultDeleteCustomerContact.status == "success")
    return res.status(201).json({ data: resultDeleteCustomerContact.data });
  if (resultDeleteCustomerContact.status == "error")
    return res
      .status(
        resultDeleteCustomerContact.statusCode
          ? resultDeleteCustomerContact.statusCode
          : 400
      )
      .json({
        message: resultDeleteCustomerContact.err.message,
      });
};

//Get Customer Contact
exports.getContactByCustomer = async function (req, res) {
  const result = await customerContactService.getCustomerContactByCustomer(
    req.params.customerId,
    req.query.page,
    req.query.size,
    req.query.searchValue
  );
  if (result.status == "success")
    return res.status(200).json({
      data: result.data,
    });
  if (result.status == "error")
    return res.status(400).json({
      message: result.err.message,
    });
};

//addContactToSys
exports.addContactToSys = async function (req, res) {
  const resultFindCustomerContactById =
    await customerContactService.getCustomerContactById(req.body.id);
  if (resultFindCustomerContactById.status === 'error') {
return res
      .status(
        resultFindCustomerContactById.statusCodelistCustomerContact.find()
          ? resultFindCustomerContactById.statusCode
          : 400
      )
      .json({
        message: resultFindCustomerContactById.err.message
      });
}

  const resultFindSystemById = await systemService.getSystemByIdService(
    req.params.systemId
  );

  if (resultFindSystemById.status === "error"){
    return res
      .status(
        resultFindSystemById.statusCode ? resultFindSystemById.statusCode : 400
      )
      .json({ message: resultFindSystemById.err.message });
    }

  const customerContactIndex = resultFindSystemById.data._id

  if (
    customerContactIndex &&
    resultFindSystemById.data?.listCustomerContact.length > 0&&
    resultFindSystemById.data?.listCustomerContact?.find(customerContactIndex)
  ) {
    return res.status(400).json({
      message: 'customerContact already exists in the system'
    });
  }
  const resultUpdateSystem = await systemService.updateSystemService(
    { $push: { listCustomerContact: req.body.id } },
    resultFindSystemById.data._id
  );
  if (resultUpdateSystem.status === 'success') {
return res.status(201).json({
      data: resultUpdateSystem.data
    });
}
  if (resultUpdateSystem.status === 'error') {
return res
      .status(
        resultUpdateSystem.statusCode ? resultUpdateSystem.statusCode : 400
      )
      .json({
        message: resultUpdateSystem.err.message
      });}
};

//deleteContactFromSys
exports.deleteContactFS = async function (req, res) {
  const resultFindCustomerContactById =
    await customerContactService.getCustomerContactById(req.params.customerContactId);
  if (resultFindCustomerContactById.status == "error")
    return res
      .status(
        resultFindCustomerContactById.statusCode
          ? resultFindCustomerContactById.statusCode
          : 400
      )
      .json({
        message: resultFindCustomerContactById.err.message,
      });
  const resultFindSystemById = await systemService.getSystemByIdService(
    req.params.systemId
  );
  if (resultFindSystemById.status == "error")
    return res
      .status(
        resultFindSystemById.statusCode ? resultFindSystemById.statusCode : 400
      )
      .json({ message: resultFindSystemById.err.message });
  let i = 0;
  if (resultFindSystemById.data.listCustomerContact.length == 0) {
    return res.status(400).json({
      message: "listCustomerContact is empty ",
    });
  }
  let customerContactIndex = resultFindSystemById.data.listCustomerContact.find(
    (e) => {
      return e == req.params.customerContactId;
    }
  );

  if (
    !customerContactIndex &&
    resultFindSystemById.data.listCustomerContact.length > 0
  ) {
    return res.status(400).json({
      message: "customerContact doesn't exist in the system",
    });
  }
  const filterArray = resultFindSystemById.data.listCustomerContact.filter(
    (e) => {
      return e != req.params.customerContactId;
    }
  );
  const resultUpdateSystem = await systemService.updateSystemService(
    {
      ...resultFindSystemById.data,
      listCustomerContact: filterArray,
    },
    req.params.systemId
  );
  if (resultUpdateSystem.status == "success")
    return res.status(201).json({
      data: resultUpdateSystem.data,
    });
  if (resultUpdateSystem.status == "error")
    return res
      .status(
        resultUpdateSystem.statusCode ? resultUpdateSystem.statusCode : 400
      )
      .json({
        message: resultUpdateSystem.err.message,
      });
};

// get Unassigned Customer Contact By System

exports.getUnassignedCustomerContactBySystem = async function (req, res) {
  const result =
    await customerContactService.getUnassignedCustomerContactBySystem(
      req.params.customerId,
      req.params.systemId
    );
  if (result.status == "success")
    return res.status(200).json({
      data: result.data,
    });
  if (result.status == "error")
    return res.status(result.statusCode ? result.statusCode : 400).json({
      message: result.err.message,
    });
};
