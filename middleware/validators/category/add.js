const Joi = require("joi");

module.exports = (req, res, next) => {

    //joi params validation
  const schema = Joi.object()
    .keys({
      isActive: Joi.boolean().required(),
      category: Joi.string().required(),
    })
    .unknown(true);

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
    console.error(err)

    return res.status(400).json(err);
    
  }

  next();
}