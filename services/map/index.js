const getAllMAPsService = require ('./getAll')
const getMAPById =  require ('./getOne')
const updateMAP = require ('./update')
const addMAP = require ('./add')
const deleteMAP = require ('./delete')
const getBySystemId = require ('./getBySystemId')
const getMapsBySystems = require ('./getMapsBySystems')

module.exports ={
    getAllMAPsService,
    getMAPById,
    updateMAP,
    addMAP,
    deleteMAP,
    getBySystemId,
    getMapsBySystems
}