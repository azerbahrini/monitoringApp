const request = require("request");
const logger = require("../../config/logger");
const http = require("http");
const cron = require("cron").CronJob;
const HOSTNAME = process.env.NODE_HOST;
const PORT = process.env.PORT;

module.exports = async () => {
  try {
    let job = new cron(
      "0 2 * * *",
      () => {
        const options = {
          hostname: HOSTNAME,
          port: PORT,
          path: "/api/shift/sync?methode=Cron",
          method: "PATCH",
        };

        callback = function (response) {
          let str = "";
          response.on("data", function (chunk) {
            str += chunk;
          });
          response.on("end", function () {
            logger.info(str);
          });
        };

      http.request(options, callback).end();
      logger.info("Running Sync Shift 2PM UTC");
      },
      null,
      true,
      "UTC"
    );

    job.start();
  } catch (error) {
    logger.error("Sync Failed", error);
  }
};
