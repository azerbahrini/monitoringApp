const request = require('request');

module.exports = async (token,userId) => {
    try {
      const user = await new Promise((resolve, reject) => {
        request({
          url: 'https://graph.microsoft.com/v1.0/users/' +userId ,
          headers: {
            'Authorization': 'Bearer' + ' ' + token.access_token
          },
        }, function (err, res) {
          if (res && res.statusCode && res.statusCode != 200) {
            reject(JSON.parse(res.body));
          } else {
            resolve(JSON.parse(res.body));
          }
        })

      })
      return { data: user, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  