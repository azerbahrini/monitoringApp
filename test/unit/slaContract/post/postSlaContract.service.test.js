const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("../fixture.json");
const addSlaContract = require("../../../../services/slaContract/addSlaContract.service");
const SlaContract = require("../../../../models/SlaContract");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe("testing add service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(SlaContract, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {
    const slaContractDataTestWithoutID = {
      startDate: "2021-08-06T15:35:12.193+00:00",
      endDate: "2021-08-08T15:35:12.193+00:00",
      class: "613f7862b8e455ecb5ee5539",
      customer: "610d502489e61a36e88e1d27",
    };

    createStub.returns(fixture.slaContractDataTest);

    const res = await addSlaContract(slaContractDataTestWithoutID);

    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(slaContractDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an success object - adding random property ", async () => {
    const slaContractDataTestWithoutID = {
      startDate: "2021-08-06T15:35:12.193+00:00",
      endDate: "2021-08-08T15:35:12.193+00:00",
      class: "613f7862b8e455ecb5ee5539",
      customer: "610d502489e61a36e88e1d27",
    };

    createStub.returns(fixture.slaContractDataTest);

    const res = await addSlaContract(slaContractDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(slaContractDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return a creation problem", async () => {
    const slaContractObject = {};
    createStub.returns(null);
    const res = await addSlaContract(slaContractObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(slaContractObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq("SlaContract creation problem");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an error object - missing property", async () => {
    const slaContractDataTestWithoutID = {
      class: "613f7862b8e455ecb5ee5539",
      customer: "610d502489e61a36e88e1d27",
    };
    createStub.throws(new Error(mongooseError("slaContract", ["slaContract"])));
    const res = await addSlaContract(slaContractDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(slaContractDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("slaContract", ["slaContract"])
    );
    expect(res.status).to.be.eq("error");
  });
});
