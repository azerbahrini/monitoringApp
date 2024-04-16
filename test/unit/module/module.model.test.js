const expect = require("chai").expect;

const Module = require("../../../models/Module");

describe("validate every attribute in the module model ", () => {
  it("title property must be required", (done) => {
    const module = new Module();
    module.validate((err) => {
      expect(err.errors.title).to.exist;
      done();
    });
  });
  it("path property must be required", (done) => {
    const module = new Module();
    module.validate((err) => {
      expect(err.errors.title).to.exist;
      done();
    });
  });
});
