const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const levelSchema = new Schema({ 

    label: {
        type: Number,
        required: true
    }
  
   }); 
  
levelSchema.plugin(mongoosePaginate);
const Level = mongoose.model('Level', levelSchema); 
  
module.exports = Level; 