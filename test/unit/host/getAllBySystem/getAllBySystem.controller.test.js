const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("./fixture.json");
const hostController = require("../../../../controllers/host.controller");
const hostService = require("../../../../services/host");

describe("controller get host by system test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(hostService, "getAllBySystem");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send host by that ID", async () => {
    stubGetById.returns({
      data: fixture.all.success.body.data,
      status: "success",
    });
    let system = fixture.all.success.body.data.docs[0].system;
    let req = {
      body: {},
      params: { sysId: system },
      query: {searchValue: "aaaaaa"}
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.getAllHostBySystem(req, res);
    expect(stubGetById).to.be.calledWith(req.params.sysId);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.all.success.body.data,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "Host not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { sysId: 123 },
      query: {searchValue: "aaaaaa"}
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.getAllHostBySystem(req, res);
    expect(stubGetById).to.be.calledWith(req.params.sysId);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Host not found",
    });
  });

  it("expect to return an error - Missing System ID in Query", async () => {
    stubGetById.returns({
      err: { message: "Host not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: {},
      query: {searchValue: "aaaaaa"},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.getAllHostBySystem(req, res);
    expect(stubGetById).to.be.calledWith(req.params.system);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Host not found",
    });
  });
});
