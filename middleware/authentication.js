const jwt = require('jsonwebtoken');
require('dotenv').config();
const logger = require('../config/logger');

module.exports = (req, res, next) => {

  // Get tokens from header
  const accessToken = req.header('x-auth-accessToken');
  const refreshToken = req.header('x-auth-refreshToken');

  // Check if not token
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: 'No Token, authentication denied' });
  }

  // Verify Tokens
  try {
    jwt.verify(accessToken, process.env.JWTSECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          jwt.verify(refreshToken, process.env.JWTSECRET, (errorRefresh, decodedRefresh) => {
            if (errorRefresh) {
              return res.status(401).json({ message: 'Token is not valid' });
            } else {
              // if (decoded.user.ip === req.ip) {
                //Generate access token
                const payloadAccess = {
                  user: {
                    id: decodedRefresh.user.id
                  }
                };
                const accessTokenValue = jwt.sign(payloadAccess, process.env.JWTSECRET, {
                  expiresIn: '10h'
                });
                //Generate refresh token
                const refreshTokenValue = jwt.sign(payloadAccess, process.env.JWTSECRET, {
                  expiresIn: '2h'
                });
                req.user = {
                  id: decoded.user.id
                };
                req.accessToken = accessTokenValue;
                req.refreshToken = refreshTokenValue;
                next()
              // } else {
              //   return res.status(401).json({ message: 'Token is not valid' });
              // }
            }
          })
        } else {
          return res.status(401).json({ message: 'Token is not valid' });
        }
      } else {
       // if (decoded.user.ip === req.ip) { 
          //Generate refresh token
          const payloadRefresh = {
            user: {
              id: decoded.user.id
            }
          };
          const refreshTokenValue = jwt.sign(payloadRefresh, process.env.JWTSECRET, {
            expiresIn: '2h'
          });
          req.user = decoded.user;
          req.refreshToken = refreshTokenValue;
          next()
        // }else {
        //   return res.status(401).json({ message: 'Token is not valid' });
        // }
      }
    });
  } catch (err) {
    logger.error('something wrong with auth middleware', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
};
