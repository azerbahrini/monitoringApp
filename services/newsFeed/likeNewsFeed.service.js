const News = require('../../models/NewsFeed');

module.exports = async (id, userId) => {
    try {
        const post = await News.findById(id);

        if (post.likes.some((like) => like.user.toString() === userId)) {
            return {
                err: { message: 'post already liked' },
                status: 'error'
              };
        }

        post.likes.unshift({ user: userId });

        await post.save();

        return {data: post.likes, status: 'success' };
    } catch (err) {
        return { err, status: 'error' };
    }
}

