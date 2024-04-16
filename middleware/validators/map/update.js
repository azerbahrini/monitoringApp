const Joi = require("joi");

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({
    periodicity: Joi.string().optional(),
    active: Joi.boolean().optional(),
    estimation: Joi.string().optional(),
    task: Joi.string().optional(),
    system: Joi.string().optional(),
    monitoringAct: Joi.string().optional(),
    startTime: Joi.string().optional(),
  });
  const querySchema = Joi.object().keys({
    timeZone: Joi.string().required(),
  }).required();

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
