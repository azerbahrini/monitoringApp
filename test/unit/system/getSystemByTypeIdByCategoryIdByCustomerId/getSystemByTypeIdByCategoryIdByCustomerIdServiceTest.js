const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getSystemByTypeByCategoryByCustomer = require("../../../../services/system/getSystemByTypeIdByCategoryIdByCustomerId");
const System = require("../../../../models/System");

chai.use(sinonChai);

describe("GET BY ID system service", () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach("", () => {
    findStub = sandbox.stub(System, "find");
  });

  it("Expect to return an success object", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.SystemDataTest,
        }),
      }),
    });
    expect(fixture.SystemDataTest._id).to.be.a("string");

    const res = await getSystemByTypeByCategoryByCustomer(
      fixture.SystemDataTest.customer,
      fixture.SystemDataTest.type,
      fixture.SystemDataTest.category
    );
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({
      customer: fixture.SystemDataTest.customer,
      type: fixture.SystemDataTest.type,
      category: fixture.SystemDataTest.category,
      isActive: true,
    });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an fail object - wrong id", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => {},
        }),
      }),
    });

    const res = await getSystemByTypeByCategoryByCustomer(
      fixture.wrongID,
      fixture.wrongID,
      fixture.wrongID
    );
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({
      customer: fixture.wrongID,
      type: fixture.wrongID,
      category: fixture.wrongID,
      isActive: true,
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findStub.throws(new Error("random error"));
    const res = await getSystemByTypeByCategoryByCustomer();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findStub.restore();
  });
  sandbox.restore();
});
