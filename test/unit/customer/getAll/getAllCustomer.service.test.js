const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllCustomerService = require("../../../../services/customer/getAllCustomer.service");
const Customer = require("../../../../models/Customer");

chai.use(sinonChai);

describe("GET ALL Customer service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Customer, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns(fixture.arrayofCustomers);
    const res = await getAllCustomerService();
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({
      label: { $regex: ".", $options: "i" },
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an success object + searchValue + isActive filter", async () => {
    findStub.returns(fixture.arrayofCustomers);
    const paginate = true;
    const page = 0;
    const size = 2;
    const isActive = true;
    let searchValue = "abcd";
    let activeFilterObject = {};
    if (typeof isActive !== "undefined") {
      activeFilterObject = { isActive: isActive };
    }
    const res = await getAllCustomerService(
      [
        { path: "listLicence" },
        { path: "listSlaContract", populate: "class listSla" },
        { path: "listSystem", populate: "type category listHost listClient " },
      ],
      paginate,
      page,
      size,
      searchValue,
      activeFilterObject
    );
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith( { isActive: true, label: { '$regex': searchValue, '$options': 'i' } });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllCustomerService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
