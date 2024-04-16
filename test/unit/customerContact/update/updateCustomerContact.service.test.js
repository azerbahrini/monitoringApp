const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateCustomerContactService = require("../../../../services/customerContact/updateCustomerContact.service");
const CustomerContact = require("../../../../models/CustomerContact");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE CustomerContact service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;

  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(CustomerContact, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns({
      lean: sinon.stub().returns({
        exec: () => fixture.customerContactDataTest,
      }),
    });
    const res = await updateCustomerContactService(
      fixture.customerContactDataTest._id,
      fixture.customerContactDataTest
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    findOneAndUpdateStub.returns({
      lean: sinon.stub().returns({
        exec: () => undefined,
      }),
    });
    const res = await updateCustomerContactService(
      undefined,
      fixture.typeDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await updateCustomerContactService(
      { _id: fixture.customerContactDataTest._id },
      fixture.typeDataTestWithoutID
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
