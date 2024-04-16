const sinon = require("sinon");

const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const deleteCustomerContact = require("../../../../services/customerContact/deleteCustomerContact.service");
const CustomerContact = require("../../../../models/CustomerContact");

chai.use(sinonChai);

describe("testing DELETE Customer Contact service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(CustomerContact, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.customerContactDataTest,
      }),
    });
    const res = await deleteCustomerContact(
      fixture.customerContactDataTest._id
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    findOneAndUpdateStub.returns(undefined);
    const res = await deleteCustomerContact(undefined);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });

  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns(undefined);
    const res = await deleteCustomerContact(fixture.WrongID);
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.WrongID },
      { isActive: false },
      { new: true }
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });

  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await deleteCustomerContact(
      fixture.customerContactDataTest._id
    );

    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneAndUpdateStub.restore();
  });
  sandbox.restore();
});
