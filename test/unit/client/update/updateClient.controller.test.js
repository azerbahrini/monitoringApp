const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const clientController = require("../../../../controllers/client.controller");
const clientService = require("../../../../services/client");

describe("controller UPDATE Client est ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(clientService, "updateClient");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new type ", async () => {
    stubUpdate.returns({
      data: fixture.clientDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.clientDataTest },
      params: { id: fixture.clientDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await clientController.updateClient(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.clientDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "client not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.clientDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await clientController.updateClient(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "client not found",
    });
  });
});
