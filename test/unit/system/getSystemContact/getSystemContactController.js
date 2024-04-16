const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("GET System Contact Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(systemService,"getContactList");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to get system contact by that ID", async () => {
    stubGetById.returns({
      data: fixture.SystemDataTest,
      status: "success",
    });
    const req = {
      body: {},
      params: { id: fixture.SystemDataTest._id },
      query: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getListContact(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.SystemDataTest
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "system not found" },
      status: "error",
      statusCode: 404
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
      query:{}
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getListContact(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({ message: "system not found" });
  });
});
