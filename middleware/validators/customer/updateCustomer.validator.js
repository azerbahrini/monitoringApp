const Joi = require("joi");
const logger = require("../../../config/logger");

module.exports = (req, res, next) => {
  //joi body validation
  const bodySchema = Joi.object().keys({
    isActive: Joi.boolean().optional(),
    label: Joi.string().optional(),
    timeZone: Joi.string().optional(),
    address: Joi.string().optional(),
    firstReport: Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    listMonitoringType: Joi.string().allow("").optional(),
  });
  const fileSchema = Joi.object()
    .keys({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      path: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(),
      destination: Joi.string().required(),
      size: Joi.number().required(),
      filename: Joi.string().required(),
    })
    .optional();
  const querySchema = Joi.object().keys({
    timeZone: Joi.string().required()
  });

  const bodyValidation = bodySchema.validate(req.body);
  if (bodyValidation.error) {
    const err = {
      res: "error",
      errorUpdateSchema: {
        message: "body : " + bodyValidation.error.details[0].message,
      },
    };
    logger.error(
      "body : " + bodyValidation.error.details[0].message,
      req.baseUrl + req.route.path,
      req.method,
      req.ip
    );

    return res.status(400).json(err);
  }
  const fileValidation = fileSchema.validate(req.file);
  if (fileValidation.error) {
    const err = {
      res: "error",
      errorUpdateSchema: {
        message: "file : " + fileValidation.error.details[0].message,
      },
    };
    logger.error(
      fileValidation.error.details[0].message,
      req.baseUrl + req.route.path,
      req.method,
      req.ip
    );

    return res.status(400).json(err);
  }
  const queryValidation = querySchema.validate(req.query);
  if (queryValidation.error) {
    const err = {
      res: "error",
      errorUpdateSchema: {
        message: "query : " + queryValidation.error.details[0].message,
      },
    };
    logger.error(
      queryValidation.error.details[0].message,
      req.baseUrl + req.route.path,
      req.method,
      req.ip
    );

    return res.status(400).json(err);
  }

  next();
};
