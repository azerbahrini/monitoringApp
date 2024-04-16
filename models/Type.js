const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const Typeschema = new Schema(
  {
    isActive: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

Typeschema.plugin(mongoosePaginate);
Typeschema.index({
  type: 1,
  active: 1
}, {
  unique: true
})
const Type = mongoose.model('type', Typeschema); 
module.exports = Type; 
