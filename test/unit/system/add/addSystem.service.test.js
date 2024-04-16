const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture2.json");
const addSystem = require("../../../../services/system/add");
const systemService = require("../../../../services/system");
const customer = require("../../../../models/Customer");
const System = require("../../../../models/System");
chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" add system service", () => {
  let createStub;
  //let startSessionStub;
  // let findOneAndUpdateStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    //startSessionStub = sandbox.stub(System, "startSession");
    // findOneAndUpdateStub = sandbox.stub(customer, "findOneAndUpdate");
    createStub = sandbox.stub(System, "create");
  });
  afterEach(() => {
    createStub.restore();
    //startSessionStub.restore();
    //  findOneAndUpdateStub.restore();
  });

  it("Expect to return an success object", async () => {
    // startSessionStub.returns({
    //   startTransaction: sinon.stub(),
    //   endSession: sinon.stub(),
    //   commitTransaction: sinon.stub(),
    // });
    createStub.returns(fixture.SystemDataTest); //removed []

    // findOneAndUpdateStub.returns({
    //   session: sinon.stub().returns({
    //     lean: sinon.stub().returns({
    //       exec: () => {
    //         return {
    //           system: "customerName",
    //         };
    //       },
    //     }),
    //   }),
    // });
    const res = await addSystem({
      ...fixture.SystemDataTestWithoutID,
    });
    expect(createStub).to.have.been.calledOnce;
    // expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an error object - System Not created", async () => {
    createStub.throws(new Error(mongooseError("ss", ["name", "type"])));
    // createStub.throws(new Error(mongooseError("syserror", ["name"])));
    // startSessionStub.returns({
    //   startTransaction: sinon.stub(),
    //   endSession: sinon.stub(),
    //   commitTransaction: sinon.stub(),
    // });

    const res = await addSystem(fixture.emptySytemDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptySytemDataTest);
    // expect(findOneAndUpdateStub).to.have.not.been.called;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");

    expect(res.err.message).to.be.a("string");

    expect(res.err.message).to.be.eq(mongooseError("ss", ["name", "type"]));
  });

  it("Expect to return an error object - customer No found", async () => {
    createStub.throws(new Error(mongooseError("ss", ["name", "type"])));
    //  startSessionStub.returns({
    //   startTransaction: sinon.stub(),
    //   endSession: sinon.stub(),
    //   commitTransaction: sinon.stub(),
    // });
    // findOneAndUpdateStub.returns({
    //    session: sinon.stub().returns({
    //     lean: sinon.stub().returns({
    //       exec: () => undefined,
    //     }),
    //   }),
    // });
    const res = await addSystem({
      ...fixture.SystemDataTestWithoutID,
    });
    // expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.SystemDataTestWithoutID);

    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");

    expect(res.status).to.be.eq("error");
    expect(res.err.message).to.be.a("string");

    expect(res.err.message).to.be.eq(mongooseError("ss", ["name", "type"]));
  });

  it("Expect to throw an error ", async () => {
    createStub.throws(new Error(""));
    const res = await addSystem();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
