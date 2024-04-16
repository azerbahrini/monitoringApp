const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const Shiftschema = new Schema({
  shiftId: {
    type: String
  },
  userMicrosoftId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role",
    default: "5fa02d8f785e4681ddfa3a6d"
  },
  name: {
    type: String,
    required: true,
  },
  startDate:{
    type:Date,
    required: true
  },
  endDate:{
    type:Date,
    required: true
  },
  type: {
    type: String,
    enum: ["app", "shift"]
  },
  updatedShiftAt:{
    type:Date,
    required: true
  },
  reference: {
    type: String
    },
  theme: {
    type: String
  },
  color: {
    type: String
  },
  typeId: {
    type: String
  }
},
  {
    timestamps: true,
  }
);

Shiftschema.plugin(mongoosePaginate);

const Shift = mongoose.model("shift", Shiftschema);
module.exports = Shift;
