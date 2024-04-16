const express = require('express');
const router = express.Router();
const newsFeedController = require('../../controllers/newsFeed.controller');
const validator = require('../../middleware/validators/newsFeed/')

router.route('/').post(validator.add, newsFeedController.addNews);
router.route('/getAllPosts').get(validator.getAll, newsFeedController.getAllNews);
router.route('/getPostByUserID/:id').get(validator.getByUserId, newsFeedController.getByUserIdNews);
router.route('/updatePost/:id').patch(validator.update, newsFeedController.updateNews);
router.route('/deletePost/:id').patch(validator.deletePost, newsFeedController.deleteNews);
router.route('/blockNews/:id').put(validator.deletePost, newsFeedController.blockNews);
router.route('/like/:id').put(validator.like, newsFeedController.likeNews);
router.route('/unlike/:id').put(validator.unlike, newsFeedController.unlikeNews);
module.exports = router;