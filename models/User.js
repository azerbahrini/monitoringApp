const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index:true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default : true
    },
    //      shifts:[{

    //        type: mongoose.Schema.Types.ObjectId,
    //        ref: 'Shift'
    //    }],

    Verified: Boolean,
    microsoftId: String,

    RoleHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "RoleHistory",
      },
    ],

    Level: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Level",
    },
    accessToken: {
      type: String
    },
    reset_password_token: {
      type: String,
    },
    reset_password_expires: {
      type: Date,
    },
    // listModule: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,

    //     ref: "module",
    //   },
    // ],
  },

  {
    timestamps: true,
  }
);
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('user' , UserSchema);
module.exports = User;
