const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("./fixture.json");
const slaContractController = require("../../../../controllers/slaContract.controller");
const slaContractService = require("../../../../services/slaContract");

describe("controller get slaContract by Customer test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(
      slaContractService,
      "getAllSlaContractByCustomerId"
    );
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send slaContract by that ID", async () => {
    stubGetById.returns({
      data: fixture.all.success.body.data,
      status: "success",
    });
    let customer = fixture.all.success.body.data.docs[0].customer;

    let req = {
      params: { customer_Id: customer },
      query: { page: 0, size: 10 },
    };

    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getAllSlaContractByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer_Id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.all.success.body.data,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "SlaContract not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { Id_Customer: "610d502489e61a36e88e1d27" },
      query: { page: 0, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getAllSlaContractByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer_Id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "SlaContract not found",
    });
  });

  it("expect to return an error - Missing SlaContract ID in Query", async () => {
    stubGetById.returns({
      err: { message: "Missing slaContract ID" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: {},
      query: { page: 0, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getAllSlaContractByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Missing slaContract ID",
    });
  });
});
