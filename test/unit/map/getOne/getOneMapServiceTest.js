const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const fixture = require("../fixture.json");
const getMapByIdService = require("../../../../services/map/getOne");
const Map = require("../../../../models/MonitoringActivityPlannification");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};

describe("testing get by id Map service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(Map, "findOne");
  });

  it("expect to return an success object", async () => {
    findOneStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.arrayofMapes,
        }),
      }),
    });

    expect(fixture.MapDataTest._id).to.be.a("string");

    const res = await getMapByIdService(fixture.MapDataTest._id);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({
      _id: fixture.MapDataTest._id,
      active: fixture.MapDataTest.active,
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res.data).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an fail object - wrong id", async () => {
    findOneStub.throws(
      new Error(mongooseError("wrongid", ["periodicity", "active"]))
    );
    // findOneStub.returns({
    //   populate: sandbox.stub().returns({
    //     lean: sandbox.stub().returns({
    //       exec: () => {},
    //     }),
    //   }),
    // });

    const res = await getMapByIdService(fixture.wrongID);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({
      _id: fixture.wrongID,
      active: true,
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("wrongid", ["periodicity", "active"])
    );
  });

  it("expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getMapByIdService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneStub.restore();
  });
  sandbox.restore();
});
