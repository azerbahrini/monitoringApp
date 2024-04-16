const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const itOperationController = require("../../../../controllers/itOperation.controller");
const itOperationService = require("../../../../services/itOperation");
describe("controller POST ItOperation test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(itOperationService, "addItOperationService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct itOperation object ", async () => {
    stubAdd.returns({
      data: fixture.itOperationDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.itOperationDataTestWithoutID },
      params: {},
      query:{sendMail:"false"}
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await itOperationController.addItOperation(req, res);
    expect(stubAdd).to.be.calledWith({ ...req.body,changesNotSaved:["created"]});
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.itOperationDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { title: fixture.itOperationDataTest.title },
      params: {},
      query:{sendMail:"false"}
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await itOperationController.addItOperation(req, res);
    expect(stubAdd).to.be.calledWith({ ...req.body,changesNotSaved:["created"]});
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
