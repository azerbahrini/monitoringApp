const Joi = require("joi");
const logger = require("../../../config/logger");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({}).optional();
  const querySchema = Joi.object().keys({
    startDate: Joi.string().regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/).required(),
    endDate: Joi.string().regex(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/).required(),
    assigned: Joi.boolean().required(),
    unassigned: Joi.boolean().required(),
    shift: Joi.string().optional(),
    user: Joi.string().optional(),
    timeZone: Joi.string().required(),
    paginate: Joi.boolean().required(),
    page: Joi.number().optional(),
    size: Joi.number().optional(),
  }).required();
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
    logger.error(
      bodyValidation.error.details[0].message,
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
      error: {
        message:
          "query : " +
          queryValidation.error.details
            .map((detail) => detail.message)
            .join(" , "),
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
