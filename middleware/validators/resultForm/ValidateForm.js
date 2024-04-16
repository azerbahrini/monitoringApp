const Joi = require('joi');
const {getResultFormByTaskId} = require('../../../services/resultForm')

module.exports = async (taskId, formObject
) => {
  try {
    if (!formObject.gStatus || !formObject.task ) {
      const error = {
        message:
          'form validation : gStatus | taskId undefined'
      };

      return { error, status: 'error' };
    }
    const resultForm = await getResultFormByTaskId(taskId);
    if (resultForm.code !== 200) {
      return {
        error: resultForm.error,
        status: 'success'
      };
    }

    resultForm.data.resultFormConfig.formSchema.properties = resultForm.data.resultFormConfig.formSchema.properties ?? {
      ...resultForm.data.resultFormConfig.formSchema.oneOf[0].properties,
      ...resultForm.data.resultFormConfig.formSchema.oneOf[1].properties
    };

    resultForm.data.resultFormConfig.formSchema.required = resultForm.data.resultFormConfig.formSchema.required ?? []

    const globalSchema = {};
    for (const key in resultForm.data.resultFormConfig.formSchema.properties) {
      let childSchema;
      const field = resultForm.data.resultFormConfig.formSchema.properties[key];
      const required = resultForm.data.resultFormConfig.formSchema.required.includes(key);
      switch (field.type) {
        case 'string':
          childSchema = Joi.string();
          break;
        case 'number':
          childSchema = Joi.number();
          break;
        case 'boolean':
          childSchema = Joi.boolean();
          break;
      }
      required ? childSchema = childSchema.required() : childSchema = childSchema.optional();
      field.enum && (
        field.enum.forEach(element => {
          childSchema = childSchema.valid(element);
        })
      );
      field.pattern && (childSchema = childSchema.regex(new RegExp(field.pattern, 'i')));
      globalSchema[key] = childSchema;
    }

    const formValidation = Joi.array().items(
      Joi.object({ ...globalSchema }).optional()
    ).required()
      .validate(JSON.parse(formObject.dataSet));

    if (formValidation.error) {
      const error = {
        message:
          'form validation : ' +
          formValidation.error.details
            .map((detail) => detail.message)
            .join(' , ')
      };

      return { error, status: 'error' };
    }
    return { data: true, status: 'success' };

  } catch (error) {
    return { error, status: 'error' };
  }
}