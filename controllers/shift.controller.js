const shiftService = require('../services/shift');
const syncShiftService = require('../services/syncShiftLog')
const roleService = require('../services/role');
const logger = require('../config/logger');
const User = require('../models/User');
const userService = require('../services/user');
const moment = require('moment');
const generator = require('generate-password');
const Nomenclature = require('../models/Nomenclature');
const paginateArray = require('../utils/paginateArray');
const Shift = require('../models/Shift');
const reminderCron = require('../services/shift/reminderShiftUnassignedCron')
const momentTz = require('moment-timezone');
const toUtc = require('../utils/toUTC')

const themeColor = {
  'white': '#a0aeb2',
  'blue': '#0078d7',
  'green': '#8cbd18',
  'purple': '#8378de',
  'pink': '#ed616f',
  'yellow': '#ffb900',
  'gray': '#393939',
  'darkBlue': '#004e8c',
  'darkGreen': '#498205',
  'darkPurple': '#4e257f',
  'darkPink': '#a4262c',
  'darkYellow': '#ffaa44'
};

//Get All Shifts
exports.getAllShifts = async function (req, res) {
  const assigned = (req.query.assigned === 'true');
  const unassigned = (req.query.unassigned === 'true');
  const paginate = (req.query.paginate === 'true');
  const page = req.query.page ? req.query.page : 0;
  const size = req.query.size ? req.query.size : 10000000;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const timeZone = req.query.timeZone;
  const shift = req.query.shift ? req.query.shift : null;
  const user = req.query.user ? req.query.user : null;

  const tlRole = await roleService.getRoleByLabelService('Team Leader');
  if (tlRole.status !== 'success') {
    logger.error(
      'sync shift error :' + tlRole.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: tlRole.err.message });
  }
  const result = await shiftService.getAllShiftsService(tlRole.data._id, startDate, endDate, timeZone, shift, user);
  if (result.status === 'success') {
    const filtredShifts = [];
    if (assigned) {
      result.data.map(shiftResult => {
        if (shiftResult.teamLeader) {
          filtredShifts.push(shiftResult);
        }
      })
    }
    if (unassigned) {
      result.data.map(shiftResult => {
        if (!shiftResult.teamLeader) {
          filtredShifts.push(shiftResult);
        }
      })
    }
    if (!paginate) {
      let paginated = await paginateArray(filtredShifts, 0, filtredShifts.length);
      if (!paginated.status === 'success') {
        logger.error(
          'Get all shifts error :' + paginated.err.message,
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
        return res.status(400).json({ message: paginated.err.message });
      }
      logger.info('Get all shifts success', req.route ? req.baseUrl + req.route.path : 'testing', req.method ? req.method : 'testing', req.ip ? req.ip : 'testing');
      return res.status(200).json({ data: paginated.data });
    } else {
      let paginated = await paginateArray(filtredShifts, page, size);
      if (!paginated.status === 'success') {
        logger.error(
          'Get all shifts error :' + paginated.err.message,
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
        return res.status(400).json({ message: paginated.err.message });
      }
      logger.info('Get all shifts success', req.route ? req.baseUrl + req.route.path : 'testing', req.method ? req.method : 'testing', req.ip ? req.ip : 'testing');
      return res.status(200).json({ data: paginated.data });
    }
  }
  if (result.status === 'error') {
    logger.error(
      'Get all shifts error :' + result.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get All members to be assigned as teamleaders
exports.getAllMembers = async function (req, res) {
  const paginate = (req.query.paginate === 'true');
  const page = req.query.page ? req.query.page : 0;
  const size = req.query.size ? req.query.size : 10;
  const tlRole = await roleService.getRoleByLabelService('Team Leader');
  if (tlRole.status !== 'success') {
    logger.error(
      'sync shift error :' + tlRole.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: tlRole.err.message });
  }
  const result = await shiftService.getAllMembers(tlRole.data._id, req.query.shift, req.query.startDate, req.query.endDate);
  if (result.status === 'success') {
    if (!paginate) {
      let paginated = await paginateArray(result.data, 0, result.data.length);
      if (!paginated.status === 'success') {
        logger.error(
          'Get all members error :' + paginated.err.message,
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
        return res.status(400).json({ message: paginated.err.message });
      }
      logger.info('Get all members success', req.route ? req.baseUrl + req.route.path : 'testing', req.method ? req.method : 'testing', req.ip ? req.ip : 'testing');
      return res.status(200).json({ data: paginated.data });
    } else {
      let paginated = await paginateArray(result.data, page, size);
      if (!paginated.status === 'success') {
        logger.error(
          'Get all members error :' + paginated.err.message,
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
        return res.status(400).json({ message: paginated.err.message });
      }
      logger.info('Get all members success', req.route ? req.baseUrl + req.route.path : 'testing', req.method ? req.method : 'testing', req.ip ? req.ip : 'testing');
      return res.status(200).json({ data: paginated.data });
    }

  }
  if (result.status === 'error') {
    logger.error(
      'Get all members error :' + result.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Sync Shifts
exports.syncShift = async function (req, res) {
  const syncLog = {
    methode: req.query?.methode,
    syncedShifts: 0,
    unSyncedShifts: 0,
    user: req.query.user,
    errorDescription: null,
    shiftsSyncDate: new Date()
  };

  try {
    let addedShiftsIds = [];
    const token = await shiftService.getMicrosoftToken();
    if (token.status !== 'success') {
      logger.error(
        'sync shift error :' + token.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      syncLog.errorDescription = token.err.message;
      //syncLog
      let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)
      return res.status(400).json({ message: token.err.message });
    }
    const startDate = moment().utc().startOf('day').format();
    const endDate = moment().utc().add(30, 'd').startOf('day').format();
    const unfilteredShifts = await shiftService.getShiftsFromTeams(
      token.data,
      startDate,
      endDate
    );
    if (unfilteredShifts?.status !== 'success') {
      logger.error(
        'sync shift error :' + unfilteredShifts.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      syncLog.errorDescription = unfilteredShifts.err.message;
      //syncLog
      let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)
      return res.status(400).json({ message: unfilteredShifts.err.message });
    }

    const shifts = unfilteredShifts.data.value.filter(function (item) {
      return item.sharedShift.displayName.includes('shift');
    });

    try {
      const allNames = shifts.map((shift) =>
      ({
        name: shift.sharedShift.displayName,
        theme: shift.sharedShift.theme,
        color: themeColor[shift.sharedShift.theme]
      })
      );
      const uniqNames = [...new Map(allNames.map((item) => [item['name'], item])).values()];
      const nomenclastures = await Nomenclature.create(uniqNames);
      if (!nomenclastures) {
        logger.error(
          'sync shift error : add nomenclastures',
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
      } else {
        logger.info(
          'sync shifs : add nomenclastures success',
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
      }

    } catch (err) {
      if (err.code !== 11000) {
        syncLog.errorDescription = err.message;
        //syncLog
        let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)
        return res.status(400).json({ message: err.message });
      }
    }

    const filtredNomenclatures = {};
    try {
      const allNomenclatures = await Nomenclature.find({}).lean().exec();
      if (allNomenclatures.length !== 0) {
        allNomenclatures.forEach(item => {
          filtredNomenclatures[item.name] = item._id;
        })
      }
    } catch (err) {
      syncLog.errorDescription = err.message;
      //syncLog
      let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)
      return res.status(400).json({ message: err.message });
    }

    const tlRole = await roleService.getRoleByLabelService('Team Leader');
    if (tlRole.status !== 'success') {
      logger.error(
        'sync shift error :' + tlRole.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      syncLog.errorDescription = tlRole.err.message;
      //syncLog
      let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)
      return res.status(400).json({ message: tlRole.err.message });
    }

    const teamLeaders = await Shift.find({ role: tlRole.data._id, startDate: { $gte: startDate }, endDate: { $lte: endDate } },
      { _id: 1, name: 1, startDate: 1, user: 1 }).lean().exec();

    const users = await User.find({}, { _id: 1, microsoftId: 1 }).lean().exec();
    let allUsers;
    if (users) {
      allUsers = users.map((user) =>
      ({
        id: user._id,
        microsoftId: user.microsoftId
      })
      );
    }

    const gsRole = await roleService.getRoleByLabelService('Global Support');
    if (gsRole.status !== 'success') {
      logger.error(
        'sync shift error :' + gsRole.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      syncLog.errorDescription = gsRole.err.message;
      //syncLog
      let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)
      return res.status(400).json({ message: gsRole.err.message });
    }
    const allShifts = [];
    let userAdded;
    shifts.forEach(async (val) => {
      let userId;
      allUsers.forEach((user) => {
        if (user.microsoftId === val.userId) {
          userId = user.id;
        }
      });
      if (!userId) {
        const newUser = await shiftService.getUserFromTeams(
          token.data,
          val.userId
        );
        if (newUser.status !== 'success') {
          logger.error(
            'sync shift error :' + newUser.err.message,
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
          syncLog.errorDescription = newUser.err.message;
          //syncLog
          let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)
          return res.status(400).json({ message: newUser.err.message });
        }

        //Generate password
        const password = generator.generate({
          length: 8,
          numbers: true
        });

        //Saving the user
        const resultAddUser = await userService.addUser(
          newUser.data.givenName,
          newUser.data.surname,
          newUser.data.userPrincipalName,
          password,
          parseInt(newUser.data.mobilePhone),
          null,
          null,
          null,
          newUser.data.id //Microsoft ID
        );
        if (resultAddUser.data) {
          userAdded = resultAddUser.data._id;
        }
        userId = resultAddUser.data ? resultAddUser.data._id : null;
        if (userId) {
          logger.info(
            'Add user in sync shifts:',
            newUser.data.userPrincipalName
          );
        }

        const newRoles = userId ? [
          {
            shiftId: null,
            userMicrosoftId: val.userId,
            name: 'app_GS',
            startDate: moment().utc().startOf('day').format(),
            endDate: moment().utc().add(10, 'y').startOf('day').format(),
            updatedShiftAt: moment().utc().format(),
            role: gsRole.data._id,
            user: userId ? userId : userAdded,
            type: 'app',
            reference: gsRole.data._id + val.userId + '2031',
            theme: null,
            color: null,
            typeId: null
          },
          {
            shiftId: val.id,
            userMicrosoftId: val.userId,
            name: val.sharedShift.displayName,
            startDate: val.sharedShift.startDateTime,
            endDate: val.sharedShift.endDateTime,
            updatedShiftAt: val.lastModifiedDateTime,
            role: gsRole.data._id,
            user: userId ? userId : userAdded,
            type: 'shift',
            reference: null,
            theme: val.sharedShift.theme,
            color: themeColor[val.sharedShift.theme],
            typeId: filtredNomenclatures[val.sharedShift.displayName]
          }
        ] : [
          {
            shiftId: val.id,
            userMicrosoftId: val.userId,
            name: val.sharedShift.displayName,
            startDate: val.sharedShift.startDateTime,
            endDate: val.sharedShift.endDateTime,
            updatedShiftAt: val.lastModifiedDateTime,
            role: gsRole.data._id,
            user: userId ? userId : userAdded,
            type: 'shift',
            reference: null,
            theme: val.sharedShift.theme,
            color: themeColor[val.sharedShift.theme],
            typeId: filtredNomenclatures[val.sharedShift.displayName]
          }
        ];
        //sending a confirmation email
        // let mail = {
        //   email: user.email,
        //   key: 'ms_register_confirmation',
        //   language: 'EN',
        //   password: password,
        //   name: user.firstName + ' ' + user.lastName,
        // };
        //producer.sendMail(mail)

        //Add app shift for this user
        const addedRole = await shiftService.addShift(newRoles);
        if (addedRole.status !== 'success') {
          logger.error(
            'Sync shift : add new role error :' + addedRole.err.message,
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
        } else {
          syncLog.syncedUsers = syncLog.syncedUsers + newRoles.length;
          //update syncLog
          addedShiftsIds = addedShiftsIds.concat(addedRole.data.map(shift => shift._id));
          logger.info(
            'Sync shift : add new role success : ',
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing',
            req.ip ? req.ip : 'testing'
          );
        }
      }
      allShifts.push({
        shiftId: val.id,
        userMicrosoftId: val.userId,
        name: val.sharedShift.displayName,
        startDate: val.sharedShift.startDateTime,
        endDate: val.sharedShift.endDateTime,
        updatedShiftAt: val.lastModifiedDateTime,
        role: gsRole.data._id,
        user: userId,
        type: 'shift',
        reference: null,
        theme: val.sharedShift.theme,
        color: themeColor[val.sharedShift.theme],
        typeId: filtredNomenclatures[val.sharedShift.displayName]
      });
    });
    const shiftsToDeleted = [];
    teamLeaders.forEach(tl => {
      let exist = false;
      allShifts.forEach(shift => {
        if (tl.name === shift.name &&
          moment(tl.startDate).utc().startOf('day').isSame(moment(shift.startDate).utc().startOf('day')) &&
          tl.user.toString() === shift.user.toString()
        ) {
          exist = true;
        }
      })
      if (!exist) {
        shiftsToDeleted.push(tl._id);
      }
    })
    const addedShifts = await shiftService.addShift(allShifts);
    if (addedShifts.status !== 'success') {
      logger.error(
        'add new shifts error :' + addedShifts.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
    } else {
      syncLog.syncedShifts = syncLog.syncedShifts + allShifts.length;
      addedShiftsIds = addedShiftsIds.concat(addedShifts.data.map(shift => shift._id));
      logger.info(
        'add new shifts success',
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
    }
    const deletedShifts = await shiftService.deleteMany({
      $or: [
        {
          _id: { $in: shiftsToDeleted }
        },
        {
          startDate: { $gte: startDate, $lt: endDate },
          createdAt: { $lt: moment().utc().subtract(1, 'm').format() },
          _id: { $nin: addedShiftsIds },
          // createdAt: { $lt: moment().utc().subtract(1, "m").format() },
          type: 'shift',
          role: { $ne: tlRole.data._id }
        }
      ]
    });

    if (deletedShifts.status !== 'success') {
      logger.error(
        'sync shift error :' + deletedShifts.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );

      syncLog.errorDescription = deletedShifts.err.message;
      //syncLog
      let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)

      return res.status(400).json({ message: deletedShifts.err.message });
    } else {
      syncLog.unSyncedShifts = syncLog.unSyncedShifts + deletedShifts.data.deletedCount;

      logger.info(
        'sync shift success',
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );

      //syncLog
      let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)

      const result = await shiftService.getAllShiftsService(tlRole.data._id, moment(startDate).add( 1, 'd').format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), 'UTC', undefined, undefined);
      if (result.status === 'success') {
        result.data.map(shiftResult => {
          if (!shiftResult.teamLeader) {
            reminderCron(shiftResult.shift, tlRole.data._id);
          }
        })
      }
      return res.status(200).json({ message: 'Shift sync success' });
    }
  } catch (err) {
    syncLog.errorDescription = err.message;
    //syncLog
    let syncShiftLog = await syncShiftService.addSyncShiftLog(syncLog)

    return res.status(400).json({ message: err.message });
  }
};

//Assign team leader
exports.assignTeamLeader = async function (req, res) {
  try {
    const shifts = req.body.shifts.map(shift => {
      return ({
        name: shift.name,
        $and: [{ startDate: { $gte: moment(shift.startDate).utc().startOf('day').format() } }, { startDate: { $lt: moment(shift.startDate).utc().endOf('day').format() } }]
      });
    })
    const basicShifts = await shiftService.getShiftsForTl(shifts);
    if (basicShifts.status == 'error') {
      return res.status(400).json({ message: basicShifts.err.message });
    }
    const tlRole = await roleService.getRoleByLabelService('Team Leader');
    let shiftToAdd = [];
    let shiftToDelete = [];
    basicShifts.data.forEach(shift => {
      if (shift.role.toString() !== tlRole.data._id.toString() && shift.user.toString() === req.body.user.toString()) {
        delete shift._id;
        shiftToAdd.push({ ...shift, role: tlRole.data._id });
      } else if (shift.role.toString() === tlRole.data._id.toString()) {
        shiftToDelete.push(shift._id);
      }
    })
    const addTL = await shiftService.assigneTl(shiftToAdd);
    if (addTL.status === 'error') {
      logger.error(
        'assign Team Leader : add shift error :' + addTL.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(400).json({ message: addTL.err.message });
    }

    const deletedShifts = await shiftService.deleteMany({
      _id: { $in: shiftToDelete }
    });
    if (deletedShifts.status !== 'success') {
      logger.error(
        'assign Team Leader : delete shift error :' + deletedShifts.err.message,
        req.route ? req.baseUrl + req.route.path : 'testing',
        req.method ? req.method : 'testing',
        req.ip ? req.ip : 'testing'
      );
      return res.status(400).json({ message: deletedShifts.err.message });
    }
    return res.status(200).json({ message: 'Team Leader assigned successfully' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//retreive shiftby user and date 

exports.getShiftByUserID = async function (req, res) {
  let user_ID = req.params.id

  const result = await shiftService.getShiftByUserIDService(user_ID);
  if (result.status === 'success') {
    return res
      .status(result.statusCode ? result.statusCode : 200).json({ data: result.data })
  } else {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }

}

exports.getCurrentMembers = async function (req, res) {
  const tlShift = await shiftService.getShiftByUserIDService(req.query.id);
  if (tlShift.status === 'success') {
    const start = tlShift?.data?.startDate;
    const end = tlShift?.data?.endDate;
    const shiftName = tlShift?.data?.name;
    const result = await shiftService.getCurrentMembers(start, end, shiftName);
    if (result.status === 'success') {
      return res.status(200).json({ data: result.data });
    } else {
      return res.status(400).json({ message: result.err.message });
    }
  } else {
    return res.status(400).json({ message: result.err.message });
  }
};

exports.getAllMembersByShifts = async function (req, res) {
  const startDate = moment().utc().format('YYYY-MM-DD');
  const endDate = moment().add(1, 'days').utc().format('YYYY-MM-DD');
  const endDate24 = moment().add(1, 'days').utc().format()
  const timeZone = req.query.timeZone;
  const now = momentTz().tz(timeZone).format()
  const shift = req.query.shift ? req.query.shift : null;
  const user = req.query.user ? req.query.user : null;

  const tlRole = await roleService.getRoleByLabelService('Team Leader');
  if (tlRole.status !== 'success') {
    logger.error(
      'sync shift error :' + tlRole.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: tlRole.err.message });
  }
  const result = await shiftService.getAllShiftsService(tlRole.data._id, startDate, endDate, timeZone, shift, user);
  if (result.status === 'success') {
    logger.info(
      'Get all shifts success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );

    let output = result.data.filter(
      (item) => (item.shift.startDate <= endDate24 && item.shift.endDate >= now)
    );
    output = output.sort((a, b) => moment(a.shift.startDate).unix() - moment(b.shift.startDate
    ).unix());
    return res.status(200).json({ data: output });
  }
  if (result.status === 'error') {
    logger.error(
      'Get all shifts error :' + result.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
};
