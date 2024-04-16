const addNewsFeed = require('./addNewsFeed.service');
const updateNewsFeed = require('./updateNewsFeed.service');
const getAllNewsFeed = require('./getAllNewsFeed.service');
const getByUserIdNewsFeed = require('./getByUserIdNewsFeed.service');
const deleteNewsFeed = require('./deleteNewsFeed.service');
const likeNewsFeed = require('./likeNewsFeed.service');
const unlikeNewsFeed = require('./unlikeNewsFeed.service');
const getByID = require('./getByID.service');
const blockNewsFeed = require('./blockNewsFeed.service');

module.exports = {
    addNewsFeed,
    updateNewsFeed,
    getByUserIdNewsFeed,
    getAllNewsFeed,
    deleteNewsFeed,
    likeNewsFeed,
    unlikeNewsFeed,
    getByID,
    blockNewsFeed
}