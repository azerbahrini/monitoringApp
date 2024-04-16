const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllItOperationService = require("../../../../services/itOperation/getAllItOperation.service");
const ItOperation = require("../../../../models/ItOperation");

chai.use(sinonChai);

describe("GET ALL ItOperation service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(ItOperation, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
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
    findStub.returns({docs:fixture.arrayofItOperations,totalDocs: 6,
        offset: 0,
        limit: 3,
        totalPages: 2,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null,
        nextPage: 2});
    const res = await getAllItOperationService(conditions,options);
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith(conditions,options);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.have.property("docs");
    expect(res.data.docs).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllItOperationService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
