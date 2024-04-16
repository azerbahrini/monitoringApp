const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const Categoryschema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

Categoryschema.plugin(mongoosePaginate);
const Category = mongoose.model('category', Categoryschema); 
module.exports = Category; 