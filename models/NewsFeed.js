const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const NewsFeedSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId
        }
      }
    ]
  },
  { timestamps: true }
);
NewsFeedSchema.plugin(mongoosePaginate);
const NewsFeed = mongoose.model('newsFeed', NewsFeedSchema);
module.exports = NewsFeed;
