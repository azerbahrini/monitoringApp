const Joi = require("joi");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({
    user: Joi.string().required(),
    Role: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
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
