const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("./fixture.json");
const getSystemsForMapsService = require("../../../../services/system/getSystemsForMapsService");
const System = require("../../../../models/System");

chai.use(sinonChai);

describe("GET BY ID system service", () => {
  const sandbox = sinon.createSandbox();
  let aggregateStub;
  beforeEach("", () => {
    aggregateStub = sandbox.stub(System, "aggregate");
  });

  it("Expect to return an success object", async () => {
    aggregateStub.returns(fixture.arrayOfSystemNames);

    const res = await getSystemsForMapsService(
      fixture.SystemDataTest.customer,
      fixture.SystemDataTest.type,
      fixture.SystemDataTest.category,
      fixture.SystemDataTest._id
    );
    expect(aggregateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

//   it("Expect to return an fail object - wrong id", async () => {
//     findStub.returns({
//       populate: sandbox.stub().returns({
//         lean: sandbox.stub().returns({
//           exec: () => {},
//         }),
//       }),
//     });

//     const res = await getSystemsForMapsService(
//       fixture.wrongID,
//       fixture.wrongID,
//       fixture.wrongID
//     );
//     expect(findStub).to.have.been.calledOnce;
//     expect(findStub).to.be.calledWith({
//       customer: fixture.wrongID,
//       type: fixture.wrongID,
//       category: fixture.wrongID,
//       isActive: true,
//     });
//     expect(res).to.be.a("object");
//     expect(res).to.have.property("err");
//     expect(res).to.have.property("status");
//     expect(res.err).to.be.a("object");
//     expect(res.status).to.be.eq("error");
//   });
  it("Expect to throw an error", async () => {
    aggregateStub.throws(new Error("random error"));
    const res = await getSystemsForMapsService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    aggregateStub.restore();
  });
  sandbox.restore();
});
