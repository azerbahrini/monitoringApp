const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const licenceController = require("../../../../controllers/licence.controller");
const licenceService = require("../../../../services/licence");

describe("GET BY ID licence Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(licenceService, "getLicenceByIdService");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send Licence by that ID", async () => {
    stubGetById.returns({
      data: fixture.licenceDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.licenceDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLicenceById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.licenceDataTest,
    });
  });


  it("Expect to send Licence by that ID route+post+ip", async () => {
    stubGetById.returns({
      data: fixture.licenceDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.licenceDataTest._id },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLicenceById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.licenceDataTest,
    });
  });


  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "licence not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLicenceById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "licence not found",
    });
  });


  it("Expect to return an error - ID Does not exist route+post+ip", async () => {
    stubGetById.returns({
      err: { message: "licence not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLicenceById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "licence not found",
    });
  });
});
