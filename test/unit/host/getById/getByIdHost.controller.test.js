const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const hostController = require("../../../../controllers/host.controller");
const hostService = require("../../../../services/host");

describe("GET BY ID type Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(hostService, "getHostByID");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send Type by that ID", async () => {
    stubGetById.returns({
      data: fixture.hostDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.hostDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.getHostByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.hostDataTest,
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "host not found" },
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
    await hostController.getHostByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "host not found",
    });
  });
});
