const expect = require("chai").expect;

const Type = require("../../../models/Type");

describe("validate every attribute in the type model ", () => {
  it("libelle property must be required", (done) => {
    const type = new Type();
    type.validate((err) => {
      expect(err.errors.type).to.exist;
      done();
    });
  });
  it("active property must be required", (done) => {
    const type = new Type();
    type.validate((err) => {
      expect(err.errors.isActive).to.exist;
      done();
    });
  });
});
