const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techtypeSchema = new Schema({ 

    techtype: {
        type: String,
        required: true
    }
  
   }); 
  
  const TechType = mongoose.model('TechType', techtypeSchema); 
  
  module.exports = TechType; 
