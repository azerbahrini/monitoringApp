const updateResult = require ('./update')
const addResult = require ('./add')
const getByTaskId = require ('./getByTaskId')
const getPreviousResultByTaskIDService = require ('./getPreviousResultByTaskIDService')
const getOne = require ('./getOne');
const getResultsByMapsId = require ('./getResultsByMapIds')

module.exports ={
    updateResult,
    addResult,
    getByTaskId,
    getPreviousResultByTaskIDService,
    getOne,
    getResultsByMapsId
}