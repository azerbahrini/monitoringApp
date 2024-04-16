const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addLicenceService = require("../../../../services/licence/addLicence.service");
const Licence = require("../../../../models/Licence");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Licence service", () => {
  let findStub;
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    findStub = sandbox.stub(Licence, "find");
    createStub = sandbox.stub(Licence, "create");
  });
  afterEach(() => {
    findStub.restore();
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns([]);
    createStub.returns(fixture.licenceDataTestWithoutID);

    const res = await addLicenceService(fixture.licenceDataTestWithoutID);
    expect(findStub).to.have.been.calledOnce;
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.licenceDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return licence Already Exist Error", async () => {
    findStub.returns([fixture.licenceDataTest]);
    const res = await addLicenceService(fixture.licenceDataTestWithoutID);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.err.message).to.be.eq(
      "Licence Already Exist During This Periode"
    );
  });

  it("Expect to return an error object - adding random property ", async () => {
    findStub.returns([]);
    createStub.returns(null);
    const res = await addLicenceService(fixture.wrongLicenceDataTest);
    expect(findStub).to.have.been.calledOnce;
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongLicenceDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.err.message).to.be.eq("Licence creation problem");
  });

  it("Expect to return an error object - empty object", async () => {
    findStub.returns([]);
    createStub.throws(
      new Error(mongooseError("licence", ["label", "isActive", "rank"]))
    );
    const res = await addLicenceService(fixture.emptyLicenceDataTest);
    expect(findStub).to.have.been.calledOnce;
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptyLicenceDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("licence", ["label", "isActive", "rank"])
    );
    expect(res.status).to.be.eq("error");
  });

  it("Expect to return an error object - missing property", async () => {
    findStub.returns([]);
    const licenceObject = { startDate: fixture.licenceDataTest.startDate };
    createStub.throws(
      new Error(mongooseError("licence", ["endDate", "customer"]))
    );
    const res = await addLicenceService(licenceObject);
    expect(findStub).to.have.been.calledOnce;
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(licenceObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("licence", ["endDate", "customer"])
    );
    expect(res.status).to.be.eq("error");
  });
});
