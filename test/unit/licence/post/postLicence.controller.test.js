const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const licenceController = require("../../../../controllers/licence.controller");
const licenceService = require("../../../../services/licence");
describe("controller POST Licence test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(licenceService, "addLicenceService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct licence object ", async () => {
    stubAdd.returns({
      data: fixture.licenceDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.licenceDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.addLicence(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.licenceDataTest,
    });
  });


  it("send a correct licence object route+post+ip", async () => {
    stubAdd.returns({
      data: fixture.licenceDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.licenceDataTestWithoutID },
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.addLicence(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.licenceDataTest,
    });
  });



  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { startDate: fixture.licenceDataTest.startDate },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.addLicence(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("send a wrong data form - Missing Property route+post+ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { startDate: fixture.licenceDataTest.startDate },
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.addLicence(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
