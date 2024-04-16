const add = require('./add');
const deletePost = require('./delete');
const getAll = require('./getAll');
const getByUserId = require('./getByUserId');
const like = require('./like');
const unlike = require('./unlike');
const update = require('./update');
module.exports = {
    add,
    deletePost,
    getAll,
    getByUserId,
    like,
    unlike,
    update
}