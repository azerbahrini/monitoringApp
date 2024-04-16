const expect = require("chai").expect;

const Role = require("../../../models/Role");

describe("validate every attribute in the role model ", () => {
  it("label property must be required", (done) => {
    const role = new Role();
    role.validate((err) => {
      expect(err.errors.label).to.exist;
      done();
    });
  });
  it("isActive property must be required", (done) => {
    const role = new Role();
    role.validate((err) => {
      expect(err.errors.isActive).to.exist;
      done();
    });
  });
  it("rank property must be required", (done) => {
    const role = new Role();
    role.validate((err) => {
      expect(err.errors.rank).to.exist;
      done();
    });
  });
});
