const Joi = require("joi");
const logger = require("../../../config/logger");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({}).optional();
  const querySchema = Joi.object().keys({
    customerId: Joi.string().optional(),
    typeId: Joi.string().optional(),
    categoryId: Joi.string().optional(),
    systemId: Joi.string().optional(),
    memberId: Joi.string().required(),
    timeZone: Joi.string().required(),
    teamLeaderId: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional()
  }).required()
  const bodyValidation = bodySchema.validate(req.body);
  if (bodyValidation.error) {
    const err = {
      res: "error",
      error: {
        message:
          "body : " +
          bodyValidation.error.details
            .map((detail) => detail.message)
            .join(" , "),
      },
    };
    logger.error(bodyValidation.error.details[0].message, req.baseUrl + req.route.path, req.method, req.ip)

    return res.status(400).json(err);
  }
  const queryValidation = querySchema.validate(req.query);
  if (queryValidation.error) {
    const err = {
      res: "error",
      error: {
        message:
          "query : " +
          queryValidation.error.details
            .map((detail) => detail.message)
            .join(" , "),
      },
    };
    logger.error(queryValidation.error.details[0].message, req.baseUrl + req.route.path, req.method, req.ip)

    return res.status(400).json(err);
  }
  next();
};