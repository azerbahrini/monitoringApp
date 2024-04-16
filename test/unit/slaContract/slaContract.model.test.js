const expect = require("chai").expect;

const SlaContract = require("../../../models/SlaContract");

describe("validate every attribute in the slaContract model ", () => {
  it("startDate property must be required", (done) => {
    const slaContract = new SlaContract();
    slaContract.validate((err) => {
      expect(err.errors.startDate).to.exist;
      done();
    });
  });
  it("endDate property must be required", (done) => {
    const slaContract = new SlaContract();
    slaContract.validate((err) => {
      expect(err.errors.endDate).to.exist;
      done();
    });
  });
  it("class property must be required", (done) => {
    const slaContract = new SlaContract();
    slaContract.validate((err) => {
      expect(err.errors.class).to.exist;
      done();
    });
  });

});
