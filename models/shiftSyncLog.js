const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shiftSyncLogschema = new Schema({
  syncedShifts: { type: Number },
  unSyncedShifts: { type: Number },
  shiftsSyncDate: { type: Date },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  methode: {type: String},
  /* syncedUsers: [
    {
      firstName: String,
      lastName: String
    }
  ], */
  errorDescription: { type: String }
},
{
  timestamps: true
});

const ShiftSyncLog = mongoose.model('shiftsynclog', shiftSyncLogschema);
module.exports = ShiftSyncLog;
