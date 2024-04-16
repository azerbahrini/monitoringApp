const Joi = require('joi');

module.exports = (req, res, next) => {
  const bodySchema = Joi.object().keys({}).required();
  const querySchema = Joi.object().keys({}).required();
  const bodyValidation = bodySchema.validate(req.body);

  // Validate token in header
  const accessToken = req.header('x-auth-accessToken');
  if (!accessToken) {
    return res.status(401).json({
      status: 'error',
      message: 'Access token is required'
    });
  }

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
