const express = require('express');
const router = express.Router();

const shift = require('./shift');
const role = require('./role');
const host = require('./host');
const category = require('./category');
const sysClass = require('./sysclass');
const licence = require('./licence');
const monitoringType = require('./monitoringType');
const type = require('./type');
const slaContract = require('./slaContract');
const sla = require('./sla');
const level = require('./level');
const client = require('./client');
const itOperation = require('./itOperation');
const monitoringActivity = require('./monitoringActivity');
const user = require('./user');
const auth = require('./auth');
const system = require('./system');
const customerContact = require('./customerContact');
const customer = require('./customer');
const task = require('./task');
const modulePermission = require('./module');
const result = require('./result');
const map = require('./map')
const nomenclature = require('./nomenclature')
const shiftSyncLog = require('./shiftSyncLog')
const resultForm = require('./resultForm')
const comment = require('./comment')
const statistics = require('./statistics');
const newsFeed = require('./newsFeed')
const mtp = require('./mtp')
const taskactivitylog = require('./taskactivitylog')

router.use('/module', modulePermission);
router.use('/task', task);
router.use('/auth', auth);
router.use('/sla', sla);
router.use('/slaContract', slaContract);
router.use('/licence', licence);
router.use('/type', type);
router.use('/role', role);
router.use('/host', host);
router.use('/category', category);
router.use('/sysclass', sysClass);
router.use('/monitoringType', monitoringType);
router.use('/level', level);
router.use('/client', client);
router.use('/itOperation', itOperation);
router.use('/user', user);
router.use('/monitoringActivity', monitoringActivity);
router.use('/system', system);
router.use('/customerContact', customerContact);
router.use('/customer', customer);
router.use('/result', result);
router.use('/shift', shift);
router.use('/map', map);
router.use('/nomenclature', nomenclature);
router.use('/shiftSyncLog', shiftSyncLog);
router.use('/resultForm', resultForm);
router.use('/comment', comment);
router.use('/statistics', statistics);
router.use('/newsfeed', newsFeed);
router.use('/mtp', mtp);
router.use('/taskactivitylog', taskactivitylog);
module.exports = router;
