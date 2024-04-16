const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getByIdCustomerService = require("../../../../services/customer/getCustomerById.service");
const Customer = require("../../../../models/Customer");
const Licence = require("../../../../models/Licence");

chai.use(sinonChai);

describe("GET BY ID Customer service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  let actLicenceStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(Customer, "findOne");
    actLicenceStub = sandbox.stub(Licence, "findOne");
  });
  it("Expect to return an success object", async () => {
    findOneStub.returns({
        populate: sandbox.stub().returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.customerDataTest,
      })
    })
    });

    actLicenceStub.returns({
      data :{ "isActive": true,
      "_id": "6148b02f81e3d85e440fef45",
      "startDate": "2021-09-14T00:00:00.000Z",
      "endDate": "2021-10-18T00:00:00.000Z",
      "customer": "608bde23c5a2a0a1607294a5",
      "createdAt": "2021-09-20T16:00:47.651Z",
      "updatedAt": "2021-09-20T16:00:47.651Z",
      "__v": 0
  },
  status: "success"
  });

    expect(fixture.customerDataTest._id).to.be.a("string");
    const res = await getByIdCustomerService(fixture.customerDataTest._id);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.customerDataTest._id });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an fail object - wrong id", async () => {
    findOneStub.returns({
        populate: sandbox.stub().returns({
      lean: sandbox.stub().returns({
        exec: () => {},
      })
    })
    });

    actLicenceStub.returns({
      data :{ "isActive": true,
      "_id": "6148b02f81e3d85e440fef45",
      "startDate": "2021-09-14T00:00:00.000Z",
      "endDate": "2021-10-18T00:00:00.000Z",
      "customer": "608bde23c5a2a0a1607294a5",
      "createdAt": "2021-09-20T16:00:47.651Z",
      "updatedAt": "2021-09-20T16:00:47.651Z",
      "__v": 0
  },
  status: "success"
  });


    const res = await getByIdCustomerService(fixture.wrongID);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({
      _id: fixture.wrongID,
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getByIdCustomerService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneStub.restore();
    actLicenceStub.restore();
  });
  sandbox.restore();
});
