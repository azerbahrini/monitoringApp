const Joi = require("joi");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({
    activity: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    isActive: Joi.boolean().required(),
  });
  const querySchema = Joi.object().keys({});
  const { value, error } = bodySchema.validate(req.body);
  if (error) {
    const err = {
      res: "error",
      error: {
        message:
          "body : " + error.details.map((detail) => detail.message).join(" , "),
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
