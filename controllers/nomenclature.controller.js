const logger = require("../config/logger")
const nomenclatureService = require("../services/nomenclature")

exports.getAllNomenclature = async function (req, res) {
  const intermediateShift = (req.query.intermediateShift === "true");
  const conditions = !intermediateShift ? { name: { $ne: "intermediate shift" } } : {};
  const result = await nomenclatureService.getAllNomenclature(conditions);
  if (result.status == "success") {
    logger.info(
      "get All nomenclature success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get All nomenclature :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
}
