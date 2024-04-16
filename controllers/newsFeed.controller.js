const newsFeedServices = require('../services/newsFeed')
const roleService = require('../services/role')
const moment = require('moment');
const logger = require('../config/logger');
const jwtDecode = require('jwt-decode');

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

const isFeedOwner = (feed, userID) => {
  if (feed.data.user.toString() === userID) {
    return true;
  } else {
    return false;
  }
};

exports.addNews = async function (req, res) {
 const post = req.body
    const result = await newsFeedServices.addNewsFeed(post);
    if (result.status === 'success') {
        logger.info(
            'add post success',
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
        );
        return res.status(201).json({ data: result.data });
    }
    if (result.status === 'error') {
        logger.error(
            'add post :' + result.err.message,
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
        );
        return res.status(400).json({ message: result.err.message });
    }
};

exports.getAllNews = async function (req, res) {
  const date = moment().utc().format();
    const page = req.query.page;
    const size = req.query.size;
    const populateWith = [{ path: 'user', select: ['firstName', 'lastName']}]
    const paginate = (req.query.paginate==='true');

    const result = await newsFeedServices.getAllNewsFeed(populateWith, page, size, paginate);
    const docs= result.data.docs;
    let post = {};
    const posts = [];
    for (const p of docs) {
      const roles = await roleService.getAllRoleByUser(p.user._id, date, 'app');
      const editedRole = roles.data.map((role) => ({ label: role.role?.label, _id: role.role?._id }));
      const user ={_id: p.user._id,
        firstName: p.user.firstName,
        lastName: p.user.lastName,
        role: editedRole};
      post = {
        isActive: p.isActive,
        isBlocked: p.isBlocked,
        _id: p._id,
        title: p.title,
        text: p.text,
        user: user,
        likes: p.likes,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        __v: p.__v
      }

      posts.push(post);

    }
    result.data.docs = posts;

    if (result.status === 'success') {
      logger.info(
        'get all posts success',
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(200).json({ data: result.data });
    }
    if (result.status === 'error') {
      logger.error(
        'get All posts :' + result.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(400).json({ message: result.err.message });
    }
  };

  exports.getByUserIdNews = async function (req, res) {
    const user = req.params.id;
    const result = await newsFeedServices.getByUserIdNewsFeed(user);
    if (result.status === 'success') {
      logger.info(
        'get by id posts',
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(200).json({ data: result.data });
    }
    if (result.status === 'error') {
      logger.error(
        'get by id posts :' + result.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  };
  exports.updateNews = async function (req, res) {
    const post = req.params.id;
    const content = req.body;
    const feed = await newsFeedServices.getByID(post);
    if (feed.statusCode === 204) {
      res.status(204).json({
        status: 'error',
        message: 'NewsFeed not found'
      });
    }
    const accessToken = req.header('x-auth-accessToken');
    try {
      const currentUserID = jwtDecode(accessToken).user.id;
      const isAdmin = await isAnAdmin(currentUserID);
      const isaFeedOwner = isFeedOwner(feed, currentUserID);
      if (isAdmin || isaFeedOwner) {
          const result = await newsFeedServices.updateNewsFeed(post, content);
          if (result.status === 'success') {
            logger.info(
              'update posts success',
              req.route ? req.baseUrl + req.route.path : 'testing',
              req.method ? req.method : 'testing',
              req.ip ? req.ip : 'testing'
            );
            return res.status(201).json({ data: result.data });
          } else {
            logger.error(
              'update posts  :' + result.err.message,
              req.route ? req.baseUrl + req.route.path : 'testing',
              req.method ? req.method : 'testing',
              req.ip ? req.ip : 'testing'
            );
            return res
              .status(result.statusCode ? result.statusCode : 400)
              .json({ message: result.err.message });
          }
        } else {
          res.status(403).json({
            status: 'error',
            message: 'You are not authorized to edit this NewsFeed'
          });
        }
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid Token'
      });
    }
  };

  exports.deleteNews = async function (req, res) {
    const post = req.params.id;
    const feed = await newsFeedServices.getByID(post);
    if (feed.statusCode === 204) {
      res.status(204).json({
        status: 'error',
        message: 'NewsFeed not found'
      });
    }
    const accessToken = req.header('x-auth-accessToken');
    try {
      const currentUserID = jwtDecode(accessToken).user.id;
      const isAdmin = await isAnAdmin(currentUserID);
      const isaFeedOwner = isFeedOwner(feed, currentUserID);
      if (isAdmin || isaFeedOwner) {

        const result = await newsFeedServices.deleteNewsFeed(post);
        if (result.status === 'success') {
          logger.info(
            'delete posts success',
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
          return res.status(200).json({ data: result.data });
        } else {
          logger.error(
            'delete posts :' + result.err.message,
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
          return res
            .status(result.statusCode ? result.statusCode : 400)
            .json({ message: result.err.message });
        }
      } else {
        res.status(403).json({
          status: 'error',
          message: 'You are not authorized to delete this NewsFeed'
        });
      }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid Token'
    });
  }
  };

  exports.blockNews = async function (req, res) {
    const post = req.params.id;
    const feed = await newsFeedServices.getByID(post);
    if (feed.statusCode === 204) {
      res.status(204).json({
        status: 'error',
        message: 'NewsFeed not found'
      });
    }
    const accessToken = req.header('x-auth-accessToken');
    try {
      const currentUserID = jwtDecode(accessToken).user.id;
      const isAdmin = await isAnAdmin(currentUserID);
      if (isAdmin) {
        const result = await newsFeedServices.blockNewsFeed(post);
        if (result.status === 'success') {
          logger.info(
            'delete posts success',
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
          return res.status(200).json({ data: result.data });
        } else {
          logger.error(
            'delete posts :' + result.err.message,
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
          return res
            .status(result.statusCode ? result.statusCode : 400)
            .json({ message: result.err.message });
        }
      } else {
        res.status(403).json({
          status: 'error',
          message: 'You are not authorized to block this NewsFeed'
        });
      }
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid Token'
    });
  }
  };

  exports.likeNews = async function (req, res) {
    const postId = req.params.id;
    const userId = req.body?.userId;
    const result = await newsFeedServices.likeNewsFeed(postId, userId);
    if (result.status === 'success') {
      logger.info(
        'like posts success',
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(200).json({ data: result.data });
    }
    if (result.status === 'error') {
      logger.error(
        'like posts :' + result.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  };

  exports.unlikeNews = async function (req, res) {
    const postId = req.params.id;
    const userId = req.body?.userId;
    const result = await newsFeedServices.unlikeNewsFeed(postId, userId);
    if (result.status === 'success') {
      logger.info(
        'unlike posts success',
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(200).json({ data: result.data });
    }
    if (result.status === 'error') {
      logger.error(
        'unlike posts :' + result.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
    }
  };