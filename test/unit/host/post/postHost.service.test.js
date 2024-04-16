const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("../fixture.json");
const addHostService = require("../../../../services/host/addHost");
const Host = require("../../../../models/Host");
const System = require("../../../../models/System");
const logger = require("../../../../config/logger");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Host service", () => {
  let createStub;
  let findOneAndUpdateStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Host, "create");
    findOneAndUpdateStub = sandbox.stub(System, "findOneAndUpdate");
  });
  afterEach(() => {
    createStub.restore();
    findOneAndUpdateStub.restore();
  });
  it("Expect to return an success object", async () => {
    const startSessionStub = sandbox.stub(Host, "startSession").returns({
      startTransaction: sinon.stub(),
      commitTransaction: sinon.stub(),
      endSession: sinon.stub(),
    });

    createStub.returns([fixture.hostDataTest]);
    findOneAndUpdateStub.returns({
      session: sinon.stub().returns({
        lean: sinon.stub().returns({
          exec: () => {
            return {
              system: "systemName",
            };
          },
        }),
      }),
    });
    try {
      const res = await addHostService({
        ...fixture.hostDataTestWithoutID,
        systemId: fixture.systemId,
      });
      expect(createStub).to.have.been.calledOnce;
      expect(findOneAndUpdateStub).to.have.been.calledOnce;
      expect(res).to.be.a("object");
      expect(res).to.have.property("data");
      expect(res).to.have.property("status");
      expect(res.data).to.be.a("object");
      expect(res.status).to.be.eq("success");
    } catch (err) {
      logger.error(
        err.message
      );    }
    startSessionStub.restore();
  });
  it("expect to return an error object - missing property", async () => {
    const hostObject = {host: "test  host" };
    createStub.throws(new Error(mongooseError("host", ["host"])));
    const res = await addHostService(hostObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(hostObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("host", ["host"]));
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an error object - empty object", async () => {
    const hostObject = {};
    createStub.throws(
      new Error(mongooseError("host", ["host", "isActive","system"]))
    );
    const res = await addHostService(hostObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(hostObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("host", ["host", "isActive","system"])
    );
    expect(res.status).to.be.eq("error");
  });

});
