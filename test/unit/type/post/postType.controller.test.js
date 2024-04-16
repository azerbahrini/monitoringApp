const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const typeController = require("../../../../controllers/type.controller");
const typeService = require("../../../../services/type");
describe("controller POST type by id test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(typeService, "addTypeService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct type object ", async () => {
    stubAdd.returns({
      data: fixture.typeDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.typeDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.addType(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.typeDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { isActive: fixture.typeDataTest.active },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.addType(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
