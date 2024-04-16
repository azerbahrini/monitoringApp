const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("../fixture.json");
const addCustomerContactService = require("../../../../services/customerContact/addCustomerContact.service");
const CustomerContact = require("../../../../models/CustomerContact");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe("testing POST Customer Contact  service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(CustomerContact, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {
    createStub.returns(fixture.customerContactDataTest);

    const res = await addCustomerContactService(
      fixture.customerContactDataTestWithoutID
    );
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(
      fixture.customerContactDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Throw an Internal Error", async () => {
    createStub.throws(new Error("Random Error"));
    const res = await addCustomerContactService();
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.status).to.be.eq("error");
  });
});
