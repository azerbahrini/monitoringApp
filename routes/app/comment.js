const express = require('express');
const router = express.Router();
const CommentController = require('../../controllers/comment.controller');
const { addCommentValidator, getByIDValidator, editCommentValidator, deleteCommentValidator } = require('../../middleware/validators/comment');

router.post('/:id/addComment', addCommentValidator, CommentController.addComment);
router.post('/:id/edit', editCommentValidator, CommentController.editComment);
router.put('/:id/delete', deleteCommentValidator, CommentController.deleteComment);
router.put('/:id/block', deleteCommentValidator, CommentController.blockComment);
router.get('/getCommentsByFeedID/:id', getByIDValidator, CommentController.getCommentsByFeedID);
router.get('/getCommentsByUserID/:id', getByIDValidator, CommentController.getCommentsByUserID);
module.exports = router;
