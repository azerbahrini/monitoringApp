const MAP = require("../../models/MonitoringActivityPlannification");
const mongoose = require("mongoose");
const logger = require("../../config/logger");
const minsToString = require("../../utils/minutesToString");
const stringToMinutes = require("../../utils/stringToMinutes");
const moment = require('moment');

module.exports = async (sysId, page, size, searchValue, timeZone) => {
  try {

    const myArray = searchValue?.split(" ");
    const searchArray = [
      {
        $or: [
          {
            'monitoringAct.activity': {
              $regex: "",
              $options: "i"
            }
          },
          {
            'monitoringAct.description': {
              $regex: "",
              $options: "i"
            }
          }
        ]
      }
    ];

    myArray?.map((searchFragment) => {
      searchArray.push({
        $or: [
          {
            'monitoringAct.activity': {
              $regex: searchFragment,
              $options: "i"
            }
          },
          {
            'monitoringAct.description': {
              $regex: searchFragment,
              $options: "i"
            }
          }
        ]
      });
    });

   const options = {
      page: page,
      limit: size
    }

const map = MAP.aggregate([
  {
    '$lookup': {
      'from': 'monitoringacts',
      'localField': 'monitoringAct',
      'foreignField': '_id',
      'as': 'monitoringAct'
    }
  }, {
    '$match': {
      'system': mongoose.Types.ObjectId(sysId),
      'active': true
    }
  }, {
    '$unwind': {
      'path': '$monitoringAct',
      'preserveNullAndEmptyArrays': false
    }
  }, {
    '$match': {
      $and: searchArray
    }
  }
]);

    const paginatedMaps = await MAP.aggregatePaginate(map, options);
    if(map){
      const docs = paginatedMaps.docs.map((doc) => {
        let convertedStartTime = moment(moment.tz(Math.floor(doc.startTime / 60) + ':' + doc.startTime % 60, 'HH:mm', 'UTC')).tz(timeZone).format('HH:mm');
        return (
         {
          ...doc,
          periodicity: minsToString(doc.periodicity),
          startTime: minsToString(stringToMinutes(convertedStartTime), true),
          estimation: minsToString(doc.estimation)
        }
      )});
      return {
        data: {...paginatedMaps, docs: docs,},
        status: "success"
      };
    }else{
      return {
        err: { message: "No MAP match this criteria !" },
        status: "error",
        statusCode: 404
      };
    }
  } catch (err) {
    logger.error("Get by System Error :", err);
    return { err, status: "error" };
  }
};
