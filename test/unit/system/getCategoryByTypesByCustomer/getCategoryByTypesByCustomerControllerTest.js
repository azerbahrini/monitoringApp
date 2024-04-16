const sinon = require("sinon");
const expect = require("chai").expect;
const systemController = require("../../../../controllers/system.controller");
const fixture = require("../fixture.json")
const systemService = require("../../../../services/system");

describe("GET BY ID system Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(systemService,"getCategory");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send system by that ID", async () => {
    stubGetById.returns({
        data: [
          {
            "_id": "608be0f0c5a2a0bd397294aa",
            "category": "SAP-ADS"
        },
        {
          "_id": "608be0f0c5a2a0bd397294aa",
          "category": "Boomi"
      }
        ],
        status: "success",
      });
    let req = {
      body: {},
      params: { customerId: fixture.SystemDataTest.customer , typeId: fixture.SystemDataTest.type},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getCategory(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customerId , req.params.typeId);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
        data: [
          {
            "_id": "608be0f0c5a2a0bd397294aa",
            "category": "SAP-ADS"
        },
        {
          "_id": "608be0f0c5a2a0bd397294aa",
          "category": "Boomi"
      }
        ]
      });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "Category not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { customerId: fixture.wrongID , typeId:fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getCategory(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customerId , req.params.typeId);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({ message: "Category not found" });
  });
});
