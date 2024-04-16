const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const fixture = require("../fixture.json");
const getAllMaps = require("../../../../services/map/getBySystemId");
const Map = require("../../../../models/MonitoringActivityPlannification");
chai.use(sinonChai);

describe("GET ALL Maps By System service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  let paginateStub ; 
  beforeEach(() => {
    findStub = sandbox.stub(Map, "aggregate");
    paginateStub = sandbox.stub(Map, "aggregatePaginate");
  });
  afterEach(() => {
    findStub.restore();
    paginateStub.restore();
  });

  it("Expect to return an success object", async () => {
    findStub.returns([
      {
        _id: "6093fd91995e13728239a479",
        active: true,
        monitoringAct: {
          _id: "608fa9e6702c1a19a06ed518",
          activity: 'STMS_IMPORT',
          type: 'Transaction',
          description: 'SAP Transaction',
          createdAt: "2021-05-03T07:44:38.182Z",
          updatedAt: "2021-05-03T07:44:38.182Z",
          __v: 0
        },
        system: "608beed8c5a2a0c3017294b9",
        task: "60d123e0886ec4cd20666e3c",
        estimation: 10,
        periodicity: 60,
        createdAt: "2021-05-06T14:30:41.359Z",
        updatedAt: "2021-06-21T23:43:56.704Z",
        __v: 0
      }
    ]);
    paginateStub.returns({docs : 
     [{ _id: "6093f982995e13aa0c39a46c",
      active: false,
      monitoringAct: "6091b877b651f877a121f99a",
      system: "608beed8c5a2a0c3017294b9",
      task: 303030303030303030303030,
      estimation: 20,
      periodicity: 780,
      startTime: "2021-05-06T13:15:29.546Z",
      createdAt: "2021-05-06T14:13:22.158Z",
      updatedAt: "2021-05-10T12:34:04.034Z",
      __v: 0
    }
  ],
  totalDocs: 256,
  limit: 10000,
  page: 1,
  totalPages: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null
});

    const res = await getAllMaps(fixture.MapDataTest.system);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data.docs).to.be.a("array");
    expect(res.data.docs[0]).to.have.property("periodicity");
    expect(res.data.docs[0]).to.have.property("startTime");
    expect(res.data.docs[0]).to.have.property("estimation");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a 404 Error", async () => {
    findStub.returns(null);
    const res = await getAllMaps(fixture.MapDataTest.system);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq("No MAP match this criteria !");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllMaps();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
