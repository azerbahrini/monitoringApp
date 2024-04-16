const Joi = require("joi");
const logger = require("../../../config/logger");

module.exports = (req, res, next) => {
  //Joi body validation
  const bodySchema = Joi.object()
    .keys({
        formSchema: Joi.object().required(),
        formUISchema: Joi.object().required(),
        formLimits: Joi.object().required(),
        monitActTitle: Joi.string().required(),
        monitoringActivity: Joi.string().required()
    })
    .required();

    const querySchema = Joi.object().keys({});
  const bodyValidation = bodySchema.validate(req.body);
  if (bodyValidation.error) {
    const err = {
      res: "error",
      errorUpdateSchema: {
        message: "body : " + bodyValidation.error.details[0].message,
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
