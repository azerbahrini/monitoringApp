const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const hostController = require("../../../../controllers/host.controller");
const hostService = require("../../../../services/host");

describe("controller DELETE Host test ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(hostService, "deleteHost");
  });
  afterEach(() => {
    stubDelete.restore();
  });
  it("expect to return new type ", async () => {
    stubDelete.returns({
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
    await hostController.deleteHostController(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).be.calledWith({
      data: fixture.hostDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubDelete.returns({
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
    await hostController.deleteHostController(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "host not found",
    });
  });
});
