const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const mongoosePaginate=require('mongoose-paginate-v2')

const roleHistorySchema = new Schema({ 

  user: { 
  
    type: mongoose.Schema.Types.ObjectId, 

    ref: 'user' 

}, 
    Role: { 
  
      type: mongoose.Schema.Types.ObjectId, 
  
      ref: 'role' 
  
  }, 
  
  startDate:{type:Date,required: true} ,
  endDate:{type:Date,required: true}
  
   }); 
  roleHistorySchema.plugin(mongoosePaginate)
  const RoleHistory = mongoose.model('RoleHistory', roleHistorySchema); 
  
  module.exports = RoleHistory; 
