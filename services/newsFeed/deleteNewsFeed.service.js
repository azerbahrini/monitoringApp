const News = require('../../models/NewsFeed');
module.exports = async (id) => {
    try {
        if (!id) {
            return { err: { message: 'missing ID' }, status: 'error' };
        }
        const doc = await News.updateOne(
            { _id: id },
            {
                $set: { isActive: false },
            }
        )
            .lean()
            .exec();
        if (!doc) {
            return { err: { message: 'post not found' }, status: 'error', statusCode: 404};
        }

        return { data: doc, status: 'success' };
    } catch (err) {
        return { err, status: 'error' };
    }
};