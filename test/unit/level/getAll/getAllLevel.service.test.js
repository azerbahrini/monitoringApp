const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllLevelService = require("../../../../services/level/getAll");
const Level = require("../../../../models/Level");

chai.use(sinonChai);

describe("GET ALL Level service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Level, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns(fixture.arrayofLevels);
    const res = await getAllLevelService();
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({});
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllLevelService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
