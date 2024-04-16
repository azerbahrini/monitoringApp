const { formatPayload } = require("./helpers");

let File = require("../../models/File");

exports.createFiles = async function (request, response) {
  const payload = formatPayload(request.files)

  File.insertMany(payload)
    .then((result) =>{
    let filesId = result.map((file) =>file._id)
      response.status(201).json({
        message: "Files registered successfully!",
        files: filesId
      })}
    )
    .catch((error) => response.status(500).json({ error }));
};
