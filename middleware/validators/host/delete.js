const Joi = require("joi");

module.exports = (req, res, next) => {
  const querySchema = Joi.object().keys({}).optional();

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
