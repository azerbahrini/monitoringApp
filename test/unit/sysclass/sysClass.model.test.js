const expect = require("chai").expect;

const sysclass = require("../../../models/SysClass");

describe("validate every attribute in the model ", () => {
  it("libelle property must be required", (done) => {
    const sys = new sysclass();
    sys.validate((err) => {
      expect(err.errors.libelle).to.exist;
      done();
    });
  });
  it("active property must be required", (done) => {
    const sys = new sysclass();
    sys.validate((err) => {
      expect(err.errors.isActive).to.exist;
      done();
    });
  });
});
