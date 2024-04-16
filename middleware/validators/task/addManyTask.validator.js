const Joi = require("joi");
const logger = require("../../../config/logger");

module.exports = (req, res, next) => {
  //Joi body validation
  const bodySchema = Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string()
          .required()
          .valid("Other", "Monitoring", "Other Monitoring"),
        priority: Joi.number().optional(),
        estimatedStart: Joi.date().required(),
        timeSpent: Joi.number().optional(),
        state: Joi.string()
          .optional()
          .valid(
            "Pending",
            "In progress",
            "Done",
            "Canceled",
            "To be validated",
            "Rejected",
            "Deleted",
            "Complteted"
          ),
        assignee: Joi.string().required(),
        resultat: Joi.optional(),
        globalStatus: Joi.optional().valid("Good", "Warning", "Critical"),
        system: Joi.string().required(),
        map: Joi.string().required()
      }).required()
    )
    .required();

  const querySchema = Joi.object().keys({}).optional();

  const bodyValidation = bodySchema.validate(req.body);
  if (bodyValidation.error) {
    const err = {
      res: "error",
      errorUpdateSchema: {
        message: "body : " + bodyValidation.error.details[0].message,
      },
    };
    logger.error(
      bodyValidation.error.details[0].message,
      req.baseUrl + req.route.path,
      req.method,
      req.ip
    );

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
    logger.error(
      queryValidation.error.details[0].message,
      req.baseUrl + req.route.path,
      req.method,
      req.ip
    );

    return res.status(400).json(err);
  }

  next();
};
