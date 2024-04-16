module.exports = async (req, res, next) => {
  const clientTime = req.header('x-client-time');
  const clientIP = req.ip!=="::1"?req.ip:"41.224.83.57";

  try {
    let clientTimezone;
    //Verify client time
 satelize.satelize({ip:clientIP}, function(err, payload) {
   console.log("ip****",clientIP);
   if(err){
     console.log(err);
   }else{
     console.log(payload.timezone);
   clientTimezone=payload.timezone;
   }
 });
 
    console.log("date****",moment(clientTime).tz(clientTimezone, true).tz("UTC").seconds(0).milliseconds(0).format(),moment().seconds(0).milliseconds(0).tz("UTC").format())
    if ( !clientTime) {
     return res.status(401).json({ message: 'No client time, access denied' });
   }else{
     if(moment(clientTime).tz(clientTimezone, true).tz("UTC").seconds(0).milliseconds(0).format() !== moment().seconds(0).milliseconds(0).tz("UTC").format())
     {
       return res.status(401).json({ message: 'Incorrect client time, access denied' });
 
     }
   }
    
  } catch (err) {
    console.error('something wrong with check client system time middleware', err);
    return res.status(500).json({ message: 'Server Error' });
  }
};
