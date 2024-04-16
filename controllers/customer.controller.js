const customerService = require('../services/customer');
const logger = require('../config/logger');
const toBase64 = require('../utils/toBase64');
const systemService = require('../services/system');
const mapsService = require('../services/map');
const moment = require('moment-timezone');
const toUtc = require('../utils/toUTC');

//Add Customer
exports.addCustomer = async function (req, res) {
  // Convert firstReport time with the sent timeZone
  const timeZoneFromQuery = req.query.timeZone;
  let timeToConvert;
  let convertedTime;
  let firstReportformatHHmm;
  if (req.body.firstReport) {
    timeToConvert = moment.tz(req.body.firstReport, 'HH:mm', timeZoneFromQuery).toISOString();
    convertedTime = toUtc(timeToConvert, timeZoneFromQuery);
    firstReportformatHHmm = moment.utc(convertedTime).format('HH:mm');
  }

  const body = {
    isActive: req.body.isActive ?? null,
    label: req.body.label ?? null,
    address: req.body.address ?? null,
    firstReport: firstReportformatHHmm ?? null,
    logo: 'defaultCustomerLogo.png',
    timeZone: req.body.timeZone ? req.body.timeZone.split(',') : null,
    listMonitoringType: req.body.listMonitoringType
      ? req.body.listMonitoringType.split(',')
      : null,
    startDate: req.body.startDate ?? null,
    endDate: req.body.endDate ?? null
  };
  //Add logo to body
  if (req.file) {
    if (req.file.path.includes('uploads\\')) {
      body.logo = req.file.path.replace('uploads\\', '');
    } else {
      body.logo = req.file.path.replace('uploads/', '');
    }
  }
  // Add customer
  const result = await customerService.addCustomerService(body);
  if (result.status === 'success') {
    logger.info(
      'add customer success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status === 'error') {
    logger.error(
      'add customer fail :' + result.err.message,
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
};
//Get All Customer
exports.getAllCustomer = async function (req, res) {
  const paginate = req.query.paginate;
  const page = req.query.page;
  const size = req.query.size;
  const isActive = req.query?.isActive;
  let activeFilterObject = {};
  if (typeof isActive !== 'undefined') {
    activeFilterObject = { isActive: isActive };
  }
  const searchValue = req.query.searchValue;
  const result = await customerService.getAllCustomerService(
    [
      { path: 'listLicence' },
      { path: 'listSlaContract', populate: 'class listSla' },
      { path: 'listSystem', populate: 'type category listHost listClient ' }
    ],
    paginate,
    page,
    size,
    searchValue,
    activeFilterObject
  );
  if (result.status === 'success') {
    logger.info(
      'get all Customer success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status === 'error') {
    logger.info(
      'get all Customer error',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get Customer by Id
exports.getCustomerById = async function (req, res) {
  const result = await customerService.getCustomerByIdService(req.params.id, [{ path: 'listMonitoringType', select: 'libelle' }]);
  if (result.status === 'success') {
    result.data.firstReport && (result.data.firstReport = moment(moment.tz(result.data.firstReport, 'HH:mm', 'UTC')).tz(req.query.timeZone).format('HH:mm'))
    if (result.data.logo) {
      const base64Logo = await toBase64('uploads/' + result.data.logo);
      if (base64Logo.status === 'success') {
        result.data.logo = base64Logo.data;
      } else {
        logger.info(
          'get Customer success toBase64 error',
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing',
          req.ip ? req.ip : 'testing'
        );
        return res
          .status(base64Logo.statusCode ? base64Logo.statusCode : 200)
          .json({ message: 'Missing Logo', data: result.data });
      }
    }
    logger.info(
      'get Customer success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status === 'error') {
    logger.info(
      'get Customer error',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

exports.updateCustomer = async function (req, res) {
  // Convert firstReport time with the received timeZone
  const timeZoneFromQuery = req.query.timeZone;
  let timeToConvert;
  let convertedTime;
  let firstReportformatHHmm;

  if (req.body.firstReport) {
    timeToConvert = moment.tz(req.body.firstReport, 'HH:mm', timeZoneFromQuery).toISOString();
    convertedTime = toUtc(timeToConvert, timeZoneFromQuery);
    firstReportformatHHmm = moment.utc(convertedTime).format('HH:mm');
    req.body.firstReport = firstReportformatHHmm;
  }
  //Add logo to body
  if (req.file) {
    if (req.file.path.includes('uploads\\')) {
      req.body.logo = req.file.path.replace('uploads\\', '');
    } else {
      req.body.logo = req.file.path.replace('uploads/', '');
    }
  }

  //Convert timezones from string to array and add it to body
  if (req.body.timeZone) {
    const timeZones = req.body.timeZone.split(',');
    req.body.timeZone = timeZones;
  }
  // Convert monitoringTypes from string to array and add it to body
  if (req.body.listMonitoringType) {
    const MonitoringTypes = req.body.listMonitoringType.split(',');
    req.body.listMonitoringType = MonitoringTypes;
  }

  const result = await customerService.updateCustomerService(
    req.params.id,
    req.body
  );
  if (result.status === 'success') {
    logger.info(
      'update Customer success',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status === 'error') {
    logger.info(
      'update Customer error',
      req.route ? req.baseUrl + req.route.path : 'testing',
      req.method ? req.method : 'testing',
      req.ip ? req.ip : 'testing'
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

async function getSystems(customerId, filter, pagination) {
  const systemsId = [];
  const systems = await systemService.getAllSystemByCustomerId(
    customerId,
    filter,
    pagination
  );
  const formattedSystems = systems?.data?.docs?.map((i) =>
  ({
    sysId: i._id,
    systemName: i.name
  })
  )
  systems?.data?.docs.forEach((item) => systemsId.push(item._id));
  if (systems?.status === 'success') {
    return {
      IDs: systemsId,
      systems: formattedSystems
    };
  } else {
    return null;
  }
}

// function getUniqueMaps(array) {
//   const key = 'activity'
//   const distinctMaps = [
//     ...new Map(array?.map(item =>
//       [item.monitoringAct[key], item])).values()
//   ];

//   return distinctMaps?.map((i) => ({
//     mapId: i._id,
//     mapName: i.monitoringAct.activity
//   }))
// }

const getUniqueMonitoringActivitiesFromMaps = (maps) => {
  const monitoringActivities = maps.map(
    (map) => ({
      id: map.monitoringAct._id,
      name: map.monitoringAct.activity
    })
  );

  const uniqueMonitoringActivities = monitoringActivities.filter(
    (monitoringActivity, index) => monitoringActivities.findIndex(a => a['id'] === monitoringActivity['id']) === index
  );

  return uniqueMonitoringActivities;
}

const attachMapsIdsToMonitoringActivities = (monitoringActivities, maps) => {
  const monitoringActivitiesWithMaps = monitoringActivities.map(
    (monitoringActivity) => ({
      id: monitoringActivity.id,
      name: monitoringActivity.name,
      mapsIds: maps.filter( map => monitoringActivity.id.toString() === map.monitoringAct._id.toString() ).map( map => map._id )
    })
  );

  return monitoringActivitiesWithMaps;
}

function generateMapsSystemsLayout(maps, systems) {
  const uniqueMonitoringActivities = getUniqueMonitoringActivitiesFromMaps(maps);
  const uniqueMonitoringActivitiesWithMaps = attachMapsIdsToMonitoringActivities(uniqueMonitoringActivities, maps);

  return {
    systems: systems,
    monitoringActivities: uniqueMonitoringActivitiesWithMaps
  }
}

exports.getCustomerReportLayout = async function (req, res) {
  let searchFilter = { isActive: true };
  const type = req.query?.type;
  const category = req.query?.category;
  if (typeof category !== 'undefined') {
    searchFilter = { ...searchFilter, category: { $in: JSON.parse(category) } }
  }
  if (typeof type !== 'undefined') {
    searchFilter = { ...searchFilter, type: { $in: JSON.parse(type) }, isActive: true }
  }
  const systems = await getSystems(
    req.params.customerId,
    searchFilter,
    false
  );

  const maps = await mapsService.getMapsBySystems(systems?.IDs);
  const output = maps && systems && await generateMapsSystemsLayout(maps.data, systems?.systems);

  if (output) {
    return res.status(200).json({ data: output });
  } else {
    res.status(400).json({ message: 'no data to display' });
  }
};

exports.getCustomersInfoForDashboard = async function (req, res) {
  const customerInfos = await customerService.getCustomersInfoForDashboardService();
  if (customerInfos.status === 'success') {
    return res.status(200).json({ data: customerInfos.data, status: customerInfos.status });
  } else {
    return res.status(400).json({ err: customerInfos.err, status: customerInfos.status });
  }
}