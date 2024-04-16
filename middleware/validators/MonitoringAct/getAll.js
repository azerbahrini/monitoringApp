const Joi = require("joi");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({}).optional();
  const querySchema = Joi.object().keys({
    page: Joi.number().integer().optional(),
    size: Joi.number().integer().optional(),
    paginate: Joi.boolean().required(),
    isActive: Joi.boolean().optional(),
    searchValue : Joi.string().optional(),
  })
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
    console.error(err);

    return res.status(400).json(err);
  }
  next();
};
