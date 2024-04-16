const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const resultSchema = new Schema({
  dataSet: [
    {
      type: Object
    }
  ],
  host: {
    type: String
  },
  client: {
    type: String
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
    required: true
  },
  files: [
    {
      type: Object
    }
  ],
  gStatus: {
    type: String,
    enum: ['Good', 'Warning', 'Critical'],
    required: true
  }
},
  {
    timestamps: true
  }

);
resultSchema.plugin(mongoosePaginate);
const Result = mongoose.model('result', resultSchema);

module.exports = Result;
