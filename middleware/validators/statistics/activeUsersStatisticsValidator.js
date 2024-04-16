const Joi = require('joi');

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({}).required();
  const querySchema = Joi.object().keys({
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    customerID: Joi.string().allow(null),
    systemID: Joi.string().allow(null),
    timeZone: Joi.string().required()
  }).required();
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
      error: {
        message:
          'query : ' +
          queryValidation.error.details
            .map((detail) => detail.message)
            .join(' , ')
      }
    };

    return res.status(400).json(err);
  }
  next();
};
