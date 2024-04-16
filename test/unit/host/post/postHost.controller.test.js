const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const hostController = require("../../../../controllers/host.controller");
const hostService = require("../../../../services/host");
describe("controller POST Host by id test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(hostService, "addHost");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct type object ", async () => {
    stubAdd.returns({
      data: fixture.hostDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.hostDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.addHostController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.hostDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { isActive: fixture.hostDataTest.isActive },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await hostController.addHostController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
