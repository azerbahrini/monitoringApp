const expect = require("chai").expect;

const Licence = require("../../../models/Licence");

describe("validate every attribute in the licence model ", () => {
  it("startDate property must be required", (done) => {
    const licence = new Licence();
    licence.validate((err) => {
      expect(err.errors.startDate).to.exist;
      done();
    });
  });
  it("endDate property must be required", (done) => {
    const licence = new Licence();
    licence.validate((err) => {
      expect(err.errors.endDate).to.exist;
      done();
    });
  });
  it("customer property must be required", (done) => {
    const licence = new Licence();
    licence.validate((err) => {
      expect(err.errors.customer).to.exist;
      done();
    });
  });

});
