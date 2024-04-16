const Joi = require("joi");
const logger = require("../../../config/logger");

module.exports = (req, res, next) => {
  //joi params validation
  const bodySchema = Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required(),
    category: Joi.string().required(),
    customer: Joi.string().required(),
    deployType: Joi.string().optional(),
    deployDesc: Joi.string().optional(),
    fqdn: Joi.string().optional(),
    listInstance: Joi.array().optional(),
    //listMap: Joi.array().optional(),
    listTechnicalUser: Joi.array().optional(),
    listCustomerContact: Joi.array().optional(),
    class: Joi.string().required(),
    isActive: Joi.boolean().optional(),
  });

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
