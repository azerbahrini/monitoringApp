const Joi = require("joi");
const { join } = require("path");
module.exports = (req, res, next) => {
  //joi params validation
  const schema = Joi.object().keys({
    clientNumber: Joi.number().required(),
    isActive: Joi.boolean().required(),
    system: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body);
  if (error && error.details) {
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
  next();
};
