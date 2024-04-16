const getAllClients = require("./getAll");
const getClientById = require("./getById");
const updateClient = require("./update");
const addClient = require("./add");
const deleteClient = require("./delete");
const getCategoryByType = require("./getCategoryByType");
const getTypeByCategory = require("./getTypeByCategory");
const getClientsBySystemId = require("./getClientsBySystemId");
module.exports = {
  getAllClients,
  getClientById,
  updateClient,
  addClient,
  deleteClient,
  getCategoryByType,
  getTypeByCategory,
  getClientsBySystemId,
};
