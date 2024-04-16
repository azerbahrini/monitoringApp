const Joi = require("joi");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({}).optional();
  const querySchema = Joi.object().keys({
    timeZone: Joi.string().required(),
  }).required();  const bodyValidation = bodySchema.validate(req.body);
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

    return res.status(400).json(err);
  }
  next();
};
