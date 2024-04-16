const request = require('request');
const GRAPHURL = process.env.GRAPHURL;

module.exports = async (token,startDate,endDate) => {
    try {
      const shifts = await new Promise((resolve, reject) => {

        request({
          url: GRAPHURL + startDate + ' and sharedShift/endDateTime le ' + endDate + '&$top=2000',
          headers: {
            'Authorization': 'Bearer' + ' ' + token.access_token
          },
          rejectUnauthorized: false
        }, function (err, res) {
          if (res.statusCode != 200) {
            reject(JSON.parse(res.body));
          } else {
            resolve(JSON.parse(res.body));
          }
        })
  
      })
      return { data: shifts, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  