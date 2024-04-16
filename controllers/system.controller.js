const logger = require('../config/logger');
const systemServices = require('../services/system');

//Add system
exports.addSystemController = async function (req, res) {
  const result = await systemServices.addSystemService(req.body);
  if (result.status === 'success') {
    return res.status(201).json({ data: result.data });
  } else {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get system by Id
exports.getSystemByIdController = async function (req, res) {
  const result = await systemServices.getSystemByIdService(req.params.id);

  if (result.status === 'success') {
    return res.status(200).json({ data: result.data });
  } else {
    res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get All system
exports.getAllSystemController = async function (req, res) {
  const { page, size, paginate } = req.query;
  const result = await systemServices.getAllSystemService(page, size, paginate);

  if (result.status === 'success') {
    return res.status(200).json({ data: result.data });
  } else {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//update System
exports.updateSystemController = async function (req, res) {
  const result = await systemServices.updateSystemService(
    req.body,
    req.params.id
  );

  if (result.status == 'success') {
    return res.status(201).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//DELETE System  Controller

exports.deleteSystem = async function (req, res) {
  const result = await systemServices.deleteSystemService(req.params.id);
  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get All System By Customer Id

exports.getAllSystemByCustomerId = async function (req, res) {
  let customer_Id = req.params.customer_Id;
  let page = req.query.page;
  let size = req.query.size;
  const result = await systemServices.getAllSystemByCustomerId(
    customer_Id,
    page,
    size
  );

  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

// Add Contact To a System

exports.addSystemContact = async function (req, res) {
  const result = await systemServices.addCustomerContactToSystem(
    req.body.listContact,
    req.params.id
  );

  if (result.status == 'success') {
    return res.status(201).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

// Get All Contacts for a System

exports.getListContact = async function (req, res) {
  const result = await systemServices.getContactList(
    req.params.id,
    req.query.searchValue
  );
  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

// Get All types for a System

exports.getTypes = async function (req, res) {
  const result = await systemServices.getTypes(req.params.customerId);

  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

// Get All Categories for a System

exports.getCategory = async function (req, res) {
  const result = await systemServices.getCategory(
    req.params.customerId,
    req.params.typeId
  );
  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

// Get System By Category ,Type and Customer

exports.getSystemByTypeByCategoryByCustomer = async function (req, res) {
  const result = await systemServices.getSystemByTypeByCategoryByCustomer(
    req.params.customerId,
    req.params.typeId,
    req.params.categoryId
  );

  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get All System categories By Customer Id

exports.getAllCategoriesByCustomerId = async function (req, res) {
  let customer_Id = req.params.customer_Id;

  const result = await systemServices.getAllCategoriesByCustomerId(customer_Id);

  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get All Types By Customer Id and category ID

exports.getAllTypesByCustomerIdCategoryId = async function (req, res) {
  let customer_Id = req.params.customer_Id;
  let category_Id = req.params.category_Id;

  const result = await systemServices.getAllTypesByCustomerIdCategoryId(
    customer_Id,
    category_Id
  );

  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get Systems for Maps
exports.getSystemsForMaps = async function (req, res) {
  const customerId = req.query.customerId;
  const typeId = req.query.typeId;
  const categoryId = req.query.categoryId;
  const systemId = req.query.systemId;

  const result = await systemServices.getSystemsForMapsService(customerId, typeId, categoryId, systemId);

  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res.status(400).json({ message: result.err.message });
  }
};

exports.getSystemsInfoForDashboard = async function (req, res) {

  const customerId = req.params.customerId
  const result = await systemServices.getSystemsInfoForDashboard(customerId);

  if (result.status === 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status === 'error') {
    return res.status(400).json({ message: result.error.message });
  }
}