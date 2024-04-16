const Joi = require("joi");

exports.validateAdd = (req, res, next) => {

    //joi params validation
  const schema = Joi.object().keys({
    libelle: Joi.string().required()


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
    console.error(err)

    return res.status(400).json(err);
    
  }
  
  next();
}