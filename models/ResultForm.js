const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");


const resultFormSchema = new Schema(
    {
        formSchema: {
            type: Object,
            required: true
        },
        formUISchema: {
            type: Object,
            required: true
        },
        formLimits: {
            type: Object,
            required: true
        },
        monitoringActivity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'monitoringAct',
            required: true
        },
        monitActTitle: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }
    }
);
resultFormSchema.plugin(mongoosePaginate);
const ResultForm = mongoose.model('resultForm', resultFormSchema); 
module.exports = ResultForm; 
