const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllCustomerContactService = require("../../../../services/customerContact/getCustomerContact.service");
const CustomerContact = require("../../../../models/CustomerContact");

chai.use(sinonChai);

describe("testing get all Customer Contact class service", () => {
  let sandbox = sinon.createSandbox();
  let paginateStub;
  beforeEach(() => {
    paginateStub = sandbox.stub(CustomerContact, "paginate");
  });
  afterEach(() => {
    paginateStub.restore();
  });

  it("expect to return an success object", async () => {
    paginateStub.returns(fixture.getAllMongoosePaginationArray);
    const res = await getAllCustomerContactService(1, 5);
    expect(paginateStub).to.have.been.calledOnce;
    expect(paginateStub).to.be.calledWith({ isActive: true });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.data.docs).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to throw an exception", async () => {
    paginateStub.throws(new Error("Random error"));
    const res = await getAllCustomerContactService();
    expect(paginateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
