const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addSyncShiftLog = require("../../../../services/syncShiftLog/addSyncShiftLog");
const SyncShiftLog = require("../../../../models/shiftSyncLog");

chai.use(sinonChai);
describe(" POST SyncShiftLog service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(SyncShiftLog, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    createStub.returns(fixture.getLatest);

    const res = await addSyncShiftLog({
      syncedShifts: null,
      unSyncedShifts: null,
      shiftsSyncDate: "",
      user: {
        _id: "60c8b5dad0058a4741ec0584",
        RoleHistory: [
          "60c8b614d0058a4741ec05ac",
          "60c8b623d0058a4741ec05ad",
          "60f88aefd16e9d5aab469008",
        ],
        listModule: [],
        firstName: "Mohamed",
        lastName: "Mansouri",
        email: "mohamed.mansouri@avaxia-group.com",
        phoneNumber: "NaN",
        status: true,
        password:
          "$2a$10$EjknYUmVs4oiIyw.tWERe.8/Z3y7FNj2V4nlkkHHXmHsYHuHVRjAu",
        createdAt: "2021-06-15T14:14:51.039Z",
        updatedAt: "2021-07-21T21:00:31.985Z",
        __v: 0,
        Level: "60a304b073583d1666933c82",
        microsoftId: "9324b7bd-9d21-42ea-88b1-be4f6e55b41f",
        isActive: true,
      },
      syncedUsers: [],
    });
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return error Description", async () => {
    createStub.returns(fixture.getLatest);

    const res = await addSyncShiftLog({
      errorDescription: "error description",
    });
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith({
      errorDescription: "error description",
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an error object - Error in Sync Shift Log", async () => {
    createStub.throws(new Error("Error invalid object"));
    const res = await addSyncShiftLog({ errorDescription: "" });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq("Error invalid object");
    expect(res.status).to.be.eq("error");
  });

  it("Expect to return an error object - Create with Error Description", async () => {
    createStub.throws(new Error("Error invalid object"));
    const res = await addSyncShiftLog({
      errorDescription: "error description",
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq("Error invalid object");
    expect(res.status).to.be.eq("error");
  });
});
