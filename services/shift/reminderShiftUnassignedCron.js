const CronJob = require('cron').CronJob;
const logger = require('../../config/logger');
const moment = require('moment');
const shiftService = require('../shift');
const { remindUnassignedShiftNotif } = require("../../kafka/notificationServiceKafka");
const roleService = require('../role');
const Shift = require("../../models/Shift");
const mongoose = require("mongoose");

module.exports = async (shift, tlRoleId) => {
  try {
    if (shift) {
      const customerAmsRole = await roleService.getRoleByLabelService('Customer AMS');
      if (customerAmsRole.status !== 'success') {
        logger.error('Get customer AMS role error');
      } else {
        const customersShifts = await Shift.find({role: mongoose.Types.ObjectId(customerAmsRole.data._id)})
        .populate("user").lean().exec()
        const customers = customersShifts.map(item => ({
          _id: item.user._id,
          firstName: item.user.firstName,
          lastName: item.user.lastName,
          email: item.user.email
        }));
        const startDateTime = moment(shift.startDate).subtract(1, 'd');
        if (moment(startDateTime).isBefore(moment().utc())) {
          logger.info('cron shift unassigned : startdate before now');
          remindUnassignedShiftNotif({ key: 'ShiftUnassigned', shift: {...shift, customers: customers} });
        } else {
          const job = new CronJob(
            startDateTime,
            async function () {
              const currentShift = await shiftService.getAllShiftsService(tlRoleId, moment(shift.startDate).add(1, 'd').format('YYYY-MM-DD'), moment(shift.endDate).format('YYYY-MM-DD'), 'UTC', undefined, undefined);
              if (currentShift.status === 'success') {
                currentShift.data.map(shiftResult => {
                  if (shiftResult.shift.startDate == shift.startDate && shiftResult.shift.name == shift.name
                    && !shiftResult.teamLeader) {
                    logger.info('shift not assigned');
                    remindUnassignedShiftNotif({ key: 'ShiftUnassigned', shift: {...shift,customers: customers} });
                  }
                })
              }
            },
            null,
            true,
            'UTC'
          );
          job.start();
          logger.info('Shift Unassigned reminder cron launched');
        }
      }
    }
  } catch (error) {
    logger.error('An unexpected error occurred during auto Shift Unassigned reminder cron', error);
  }
};
