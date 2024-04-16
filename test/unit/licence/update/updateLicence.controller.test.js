const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const licenceController = require("../../../../controllers/licence.controller");
const licenceService = require("../../../../services/licence");

describe("controller UPDATE Licence test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(licenceService, "updateLicenceService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new licence ", async () => {
    stubUpdate.returns({
      data: fixture.licenceDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.licenceDataTest },
      params: { id: fixture.licenceDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.updateLicence(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.licenceDataTest,
    });
  });



  it("expect to return new licence route+post+ip", async () => {
    stubUpdate.returns({
      data: fixture.licenceDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.licenceDataTest },
      params: { id: fixture.licenceDataTest._id },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.updateLicence(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.licenceDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "licence not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.licenceDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.updateLicence(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "licence not found",
    });
  });


  it("expect to return an error - ID Does not exist route+post+ip", async () => {
    stubUpdate.returns({
      err: { message: "licence not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.licenceDataTest },
      params: { id: fixture.wrongID },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.updateLicence(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "licence not found",
    });
  });
});
