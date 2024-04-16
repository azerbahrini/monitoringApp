const Joi = require("joi");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({
    name: Joi.string().optional(),
    //listHost: Joi.array().required(),
    type: Joi.string().optional(),
    category: Joi.string().optional(),
    customer: Joi.string().optional(),
    deployType: Joi.string().optional(),
    deployDesc: Joi.string().optional(),
    fqdn: Joi.string().optional(),
    listInstance: Joi.array().optional(),
   // listMap: Joi.array().optional(),
    listTechnicalUser: Joi.array().optional(),
    listCustomerContact: Joi.array().optional(),
    class: Joi.string().optional(),
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

    return res.status(400).json(err);
  }

  next();
};
