const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ['Other', 'Monitoring', 'Other Monitoring'],
      default: 'Monitoring'
    },

    map: {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'map'
    },

    globalStatus: {
      type: String,
      enum: ['Good', 'Warning', 'Critical'],
      default: 'Good'
    },

    priority: {
      type: Number
    },

    estimatedStart: Date,

    timeSpent: Number,

    state: {
      type: String,
      enum: [
        'Pending',
        'In progress',
        'Done',
        'Canceled',
        'To be validated',
        'Rejected',
        'Deleted',
        'Completed'
      ],
      default: 'Pending'
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },

    system: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'system'
    },

    resultat: { type: String }
  },

  {
    timestamps: true
  }
);
taskSchema.plugin(mongoosePaginate);
taskSchema.plugin(aggregatePaginate);

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
