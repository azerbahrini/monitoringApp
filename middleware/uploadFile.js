const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// SET STORAGE
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

// Set file filter
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/png'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage: storage,
  limits: {
    fields: 10,
    fieldNameSize: 100,
    fieldSize: 50000,
    //150 KB for a 1080x1080 JPG 90
    fileSize: 5000000
  }
 // fileFilter: fileFilter
});

module.exports = upload;
