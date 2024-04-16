const Joi = require('joi');

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({}).required();
  const querySchema = Joi.object().keys({
    startDate: Joi.string().optional(),
    endDate: Joi.string().optional(),
    assigneeId: Joi.string().optional(),
    globalStatus: Joi.string().optional(),
    systemID: Joi.string().optional(),
    state: Joi.string().optional(),
    searchValue: Joi.string().optional(),
    customerId: Joi.string().optional(),
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