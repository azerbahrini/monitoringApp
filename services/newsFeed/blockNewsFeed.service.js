const News = require('../../models/NewsFeed');
const notificationService = require('../../kafka/notificationServiceKafka');

module.exports = async (id) => {
    try {
        const doc = await News.findOneAndUpdate(
            { _id: id },
            { isBlocked: true },
            { new: true }
          )
            .lean()
            .exec();
        if (!doc) {
            return { err: { message: 'post not found' }, status: 'error', statusCode: 404};
        }
        await notificationService.newsFeedNotif({
            key: 'NewsFeed',
            data: {
              feed: doc,
              message: 'Newsfeed blocked'
            }
          });
        return { data: doc, status: 'success', statusCode: 200 };
    } catch (err) {
        return { err, status: 'error', statusCode: 400 };
    }
};