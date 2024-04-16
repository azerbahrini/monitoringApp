const mongoose = require("mongoose");
let listCollections = require("./listCollections");
const logger = require('./logger')

require("dotenv").config();

let test = process.env.NODE_ENV ? process.env.DBURI_TEST : process.env.DBURI;
logger.info("database URI",test);
const connectDB = async () => {
  try {
    let res = await mongoose.connect(test, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    logger.info("mongodb conected");
    let db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    if (db) {
      listCollections.collectionList.forEach(function (collectionName) {
        db.createCollection(collectionName, function (err, collection) {
          if (!err) {
            logger.info(collection.collectionName, "Collection created");
          }
        });
      });
      // Create a sparse unique index for users on email
      //await db.collection("users").createIndex({ email: 1 }, { sparse: true, unique: true });
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
