const sinon = require("sinon");
const expect = require("chai").expect;
const fixture = require("./fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("controller get system Types by Customer test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(systemService, "getTypes");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send system by that ID", async () => {
    stubGetById.returns({
      data: [
        {
          "_id": "608be0f0c5a2a0bd397294aa",
          "type": "PRD"
      },
      {
        "_id": "608be0f0c5a2a0bd397294aa",
        "type": "QAS"
    }
      ],
      status: "success",
    });
    
    let req = {
      params: { customerId: "610d502489e61a36e88e1d27" },
    };

    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getTypes(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customerId);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({data: [
      {
        "_id": "608be0f0c5a2a0bd397294aa",
        "type": "PRD"
    },
    {
      "_id": "608be0f0c5a2a0bd397294aa",
      "type": "QAS"
  }
    ]
  });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "Type not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { customerId: "610d502489e61a36e88e1d27" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getTypes(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customerId);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "Type not found",
    });
  });

  it("expect to return an error - Missing System ID in Query", async () => {
    stubGetById.returns({
      err: { message: "Missing customer ID" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { customerId: "610d502489e61a36e88e1d27" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getTypes(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customerId);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Missing customer ID",
    });
  });
});
