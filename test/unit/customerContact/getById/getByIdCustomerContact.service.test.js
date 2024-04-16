const sinon = require("sinon");
const request = require("request");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getByIdCustomerContactService = require("../../../../services/customerContact/getCustomerContactById.service");
const CustomerContact = require("../../../../models/CustomerContact");

chai.use(sinonChai);

describe("testing get by id system class service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(CustomerContact, "findOne");
  });
  it("expect to return an success object", async () => {
    findOneStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.customerContactDataTest,
      }),
    });
    const res = await getByIdCustomerContactService(
      fixture.customerContactDataTest._id
    );
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({
      _id: fixture.customerContactDataTest._id,
    });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneStub.returns({
      lean: sandbox.stub().returns({
        exec: () => {},
      }),
    });

    const res = await getByIdCustomerContactService(fixture.WrongID);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.WrongID });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getByIdCustomerContactService();
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
