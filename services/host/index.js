const addHost = require("./addHost");
const getHostByID = require("./getHostById");
const updateHost = require("./updateHost");
const deleteHost = require("./deleteHost");
const getAllBySystem = require("./getAllHostsBySystem");

module.exports = {
  addHost,
  getHostByID,
  updateHost,
  deleteHost,
  getAllBySystem
};
