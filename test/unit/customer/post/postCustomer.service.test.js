const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const fixtureLicence = require("../../licence/fixture.json");
const addCustomerService = require("../../../../services/customer/addCustomer.service");
const Customer = require("../../../../models/Customer");
const Licence = require("../../../../models/Licence");
const logger = require("../../../../config/logger");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Customer service", () => {
  let createCustomerStub;
  let createLicenceStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createCustomerStub = sandbox.stub(Customer, "create");
    createLicenceStub = sandbox.stub(Licence, "create");
  });
  afterEach(() => {
    createCustomerStub.restore();
    createLicenceStub.restore();
  });

  
  it("Expect to return an success object - Create Customer without licence", async () => {
    createCustomerStub.returns(fixture.customerDataTestWithoutIDWithoutLicence);
    
    const res = await addCustomerService(fixture.customerDataTestWithoutIDWithoutLicence);
    expect(createCustomerStub).to.have.been.calledOnce;
    expect(createCustomerStub).to.be.calledWith(
      fixture.customerDataTestWithoutIDWithoutLicence
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an success object", async () => {
    createCustomerStub.returns(fixture.customerDataTestWithoutID);
    createLicenceStub.returns({
      "startDate": fixture.customerDataTestWithoutID.startDate,
      "endDate": fixture.customerDataTestWithoutID.endDate,
      "customer": fixture.customerDataTestWithoutID.customer,
    });

    const res = await addCustomerService(fixture.customerDataTestWithoutID);
    expect(createCustomerStub).to.have.been.calledOnce;
    expect(createLicenceStub).to.have.been.calledOnce;

    expect(createCustomerStub).to.be.calledWith(
      fixture.customerDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  
  it("Expect to return an error - Licence creation error", async () => {
    createCustomerStub.returns(fixture.customerDataTestWithoutID)
    createLicenceStub.returns(undefined);
    const res = await addCustomerService(fixture.customerDataTestWithoutID);
    expect(createCustomerStub).to.have.been.calledOnce;
    expect(createLicenceStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.status).to.be.eq("error");
  });

  it("Expect to return an error object - create object", async () => {
    const customerObject = { label: fixture.customerDataTest.label };
    createCustomerStub.returns(undefined);
    const res = await addCustomerService(customerObject);
    expect(createCustomerStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.status).to.be.eq("error");
  });

  it("Expect to throw an Internal Error", async () => {
    createCustomerStub.throws(new Error());
    const res = await addCustomerService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.status).to.be.eq("error");
  });
});
