const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const itOperationController = require("../../../../controllers/itOperation.controller");
const itOperationService = require("../../../../services/itOperation");

describe("controller UPDATE ItOperation test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(itOperationService, "updateItOperationService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new itOperation ", async () => {
    stubUpdate.returns({
      data: fixture.itOperationDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.itOperationDataTest },
      params: { id: fixture.itOperationDataTest._id },
      query:{sendMail:"false",change:"updated"} 
       };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await itOperationController.updateItOperation(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, { $set: req.body, $push:{"changesNotSaved":"updated"}},true);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.itOperationDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "itOperation not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
        body: { ...fixture.itOperationDataTest },
        params: { id: fixture.wrongID },
        query:{sendMail:"false",change:"updated"} 
         };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await itOperationController.updateItOperation(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, { $set: req.body, $push:{"changesNotSaved":"updated"}},true);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "itOperation not found",
    });
  });
});
