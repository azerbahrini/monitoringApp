const mtpService = require('../services/mtp');

//Add MTP
exports.addMtp = async function (req, res) {
  const result = await mtpService.addMtpService(req.body);
  if (result.status === 'success') {
 return res.status(201).json({ data: result.data });
}
  if (result.status === 'error') {
 return res.status(400).json({ message: result.err.message });
}
};

//Get All MTP
exports.getAllMTP = async function (req, res) {
  const page = req.query.page;
  const size = req.query.size;
  const isActive = req.query?.isActive;
  let activeFilterObject = {}
  if (typeof isActive !== 'undefined') {
    activeFilterObject = {isActive: isActive};
  }
  const result = await mtpService.getAllMtpService(
    page,
    size,
    activeFilterObject
  );
  if (result.status === 'success') {
 return res.status(200).json({ data: result.data });
}
if (result.status === 'no data') {
  return res.status(204).json({ message: result.err.message });
 }
  if (result.status === 'error') {
 res.status(400).json({ message: result.err.message });
}
};

//Get MTP by Id
exports.getMTPById = async function (req, res) {
  const result = await mtpService.getOneMtpService(req.params.id);

  if (result.status === 'success') {
 return res.status(200).json({ data: result.data });
}
if (result.status === 'no data') {
    return res.status(204).json({ message: result.err.message });
   }

  if (result.status === 'error') {
 res.status(400).json({ message: result.err.message });
}
};

exports.updateMTP = async function (request, res) {
  const filter = {
    _id: request.params.id
  };

  const updateMtp = await mtpService.updateMtpService(
    filter,
    request.body
  );
  if (updateMtp.status === 'success') {
 return res.status(201).json({ data: updateMtp.data });
}
if (updateMtp.status === 'no data') {
    return res.status(204).json({ message: updateMtp.err.message });
   }
  if (updateMtp.status === 'error') {
 return res
      .status(updateMtp.statusCode ? updateMtp.statusCode : 400)
      .json({ message: updateMtp.err.message });
}
};

exports.deleteMtp = async function (request, res) {
    const filter = {
      _id: request.params.id
    };
    const result = await mtpService.deleteMtpService(
      filter
    );
    if (result.status === 'success') {
   return res.status(201).json({ data: result.data });
  }
  if (result.status === 'no data') {
      return res.status(204).json({ message: result.err.message });
     }
    if (result.status === 'error') {
   return res
        .status(result.statusCode ? result.statusCode : 400)
        .json({ message: result.err.message });
  }
  };
