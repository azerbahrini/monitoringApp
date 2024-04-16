const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("./fixture.json");
const addShiftService = require("../../../../services/shift/addShift");
const Shift = require("../../../../models/Shift");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe("testing add shift", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Shift, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {
    const shiftObject = {
      id: fixture.add.success.body.data[0].id,
      userId: fixture.add.success.body.data[0].userId,
    };

    createStub.returns(fixture.add.success.body.data[0]);

    const res = await addShiftService(shiftObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(shiftObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an success object - adding random property ", async () => {
    const shiftObject = {
      id: fixture.add.success.body.data[0].id,
      userId: fixture.add.success.body.data[0].userId,
      name: "test",
    };

    createStub.returns(fixture.add.success.body.data[0]);

    const res = await addShiftService(shiftObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(shiftObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an error object - empty object", async () => {
    const shiftObject = {};
    createStub.throws(
      new Error(mongooseError("shift", ["id", "userId"]))
    );
    const res = await addShiftService(shiftObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(shiftObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    //expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("shift", ["id", "userId"])
    );
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an error object - missing property", async () => {
    const shiftObject = { id: fixture.add.success.body.data[0].id };
    createStub.throws(new Error(mongooseError("shift", ["id"])));
    const res = await addShiftService(shiftObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(shiftObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    //expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("shift", ["id"]));
    expect(res.status).to.be.eq("error");
  });
});
