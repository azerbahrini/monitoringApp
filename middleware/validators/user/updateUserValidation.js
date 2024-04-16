const Joi = require("joi");
module.exports = (req, res, next) => {
  //joi params validation
  const bodySchema = Joi.object()
    .keys({
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      phoneNumber: Joi.string().optional(),
      roles: Joi.array().min(1).required()
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
