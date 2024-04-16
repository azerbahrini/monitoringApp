const virtualTasksGeneratorService = require('./virtualTasksGenerator');
const checkCreatedTasksService = require('./checkCreatedTasks.service');
const systemService = require('../system');
const mapService = require('../map');
const shiftService = require('../shift');
const roleService = require('../role');
const moment = require('moment');
const momentTz = require('moment-timezone');

module.exports = async (customerId, typeId, categoryId, systemId, teamLeaderId, memberId, timeZone, rangeStart, rangeEnd, serviceType) => {
  try {

    if (!teamLeaderId) {
      return { err: { message: 'time range or teamLeaderId not defined' }, status: 'error' };
    }
    const tlRole = await roleService.getRoleByLabelService('Team Leader');
    const teamLeaderRoleID= tlRole.data._id;
    const tlShift = await shiftService.getShiftByUserIDService(teamLeaderId, teamLeaderRoleID);
    if (tlShift.statusCode === 203) {
      return {
        err: tlShift.err,
        status: tlShift.status,
        statusCode: tlShift.statusCode
      };
    }
    if (tlShift.statusCode === 204) {
      return { err: { message: 'team leader shift not found' }, status: 'error' };
    }
    if (tlShift.status === 'error') {
      return { err: { message: tlShift.err.message }, status: 'error' };
    }

    if (!rangeStart || !rangeEnd) {
      rangeStart = tlShift.data.startDate;
      rangeEnd = tlShift.data.endDate;
    } else {
      const convertedStartDate = momentTz(rangeStart).tz(timeZone, true);
      const convertedEndDate = momentTz(rangeEnd).tz(timeZone, true);
      rangeStart = moment(convertedStartDate).utc().format();
      rangeEnd = moment(convertedEndDate).utc().format();
      if (moment(rangeStart).isAfter(moment(rangeEnd))){
        rangeEnd = moment(convertedEndDate).utc().add(1, 'd').format()
      }
    }

    const memberShift = await shiftService.getMemberShiftByUserId(memberId, tlShift.data.startDate, tlShift.data.endDate);
    if (memberShift.status === 'error') {
      return { err: { message: memberShift.err.message }, status: 'error' };
    }
    if (memberShift.statusCode === 204) {
      return { err: { message: 'member shift not found' }, status: 'error' };
    }

    //Set intersection
    let startDate = rangeStart;
    let endDate = rangeEnd;

    if (moment(memberShift.data.startDate).isAfter(rangeEnd) || moment(rangeStart).isAfter(memberShift.data.endDate)) {
      return { data: { message: 'member shift time does not match' }, status: 'success' };
    }
    (moment(memberShift.data.startDate).isAfter(moment(rangeStart))) && (startDate = memberShift.data.startDate);
    (moment(memberShift.data.endDate).isBefore(moment(rangeEnd))) && (endDate = memberShift.data.endDate);

    const systems = await systemService.getSystemsForMapsService(customerId, typeId, categoryId, systemId);

    if (systems.status === 'error') {
      return { err: { message: systems.err.message }, status: 'error' };
    }

    const systemIds = systems.data.map(system => system._id);

    const maps = await mapService.getMapsBySystems(systemIds);

    if (maps.status === 'error') {
      return { err: { message: maps.err.message }, status: 'error' };
    }

    const virtualTasks = virtualTasksGeneratorService(maps.data, startDate, endDate, memberId, timeZone);

    if (virtualTasks.status === 'error') {
      return { err: { message: virtualTasks.err.message }, status: 'error' };
    }
    const checkCreatedTasks = await checkCreatedTasksService(virtualTasks.data, memberId, startDate, endDate, timeZone, serviceType);
    if (checkCreatedTasks.status === 'error') {
      return { err: { message: checkCreatedTasks.err.message }, status: 'error' };
    }
    return ({ data: checkCreatedTasks.data, status: 'success' });

  } catch (err) {
    return { err, status: 'error' };
  }
};
