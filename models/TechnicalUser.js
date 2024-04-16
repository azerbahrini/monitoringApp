const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technicalUserSchema = new Schema({ 
    
    user    :  String,
    password:  String, 
     
  level: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Level' 
   } ,

  techType: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TechType' 
 } ,
   
  client: String,
  note: String,
  url: String,
  host: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'host' 
 } , 
  
  }, 
  
    { 
  
      timestamps: true, 
  
    }); 
  const TechnicalUser = mongoose.model('technicaluser', technicalUserSchema); 
  
  module.exports = TechnicalUser; 
