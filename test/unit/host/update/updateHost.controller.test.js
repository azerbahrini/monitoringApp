const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const hostController = require("../../../../controllers/host.controller");
const hostService = require("../../../../services/host");

describe("controller UPDATE Host test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(hostService, "updateHost");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new type ", async () => {
    stubUpdate.returns({
      data: fixture.hostDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.hostDataTest },
      params: { id: fixture.hostDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.updateHostController(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.hostDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "host not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.hostDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.updateHostController(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "host not found",
    });
  });
});
