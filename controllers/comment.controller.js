const CommentService = require('../services/comment');
const jwt_decode = require('jwt-decode');
const roleService = require('../services/role');

exports.addComment = async function (req, res) {
  const feedID = req.params.id;
  const accessToken = req.header('x-auth-accessToken');
  try {
    const currentUserID = jwt_decode(accessToken).user.id;

    const body = {
      content: req.body.content,
      feed: feedID,
      user: currentUserID,
      isActive: true
    };
    const result = await CommentService.addComment(body);
    if (result.status === 'success') {
      res.status(result.statusCode).json({
        message: 'Successfully added the comment',
        data: result.data
      });
    } else {
      res.status(result.statusCode).json({
        status: result.status,
        message: result.err.message
      });
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid Token'
    });
  }
};
const isAnAdmin = async (userID) => {
  const { data } = await roleService.getRolesForUsers();
  let isAdmin = false;
  data.map(item => {
    if (item.user.toString() === userID && item.role.label.toString() === 'Administrator') {
      isAdmin = true;
    }
  });
  return isAdmin;
};
const isCommentOwner = (comment, userID) => {
  if (comment.data.user.toString() === userID) {
    return true;
  } else {
    return false;
  }
};
exports.editComment = async function (req, res) {
  const commentID = req.params.id;
  const comment = await CommentService.getCommentByID(commentID);
  if (comment.statusCode === 204) {
    res.status(204).json({
      status: 'error',
      message: 'Comment not found'
    });
  }
  const accessToken = req.header('x-auth-accessToken');
  try {
    const currentUserID = jwt_decode(accessToken).user.id;
    const isAdmin = await isAnAdmin(currentUserID);
    const isaCommentOwner = isCommentOwner(comment, currentUserID);
    if (isAdmin || isaCommentOwner) {
      const body = {
        content: req.body.content,
        isActive: req.body.isActive
      };
      const result = await CommentService.editComment(commentID, body);
      if (result.status === 'success') {
        res.status(result.statusCode).json({
          status: result.status,
          data: result.data,
          message: 'Successfully edited the comment'
        });
      } else {
        res.status(result.statusCode).json({
          status: result.status,
          message: result.err.message
        });
      }
    } else {
      res.status(403).json({
        status: 'error',
        message: 'You are not authorized to edit this comment'
      });
    }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid Token'
    });
  }
};
exports.deleteComment = async function (req, res) {
  const commentID = req.params.id;
  const comment = await CommentService.getCommentByID(commentID);
  if (comment.statusCode === 200) {
    const accessToken = req.header('x-auth-accessToken');
    try {
      const currentUserID = jwt_decode(accessToken).user.id;
      const isAdmin = await isAnAdmin(currentUserID);
      const isaCommentOwner = isCommentOwner(comment, currentUserID);
      if (isAdmin || isaCommentOwner) {
        const result = await CommentService.deleteComment(commentID);
        if (result.status === 'success') {
          res.status(result.statusCode).json({
            status: result.status,
            data: result.data,
            message: 'Successfully deleted the comment'
          });
        } else {
          res.status(result.statusCode).json({
            status: result.status,
            message: result.err.message,
            statusCode: result.statusCode
          });
        }
      } else {
        res.status(403).json({
          status: 'error',
          message: 'You are not authorized to edit this comment'
        });
      }
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid Token'
      });
    }
  } else {
    res.status(comment.statusCode).json({
      status: comment.status,
      message: comment.err.message
    });
  }
};

exports.blockComment = async function (req, res) {
  const commentID = req.params.id;
  const comment = await CommentService.getCommentByID(commentID);
  if (comment.statusCode === 200) {
    const accessToken = req.header('x-auth-accessToken');
    try {
      const currentUserID = jwt_decode(accessToken).user.id;
      const isAdmin = await isAnAdmin(currentUserID);
      if (isAdmin) {
        const result = await CommentService.blockComment(commentID);
        if (result.status === 'success') {
          res.status(result.statusCode).json({
            status: result.status,
            data: result.data,
            message: 'Successfully blocked the comment'
          });
        } else {
          res.status(result.statusCode).json({
            status: result.status,
            message: result.err.message,
            statusCode: result.statusCode
          });
        }
      } else {
        res.status(403).json({
          status: 'error',
          message: 'You are not authorized to edit this comment'
        });
      }
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid Token'
      });
    }
  } else {
    res.status(comment.statusCode).json({
      status: comment.status,
      message: comment.err.message
    });
  }
};

exports.getCommentsByFeedID = async function (req, res) {
  const feedID = req.params.id;
  const result = await CommentService.getCommentsByFeedID(feedID);
  if (result.statusCode === 200) {
    res.status(result.statusCode).json({
      data: result.data,
      status: result.status
    });
  } else {
    res.status(result.statusCode).json({
      status: result.status,
      message: result.err.message
    });
  }
};

exports.getCommentsByUserID = async function (req, res) {
  const userID = req.params.id;
  const result = await CommentService.getCommentsByUserID(userID);
  if (result.statusCode === 200) {
    res.status(result.statusCode).json({
      data: result.data,
      status: result.status
    });
  } else {
    res.status(result.statusCode).json({
      status: result.status,
      message: result.err.message
    });
  }
};