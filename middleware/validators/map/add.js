const Joi = require("joi");

module.exports = (req, res, next) => {
  //joi params validation
  const schema = Joi.object().keys({
    periodicity: Joi.string().required(),
    estimation: Joi.string().optional(),
    task:Joi.string().optional(),
    system: Joi.string().required(),
    monitoringAct: Joi.string().required(),
    startTime: Joi.string().required(),
  });
  const querySchema = Joi.object().keys({
    timeZone: Joi.string().required(),
  }).required();
  const { value, error } = schema.validate(req.body);

  if (error && error.details) {
   // console.log(error.details[0].message);
    const err = {
      res: "error",
      error: {
        message: error.details[0].message,
        type: error.details[0].type,
        code: 110,
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
