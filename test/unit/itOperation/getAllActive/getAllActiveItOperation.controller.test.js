const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const itOperationController = require("../../../../controllers/itOperation.controller");
const itOperationService = require("../../../../services/itOperation");

describe("controller GET ALL test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(itOperationService, "getAllItOperationService");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all ItOperations", async () => {
    stubGetAll.returns({
      data: fixture.arrayofItOperations,
      status: "success",
    });
    let page = 0;
    let size = 3;
    let sort = 1;
    let conditions={ status:"active"};
    let options = {
      offset: page * size,
      limit: size,
      sort:{startDate: sort },
      populate:[{path:"spoc", select:["firstName","lastName"]},
      {path:"system",select:"system",populate:{path:"customer",select:"label"}},
      {path:"listContact",select:["-updatedAt","-createdAt"]}]
    };
    let req = { body: {}, params: {}, query:{page:page,size:size,sort:sort} };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await itOperationController.getAllActiveItOperation(req, res);
    expect(stubGetAll).to.be.calledWith(conditions,options);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofItOperations,
    });
  });
});
