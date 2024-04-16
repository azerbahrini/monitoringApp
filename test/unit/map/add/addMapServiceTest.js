const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("../fixture.json");
const addMapService = require("../../../../services/map/add");
const Map = require("../../../../models/MonitoringActivityPlannification");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe("testing POST Map service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Map, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {
    createStub.returns(fixture.MapDataTest);

    const res = await addMapService(fixture.MapDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.MapDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.MapDataTest);

    const res = await addMapService(fixture.wrongMapDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongMapDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an error object - empty object", async () => {
    createStub.throws(
      new Error(
        mongooseError("map", [
          "periodicity",
          "active",
          "estimation",
          "startTime",
          "task",
          "system",
          "monitoringAct",
        ])
      )
    );
    const res = await addMapService(fixture.emptyMapDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptyMapDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an error object - missing property", async () => {
    const sysclassObject = { "periodicity":30,
    "active": true,
    "startTime" : "2021-05-03T23:39:46.343+00:00",
    "task" :"60ef4e3f7221301cc8eaafbe" ,
    "system" : "60ef4e3f7221301cc8eaafbe",
    "monitoringAct" : "60ef4e3f7221301cc8eaafbe" };
    createStub.throws(new Error(mongooseError("map", ["estimation"])));
    const res = await addMapService(sysclassObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(sysclassObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("map", ["estimation"]));
    expect(res.status).to.be.eq("error");
  });
});
