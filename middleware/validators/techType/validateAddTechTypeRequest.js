const Joi = require("joi");

function validateAddTechTypeRequest(req, res, next) {
  const schema = Joi.object().keys({
    techtype: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  } else {
    next();
  }
}

module.exports = validateAddTechTypeRequest;
