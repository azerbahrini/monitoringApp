const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("./fixture.json");
const categoryController = require("../../../../controllers/category.controller");
const categoryService = require("../../../../services/category");
describe("controller add a category ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(categoryService, "addCategory");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct system class object ", async () => {
    stubAdd.returns({
      data: fixture.add.success.body.data,
      status: "success",
    });
    let req = {
      body: { ...fixture.add.success.body.data },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.addCategory(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.add.success.body.data,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { active: fixture.add.success.body.data[0].active },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.addCategory(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
  it("send a wrong data form - Invalid status", async () => {
    stubAdd.returns({
      err: { message: "Invalid status message" },
      status: "Invalid status",
    });
    let req = {
      body: { active: fixture.add.success.body.data[0].active },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.addCategory(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(stubAdd).to.be.calledOnce;
  });
});
