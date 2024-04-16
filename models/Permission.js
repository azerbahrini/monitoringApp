const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  route: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    required: true
  },

  relatedPermissions: [
    {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'permission'

    }
  ]

},
  {

    timestamps: true

  });
const Permission = mongoose.model('permission', permissionSchema);

module.exports = Permission;
