const request = require('request');

const CLIENTID = process.env.CLIENTID;
const CLIENTSECRET = process.env.CLIENTSECRET;
const PASSWORD = process.env.PASSWORD;
const MICROSOFTEMAIL = process.env.MICROSOFTEMAIL;
const TENANTID = process.env.TENANTID;

module.exports = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('client_id', CLIENTID);
      formData.append('client_secret', CLIENTSECRET);
      formData.append('scope', 'https://graph.microsoft.com/.default');
      formData.append('userName', MICROSOFTEMAIL);
      formData.append('password', PASSWORD);
      const token = await new Promise((resolve, reject) => {
        request.post({
          url: 'https://login.microsoftonline.com/' + TENANTID + '/oauth2/v2.0/token',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          body: formData.toString(),
          json: true,
  
        }, function (err, res) {
          if (res?.statusCode != 200) {
            reject(res.body);
  
          } else {
            resolve(res.body);
          }
        })
  
      })
      return { data: token, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  