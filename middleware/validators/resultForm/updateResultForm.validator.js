const Joi = require("joi");

module.exports = (req, res, next) => {
    const bodySchema = Joi.object().keys({
        formSchema: Joi.object().optional(),
        formUISchema: Joi.object().optional(),
        formLimits: Joi.object().optional(),
        monitActTitle: Joi.string().optional(),
        monitoringActivity: Joi.string().optional()
    });
    const querySchema = Joi.object().keys({});

    const bodyValidation = bodySchema.validate(req.body);
    if (bodyValidation.error) {
        const err = {
            res: "error",
            errorUpdateSchema: {
                message: "body : " + bodyValidation.error.details[0].message,
            },
        };

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

        return res.status(400).json(err);
    }

    next();
};
