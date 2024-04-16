const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const levelController = require("../../../../controllers/level.controller");
const levelService = require("../../../../services/level");
describe("controller POST level by id test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(levelService, "addLevel");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct type object ", async () => {
    stubAdd.returns({
      data: fixture.levelDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.levelDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await levelController.addLevel(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.levelDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: {},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await levelController.addLevel(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
