const Joi = require("joi");

module.exports = (req, res, next) => {
  //joi params validation
  const bodySchema = Joi.object().keys({});

  const querySchema = Joi.object().keys({
    page: Joi.number().optional(),
    size: Joi.number().optional(),
    searchValue: Joi.string().optional(),
  });

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
