const logger = require("../config/logger");
const hostServices = require("./../services/host");
const systemService = require("../services/system");

module.exports = {
  addHostController: async (req, res) => {
    const result = await hostServices.addHost(req.body);
    if (result.status == "success") {
      return res.status(201).json({ data: result.data });
    } else {
      return res.status(400).json({ message: result.err.message });
    }
  },

  getAllHostBySystem: async (req, res) => {
    searchValue = req.query.searchValue

    const result = await hostServices.getAllBySystem(req.params.sysId , searchValue);
    //console.log(req.params.sysId)
    if (result.status == "success") {
      return res.status(200).json({ data: result.data });
    } else {
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  },
  getHostByIdController: async (req, res) => {
    hostId = req.params.id;
    const result = await hostServices.getHostByID(hostId);
    if (result.status == "success") {
      return res.status(200).json({ data: result.data });
    } else {
      res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  },

  updateHostController: async (req, res) => {
    hostId = req.params.id;
    const result = await hostServices.updateHost(hostId, req.body);
    if (result.status == "success") {
      return res.status(201).json({ data: result.data });
    } else {
      res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  },

  deleteHostController: async (req, res) => {
    hostId = req.params.id;
    const result = await hostServices.deleteHost(hostId);
    if (result.status == "success") {
      return res.status(204).json({ data: result.data });
    } else {
      res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  },
};
