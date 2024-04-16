const Joi = require("joi");
const logger = require("../../../config/logger");

module.exports = (req, res, next) => {

    //Joi body validation
  const bodySchema  = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    timeZone: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.string().optional(),
    systemDownStart: Joi.date().optional(),
    systemDownEnd: Joi.date().optional(),
    spoc: Joi.string().required(),
    listContact: Joi.array().optional(),
    system:  Joi.string().required(),
    type:  Joi.string().required().valid("planned","unplanned"),
    ticket: Joi.string().required(),
  }).required();

  const querySchema = Joi.object().keys({
    sendMail: Joi.boolean().required()
  }).required();

  const bodyValidation = bodySchema.validate(req.body);
  if (bodyValidation.error) {
    const err = {
      res: "error",
      errorUpdateSchema: {
        message: "body : " + bodyValidation.error.details[0].message,
      },
    };
    logger.error(bodyValidation.error.details[0].message, req.baseUrl+req.route.path, req.method, req.ip)

    return res.status(400).json(err);
  }
  const queryValidation = querySchema.validate(req.query);
  if (queryValidation.error) {
    const err = {
      res: "error",
      errorUpdateSchema: {
        message: "query : " + queryValidation.error.details[0].message,
      },
    };
   logger.error(queryValidation.error.details[0].message, req.baseUrl+req.route.path, req.method, req.ip)

    return res.status(400).json(err);
  }
  
  next();
};

