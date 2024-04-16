const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const licenceController = require("../../../../controllers/licence.controller");
const licenceService = require("../../../../services/licence");

describe("GET BY Customer licence Controller ", () => {
  let stubGetByCustomer;
  beforeEach(() => {
    stubGetByCustomer = sinon.stub(
      licenceService,
      "getLicenceByCustomerService"
    );
  });
  afterEach(() => {
    stubGetByCustomer.restore();
  });
  it("Expect to send Licence by that Customer", async () => {
    stubGetByCustomer.returns({
      data: fixture.arrayofActiveLicences,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.licenceDataTest.customerId },
      query: { page: 0, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLicenceByCustomer(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofActiveLicences,
    });
  });
});
