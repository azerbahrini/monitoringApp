const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("./fixture.json");
const getContactList = require("../../../../services/system/getContactList");
const System = require("../../../../models/System");

chai.use(sinonChai);

describe("GET CUSTOMER CONTACT BY SYSTEM service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(System, "aggregate");
  });
  it("Expect to return an success object", async () => {
    let data;
    findOneStub.returns([
      {
        _id: "615c798e5f9d512f7d5baad0",
        isActive: true,
        lastName: "Nikola Tesla",
        mail: "nikola@avaxia.com",
        customer: "608bde23c5a2a0a1607294a5",
        phoneNumber: 98776655,
        createdAt: "2021-10-05T16:13:02.269Z",
        updatedAt: "2021-10-05T16:13:02.269Z",
        __v: 0,
      },
    ]);
    expect(fixture.SystemDataTest._id).to.be.a("string");
    const res = await getContactList(fixture.SystemDataTest._id);
    expect(findOneStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an success object with Search", async () => {
    const searchValue = "any random text";
    findOneStub.returns([
      {
        contact: {
          _id: "615c798e5f9d512f7d5baad0",
          isActive: true,
          lastName: "Nikola Tesla",
          mail: "nikola@avaxia.com",
          customer: "608bde23c5a2a0a1607294a5",
          phoneNumber: 98776655,
          createdAt: "2021-10-05T16:13:02.269Z",
          updatedAt: "2021-10-05T16:13:02.269Z",
          __v: 0,
        },
      },
    ]),
      expect(fixture.SystemDataTest._id).to.be.a("string");
    const res = await getContactList(fixture.SystemDataTest._id, searchValue);
    expect(findOneStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an fail object - wrong id", async () => {
    findOneStub.returns([]);

    const res = await getContactList(fixture.wrongID);
    expect(findOneStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getContactList();
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
