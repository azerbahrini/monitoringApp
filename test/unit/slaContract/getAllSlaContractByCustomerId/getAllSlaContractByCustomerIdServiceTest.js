const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllSlaContractByCustomerId = require("../../../../services/slaContract/getAllSlaContractByCustomerId");
const SlaContract = require("../../../../models/SlaContract");

chai.use(sinonChai);

describe("GET ALL SlaContracts By SlaContract service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  let paginateStub ; 
  beforeEach(() => {
    findStub = sandbox.stub(SlaContract, "aggregate");
    paginateStub = sandbox.stub(SlaContract, "aggregatePaginate")
  });
  afterEach(() => {
    findStub.restore();
    paginateStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns(fixture.arrayofSlaContracts.data.docs);
paginateStub.returns({
  docs: [
    {
      _id: "60a4ebbf1608df1256044ca5",
      listSla: [],
      startDate: "2021-06-06T00:00:00.000Z",
      endDate: "2021-10-23T00:00:00.000Z",
      class:"608be15ec5a2a054387294ab",
      createdAt: "2021-05-19T10:43:11.743Z",
      updatedAt: "2021-05-19T10:43:26.050Z",
      __v: 0
    }
  ],
  totalDocs: 11,
  limit: 101,
  page: 1,
  totalPages: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null
});
    const res = await getAllSlaContractByCustomerId("610d502489e61a36e88e1d27" , 1 , 1000 , "test");
    expect(findStub).to.have.been.calledOnce;
    expect(paginateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data.docs).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a 404 error", async () => {
    findStub.returns({ totalDocs: 0 });

    const res = await getAllSlaContractByCustomerId("610d502489e61a36e88e1d27");

    expect(findStub).to.have.been.calledOnce;
    expect(paginateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("statusCode");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq("No Sla Contracts match this criteria !");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllSlaContractByCustomerId();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
