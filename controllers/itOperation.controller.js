const itOperationService = require("../services/itOperation");
const logger = require("../config/logger");

//Add ItOperation
exports.addItOperation = async function (req, res) {
  if (req.query.sendMail === "false") {
    req.body.changesNotSaved = ["created"];
  }
  const result = await itOperationService.addItOperationService(req.body);
  if (result.status == "success") {
    logger.info(
      "add ItOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "add ItOperation fail :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(400).json({ message: result.err.message });
  }
};

//Get All active ItOperation
exports.getAllActiveItOperation = async function (req, res) {
  let page = req.query.page;
  let size = req.query.size;
  let sort = req.query.sort;
  let conditions = { status: "active" };
  let options = {
    offset: page * size,
    limit: size,
    sort: { startDate: sort },
    populate: [
      { path: "spoc", select: ["firstName", "lastName"] },
      {
        path: "system",
        select: "system",
        populate: { path: "customer", select: "label" },
      },
      { path: "listContact", select: ["-updatedAt", "-createdAt"] },
    ],
  };
  const result = await itOperationService.getAllItOperationService(
    conditions,
    options
  );
  if (result.status == "success") {
    logger.info(
      "get All Active itOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get All Active ItOperation :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get All Archived ItOperation
exports.getAllArchivedItOperation = async function (req, res) {
  let page = req.query.page;
  let size = req.query.size;
  let sort = req.query.sort;
  let conditions = { status: "archived" };
  let options = {
    offset: page * size,
    limit: size,
    sort: { startDate: sort },
    populate: [
      { path: "spoc", select: ["firstName", "lastName"] },
      {
        path: "system",
        select: "system",
        populate: { path: "customer", select: "label" },
      },
      { path: "listContact", select: ["-updatedAt", "-createdAt"] },
    ],
  };
  const result = await itOperationService.getAllItOperationService(
    conditions,
    options
  );
  if (result.status == "success") {
    logger.info(
      "get All Archived itOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(200).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "get All Archived ItOperation :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Update ItOperation
exports.updateItOperation = async function (req, res) {
  let sendMail = req.query.sendMail;
  let change = req.query.change;
  let update = { $set: req.body };
  if (sendMail === "false") {
    update.$push = { changesNotSaved: change };
  } else {
    update.$set.changesNotSaved = [];
  }
  const result = await itOperationService.updateItOperationService(
    req.params.id,
    update,
    true
  );
  if (result.status == "success") {
    if (sendMail === "true") {
      //Call for send mailNotil service
    }
    logger.info(
      "update itOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "update ItOperation :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Cancel ItOperation
exports.cancelItOperation = async function (req, res) {
  let sendMail = req.query.sendMail;
  let update = {
    $set: { canceledNotes: req.body.notes, canceledAt: new Date() },
  };
  if (sendMail === "false") {
    update.$push = { changesNotSaved: "canceled" };
  } else {
    update.$set.changesNotSaved = [];
    update.$set.status = "archived";
  }
  const result = await itOperationService.updateItOperationService(
    req.params.id,
    update,
    true
  );
  if (result.status == "success") {
    if (sendMail === "true") {
      //Call for send mailNotil service
    }
    logger.info(
      "cancel itOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "cancel ItOperation :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Finish ItOperation
exports.finishItOperation = async function (req, res) {
  let sendMail = req.query.sendMail;
  let update = { $set: { finishedAt: new Date() } };
  if (sendMail === "false") {
    update.$push = { changesNotSaved: "finished" };
  } else {
    update.$set.changesNotSaved = [];
    update.$set.status = "archived";
  }
  const result = await itOperationService.updateItOperationService(
    req.params.id,
    update,
    true
  );
  if (result.status == "success") {
    logger.info(
      "finish itOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    if (sendMail === "true") {
      //Call for send mailNotil service
    }
    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "finish ItOperation :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Remind ItOperation
exports.remindItOperation = async function (req, res) {
  let update = { $set: { remindedAt: new Date(), changesNotSaved: [] } };
  const result = await itOperationService.updateItOperationService(
    req.params.id,
    update,
    true
  );
  if (result.status == "success") {
    logger.info(
      "remind itOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );

    //Call for send mailNotil service

    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "remind ItOperation :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Send last changes
exports.sendChanges = async function (req, res) {
  let update = { $set: { changesNotSaved: [] } };

  //Get old It operation
  const oldDoc = await itOperationService.updateItOperationService(
    req.params.id,
    {},
    false
  );
  if (oldDoc.status == "success") {
    if (
      oldDoc.data.changesNotSaved.includes("canceled") ||
      oldDoc.data.changesNotSaved.includes("finished")
    ) {
      update.$set.status = "archived";
    }
  }
  if (oldDoc.status == "error") {
    logger.error(
      "send changes ItOperation :" + oldDoc.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(oldDoc.statusCode ? oldDoc.statusCode : 400)
      .json({ message: oldDoc.err.message });
  }

  //Update changes
  const result = await itOperationService.updateItOperationService(
    req.params.id,
    update,
    true
  );
  if (result.status == "success") {
    logger.info(
      "send changes itOperation success",
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );

    //Call send MailNotif service with oldDoc.data

    return res.status(201).json({ data: result.data });
  }
  if (result.status == "error") {
    logger.error(
      "send changes ItOperation :" + result.err.message,
      req.route ? req.baseUrl + req.route.path : "testing",
      req.method ? req.method : "testing",
      req.ip ? req.ip : "testing"
    );
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

//Get All ItOperation by System Id

exports.getAllItOperationBySystem = async function (req, res) {
  let sysId = req.params.sysId;
  let page = req.query.page;
  let size = req.query.size;

  const result = await itOperationService.getAllItOperationBySystem(
    sysId,
    page,
    size
  );
  if (result.status == "success")
    return res.status(200).json({ data: result.data });
  if (result.status == "error")
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
};
