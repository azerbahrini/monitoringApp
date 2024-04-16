const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const MTPSchema = new Schema(
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
         required: true
       },
       map: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'map'
       },
       estimatedStart: {
           type: Date,
           required: true
         },
       system: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'system'
        },

    isActive: {
      type: Boolean,
      default: true
    }
  },

  {
    timestamps: true
  }
);

MTPSchema.plugin(mongoosePaginate);
const MTP = mongoose.model('mtp', MTPSchema);
module.exports = MTP;