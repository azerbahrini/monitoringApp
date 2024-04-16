const Joi = require('joi');

module.exports = (req, res, next) => {
  // Validate token in header
  const accessToken = req.header('x-auth-accessToken');
  if (!accessToken) {
    return res.status(401).json({
      status: 'error',
      message: 'Access token is required'
    });
  }
    const bodySchema = Joi.object().keys({
        title: Joi.string().optional(),
      text: Joi.string().optional(),
      user: Joi.string().optional()
    });
    const querySchema = Joi.object().keys({});

    const bodyValidation = bodySchema.validate(req.body);
    if (bodyValidation.error) {
        const err = {
            res: 'error',
            errorUpdateSchema: {
                message: 'body : ' + bodyValidation.error.details[0].message
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
