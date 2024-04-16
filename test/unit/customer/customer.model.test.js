const expect = require("chai").expect;

const Customer = require("../../../models/Customer");

describe("validate every attribute in the customer model ", () => {
  it("label property must be required", (done) => {
    const customer = new Customer();
    customer.validate((err) => {
      expect(err.errors.label).to.exist;
      done();
    });
  });
  it("isActive property must be required", (done) => {
    const customer = new Customer();
    customer.validate((err) => {
      expect(err.errors.isActive).to.exist;
      done();
    });
  });
  it("address property must be required", (done) => {
    const customer = new Customer();
    customer.validate((err) => {
      expect(err.errors.address).to.exist;
      done();
    });
  });
  it("firstReport property must be required", (done) => {
    const customer = new Customer();
    customer.validate((err) => {
      expect(err.errors.firstReport).to.exist;
      done();
    });
  });
});
