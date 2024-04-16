const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture2.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");
const System = require("../../../../models/System");
describe("controller GET ALL test ", () => {
  let stubGetAll;
  let findStub;
  beforeEach(() => {
    stubGetAll = sinon.stub(systemService, "getAllSystemService");
    findStub = sinon.stub(System, "find");
  });
  afterEach(() => {
    stubGetAll.restore();
    findStub.restore();
  });
  it("expect to send all role system", async () => {
    stubGetAll.returns({
      data: fixture.arrayofSystems,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 1, size: 5 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllSystemController(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofSystems,
    });
  });

  it("expect not  to send all role system", async () => {
    stubGetAll.returns({
      err: { message: "error" },
      status: "error",
    });
    let req = { body: {}, params: {} ,query:{page:1,size:5}};
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await systemController.getAllSystemController(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.be.calledWith(400);
    expect(res.json).be.calledWith({
      message: "error",
    });
  });
});
