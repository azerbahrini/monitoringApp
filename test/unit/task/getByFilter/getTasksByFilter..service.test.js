const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const taskService = require("../../../../services/task");
const systemService = require("../../../../services/system");
const mapService = require("../../../../services/map");
const shiftService = require("../../../../services/shift");

const fixture = require("./fixtureService.json");
const getTasksByFilterService = require("../../../../services/task/getTasksByFilter.service");

chai.use(sinonChai);

describe("GET Tasks By Filter service", () => {
  let getShiftByUserIDServiceStub;
  let getSystemsForMapsServiceStub;
  let getMapsBySystemsStub;
  let virtualTasksGeneratorServiceStub;
  let checkCreatedTasksServiceStub;

  beforeEach(() => {
    getShiftByUserIDServiceStub = sinon.stub(shiftService, "getShiftByUserIDService");
    getSystemsForMapsServiceStub = sinon.stub(systemService, "getSystemsForMapsService");
    getMapsBySystemsStub = sinon.stub(mapService, "getMapsBySystems");
    virtualTasksGeneratorServiceStub = sinon.stub(taskService, "virtualTasksGeneratorService");
    checkCreatedTasksServiceStub = sinon.stub(taskService, "checkCreatedTasksService");
});
  afterEach(() => {
    getShiftByUserIDServiceStub.restore();
    getSystemsForMapsServiceStub.restore();
    getMapsBySystemsStub.restore();
    virtualTasksGeneratorServiceStub.restore();
    checkCreatedTasksServiceStub.restore();
  });
  // it("Expect to return an success object", async () => {
  //   getShiftByUserIDServiceStub.returns(fixture.tlShift);

  //   findStub.returns();
  //   const res = await getTasksByFilterService();
  //   expect(findStub).to.have.been.calledOnce;
  //   expect(findStub).to.be.calledWith({});
  //   expect(res).to.be.a("object");
  //   expect(res).to.have.property("data");
  //   expect(res).to.have.property("status");
  //   expect(res.data).to.be.a("array");
  //   expect(res.status).to.be.eq("success");
  // });
  // it("Expect to throw an exception", async () => {
  //   findStub.throws(new Error("Random error"));
  //   const res = await getTasksByFilterService();
  //   expect(findStub).to.have.been.calledOnce;
  //   expect(res).to.be.a("object");
  //   expect(res).to.have.property("err");
  //   expect(res).to.have.property("status");
  //   expect(res.err).to.be.a("error");
  //   expect(res.status).to.be.eq("error");
  // });
});
