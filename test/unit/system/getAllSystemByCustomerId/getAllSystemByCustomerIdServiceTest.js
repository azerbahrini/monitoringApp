const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllSystemByCustomerId = require("../../../../services/system/getAllSystemByCustomerId");
const System = require("../../../../models/System");

chai.use(sinonChai);

describe("GET ALL Systems By customer service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  let type =JSON.stringify(["608be0f0c5a2a0bd397294aa"])
  let category = JSON.stringify(["608be0f0c5a2a0bd397294aa"])
  beforeEach(() => {
    findStub = sandbox.stub(System, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns(fixture.arrayofSystems);

    const res = await getAllSystemByCustomerId("610d502489e61a36e88e1d27", type, category, false);

    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a 404 error", async () => {
    findStub.returns({ totalDocs: 0 });
    const res = await getAllSystemByCustomerId("610d502489e61a36e88e1d27", type, category, false);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("statusCode");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq("No  System match this criteria !");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllSystemByCustomerId(null, null, null, false);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
