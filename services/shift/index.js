const getAllShiftsService = require ('./getAll')
const addShift = require ('./addShift')
const deleteMany = require ('./deleteMany')
const getMicrosoftToken = require ('./getMicrosoftToken')
const getShiftsFromTeams = require ('./getShiftsFromTeams')
const getUserFromTeams = require ('./getUserFromTeams')
const getShiftsForTl = require('./getShiftsForTl')
const assigneTl = require ('./assignTeamLead')
const getAllMembers = require ('./getAllMembers')
const syncShiftCron = require ('./syncShiftCron')
const getShiftByUserIDService = require('./getShiftByUserIDService')
const getCurrentMembers = require('./getCurrentMembers')
const getMemberShiftByUserId = require('./getMemberShiftByUserId')

module.exports ={
getAllShiftsService,
addShift,
deleteMany,
getMicrosoftToken,
getShiftsFromTeams,
getUserFromTeams,
getShiftsForTl,
assigneTl,
getAllMembers,
syncShiftCron,
getShiftByUserIDService,
getCurrentMembers,
getMemberShiftByUserId
}