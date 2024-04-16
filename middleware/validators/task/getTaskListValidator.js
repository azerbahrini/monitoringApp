const Joi = require('joi');
const logger = require('../../../config/logger');

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({
    type: Joi.array().required(),
    state: Joi.array().required(),
    timeZone: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required()
  }).optional();
  const querySchema = Joi.object().keys({
    searchValue: Joi.string().optional(),
    paginate: Joi.boolean().required(),
    page: Joi.number().when('paginate', {is: true, then: Joi.required(), otherwise: Joi.optional()}),
    size: Joi.number().when('paginate', {is: true, then: Joi.required(), otherwise: Joi.optional()})
  }).required()
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
    logger.error(bodyValidation.error.details[0].message, req.baseUrl+req.route.path, req.method, req.ip)

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
    logger.error(queryValidation.error.details[0].message, req.baseUrl+req.route.path, req.method, req.ip)

    return res.status(400).json(err);
  }
  next();
};