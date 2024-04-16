const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    feed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'newsFeed',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
const NewsFeed = mongoose.model('comment', CommentSchema);
module.exports = NewsFeed;
