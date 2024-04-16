const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const fixture = require("./fixture.json");

const getAllCategoriesByCustomerId = require("../../../../services/system/getAllCategoriesByCustomerId");
const System = require("../../../../models/System");
chai.use(sinonChai);
describe("GET ALL categories By Customers service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(System, "find");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.arrayOfSystemCategories,
        }),
      }),
    });
    const res = await getAllCategoriesByCustomerId("608bde23c5a2a0a1607294a5");
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an empty object", async () => {
    const arrayOfSystemCategories = [];

    findStub.returns({
      populate: sandbox.stub().returns(arrayOfSystemCategories),
    });
    const res = await getAllCategoriesByCustomerId("608bde23c5a2a0a1607294a5");
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("statusCode");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.eq("No Category exist match this criteria !");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
  });

  it("Expect to return list of categories ", async () => {
    findStub.returns({
      populate: sandbox.stub().returns(fixture.arrayWithAMissingCategory),
    });
    const res = await getAllCategoriesByCustomerId("608bde23c5a2a0a1607294a5");
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllCategoriesByCustomerId();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
