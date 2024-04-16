const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllUserService = require("../../../../services/user/getAllUsers");
const User = require("../../../../models/User");

chai.use(sinonChai);

describe("GET ALL User service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(User, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object ", async () => {
    findStub.returns(fixture.getAllMongoosePaginationArray);
    const res = await getAllUserService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res.data).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
    
  });
  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllUserService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
