const resultFormServices = require("../services/resultForm")
const logger = require("../config/logger");

exports.getFormSchemaByTaskId = async function (req, res) {
    const taskId = req.params.taskId
    const result = await resultFormServices.getResultFormByTaskId(taskId)
    if (result.status === "success" && result.code === 200) {
        return res.status(200).json({ data: result.data });
    } else {
        return res.status(result.code).json({ message: result.error.message });
    }
};
exports.addResultForm = async function (req, res) {
    const result = await resultFormServices.addResultFormService(req.body);
    if (result.status == "success") {
        logger.info(
            "add result form success",
            req.route ? req.baseUrl + req.route.path : "testing",
            req.method ? req.method : "testing",
            req.ip ? req.ip : "testing"
        );
        return res.status(201).json({ data: result.data });
    }
    if (result.status == "error") {
        logger.error(
            "add result form :" + result.err.message,
            req.route ? req.baseUrl + req.route.path : "testing",
            req.method ? req.method : "testing",
            req.ip ? req.ip : "testing"
        );
        return res.status(400).json({ message: result.err.message });
    }
};
exports.getAllResultForm = async function (req, res) {
    const page = req.query.page;
    const size = req.query.size;
    const searchValue = req.query.searchValue ? req.query.searchValue : "";
    const paginate = (req.query.paginate==="true");
    const result = await resultFormServices.getAllResultFormService(page, size, paginate, searchValue);
    if (result.status === "success") {
      logger.info(
        "get all result form success",
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res.status(200).json({ data: result.data });
    }
    if (result.status === "error") {
      logger.error(
        "get All result form :" + result.err.message,
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res.status(400).json({ message: result.err.message });
    }
  };

  exports.getResultFormById = async function (req, res) {
    const result = await resultFormServices.getResultFormByIdService(req.params.id);
    if (result.status == "success") {
      logger.info(
        "get by id Result Form",
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res.status(200).json({ data: result.data });
    }
    if (result.status == "error") {
      logger.error(
        "get by id Result Form :" + result.err.message,
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  };
  exports.updateResultForm = async function (req, res) {
    const result = await resultFormServices.updateResultFormService(req.params.id, req.body);
    if (result.status == "success") {
      logger.info(
        "update Result Form success",
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res.status(201).json({ data: result.data });
    }
    if (result.status == "error") {
      logger.error(
        "update Result Form  :" + result.err.message,
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  };
  exports.deleteResultForm = async function (req, res) {
    const result = await resultFormServices.deleteResultFormService(req.params.id);
    if (result.status == "success") {
      logger.info(
        "delete Result Form success",
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res.status(200).json({ data: result.data });
    }
    if (result.status == "error") {
      logger.error(
        "delete Result Form :" + result.err.message,
        req.route ? req.baseUrl + req.route.path : "testing",
        req.method ? req.method : "testing",
        req.ip ? req.ip : "testing"
      );
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  };
  exports.getMonitoringActivitiesWithoutResultForm = async function (req, res) {
    const result = await resultFormServices.getMonitoringActivitiesWithoutResultFormService();
    if (result.status === 'success') {
      logger.info(
        'get Monitoring Activities Without Result Form success',
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(200).json({ data: result.data });
    } else {
      logger.error(
        'get Monitoring Activities Without Result Forms :' + result.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  };