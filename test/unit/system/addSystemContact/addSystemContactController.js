const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("controller update system test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(systemService, "addCustomerContactToSystem");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return updated system with new contact ", async () => {
      let data = {"listCustomerContact" : ["611f8e24b7123928c0e6dfff"]}
    stubUpdate.returns({
      data: {
        "_id": "611f8e24b7123928c0e6dc81",
        "listHost": [],
        "listClient": [],
        "listMap": [],
        "listTechnicalUser": [],
        "listCustomerContact": [
            "609a09d8f0cbc8558861a008",
            "60220555ed429437986ed58c",
            "611f8e24b7123928c0e6dc82",
            "611f8e24b7123928c0e6dfff"
            
        ],
        "listItOperation": [],
        "isActive": true,
        "system": "systemName",
        "createdAt": "2021-08-20T11:12:36.344Z",
        "updatedAt": "2021-09-16T10:22:59.752Z",
        
    },
      status: "success",
    });
    let req = {
      body: {listContact : ["611f8e24b7123928c0e6dfff"]},
      params: {id: "611f8e24b7123928c0e6dc81" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.addSystemContact(req, res);
    expect(stubUpdate).to.be.calledWith(req.body.listContact, req.params.id);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: {
        "_id": "611f8e24b7123928c0e6dc81",
        "listHost": [],
        "listClient": [],
        "listMap": [],
        "listTechnicalUser": [],
        "listCustomerContact": [
            "609a09d8f0cbc8558861a008",
            "60220555ed429437986ed58c",
            "611f8e24b7123928c0e6dc82",
            "611f8e24b7123928c0e6dfff"
            
        ],
        "listItOperation": [],
        "isActive": true,
        "system": "systemName",
        "createdAt": "2021-08-20T11:12:36.344Z",
        "updatedAt": "2021-09-16T10:22:59.752Z",
        
    },
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "system not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {listContact : ["611f8e24b7123928c0e6dfff"]},
      params: {id: "611f8e24b7123928c0e6dc81" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.addSystemContact(req, res);
    expect(stubUpdate).to.be.calledWith(req.body.listContact,req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "system not found",
    });
  });
});
