const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tlHistorySchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        userId: {
            type: String,
        },
        count: {
            type: String,
        },
        email: {
            type: String,
        }
    },

    {
        timestamps: true,
    }
);

const TlHistory = mongoose.model("TeamLeadHistory", tlHistorySchema);

module.exports = TlHistory;
