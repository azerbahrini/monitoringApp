const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getLicenceByCustomerService = require("../../../../services/licence/getLicenceByCustomer.service");
const Licence = require("../../../../models/Licence");

chai.use(sinonChai);

describe("GET BY Customer Licence service", () => {
  const sandbox = sinon.createSandbox();
  let find;
  beforeEach("", () => {
    find = sandbox.stub(Licence, "paginate");
  });
  it("Expect to return an success object", async () => {
    find.returns(fixture.arrayofLicences);

    expect(fixture.licenceDataTest.customer).to.be.a("string");
    const res = await getLicenceByCustomerService(
      fixture.licenceDataTest.customer
    );
    expect(find).to.have.been.calledOnce;
    expect(find).to.be.calledWith({
      customer: fixture.licenceDataTest.customer,
      isActive: true,
    });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a 404 error", async () => {
    find.returns({ totalDocs: 0 });
    expect(fixture.licenceDataTest.customer).to.be.a("string");
    const res = await getLicenceByCustomerService(
      fixture.licenceDataTest.customer
    );
    expect(find).to.have.been.calledOnce;
    expect(find).to.be.calledWith({
      customer: fixture.licenceDataTest.customer,
      isActive: true,
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("statusCode");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq("No Licence Exist with this Customer Id:");
  });
  
  it("Expect to throw an error", async () => {
    find.throws(new Error("random error"));
    const res = await getLicenceByCustomerService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    find.restore();
  });
  sandbox.restore();
});
