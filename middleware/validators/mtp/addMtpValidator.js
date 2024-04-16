const Joi = require('joi');

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    map: Joi.string().optional(),
    estimatedStart: Joi.string().required(),
    system: Joi.string().optional()
  });
  const querySchema = Joi.object().keys({
  });
  const bodyValidation = bodySchema.validate(req.body);
  if (bodyValidation.error) {
    const err = {
      res: 'error',
      error: {
        message:
          'body : ' +
          bodyValidation.error.details
            .map((detail) => detail.message)
            .join(' , ')
      }
    };

    return res.status(400).json(err);
  }
  const queryValidation = querySchema.validate(req.query);
  if (queryValidation.error) {
    const err = {
      res: 'error',
      errorUpdateSchema: {
        message: 'query : ' + queryValidation.error.details[0].message
      }
    };

    return res.status(400).json(err);
  }

  next();
};
