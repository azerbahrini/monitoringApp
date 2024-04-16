const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
let express = require("express");
const app = require("../../../server");
let ShiftSyncLog = require("../../../models/shiftSyncLog");

chai.use(sinonChai);
let shiftSyncLog;
describe("GET ALL shiftSyncLog", () => {
  before("adding shiftSyncLog before beginning the test", () => {
    shiftSyncLog = ShiftSyncLog({
      syncedShifts: 50,
      unSyncedShifts: 50,
      shiftsSyncDate: "2021-10-13",
      user: "61718d5846a58041e8c4c288",
      syncedUsers: [
        { firstName: "User", lastName: "Test" },
        { firstName: "secondUser", lastName: "Test2" },
      ],
      errorDescription: "test test",
    });
    shiftSyncLog.save();
  });
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/shiftSyncLog/getLastShiftSyncLog")
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/test/getLastShiftSyncLog")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(404);
  });
  after(() => {
    ShiftSyncLog.findByIdAndDelete(shiftSyncLog._id);
  });
});
