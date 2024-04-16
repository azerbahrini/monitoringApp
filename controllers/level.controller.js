const LevelService = require("../services/level");

exports.updateLevel = async function (req, res) {
  const result = await LevelService.updateLevel(
    { _id: req.params.id },
    req.body
  );
  if (result.status == "success") res.status(201).json({ data: result.data });
  if (result.status == "error")
    res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};

exports.addLevel = async function (req, res) {
  const result = await LevelService.addLevel(req.body);
  if (result.status == "success") res.status(201).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};
exports.getAllLevels = async function (req, res) {
  let page = req.query.page
  let size = req.query.size
  const result = await LevelService.getAllLevel(page, size);
  if (result.status == "success") res.status(200).json({ data: result.data });
  if (result.status == "error")
    res.status(400).json({ message: result.err.message });
};
