const addComment = require('./addComment.service');
const editComment = require('./editComment.service');
const deleteComment = require('./deleteComment.service');
const getCommentsByFeedID = require('./getCommentsByFeedID.service');
const getCommentsByUserID = require('./getCommentsByUserID.service');
const getCommentByID = require('./getCommentByID.service');
const blockComment = require('./blockComment.service');

module.exports = {
  addComment,
  editComment,
  deleteComment,
  getCommentsByFeedID,
  getCommentsByUserID,
  getCommentByID,
  blockComment
};
