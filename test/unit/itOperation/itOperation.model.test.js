const expect = require("chai").expect;

const ItOperation = require("../../../models/ItOperation");

describe("validate every attribute in the itOperation model ", () => {
  it("title property must be required", (done) => {
    const itOperation = new ItOperation();
    itOperation.validate((err) => {
      expect(err.errors.title).to.exist;
      done();
    });
  });
  it("description property must be required", (done) => {
    const itOperation = new ItOperation();
    itOperation.validate((err) => {
      expect(err.errors.description).to.exist;
      done();
    });
  });
  it("startDate property must be required", (done) => {
    const itOperation = new ItOperation();
    itOperation.validate((err) => {
      expect(err.errors.startDate).to.exist;
      done();
    });
  });
  it("endDate property must be required", (done) => {
    const itOperation = new ItOperation();
    itOperation.validate((err) => {
      expect(err.errors.endDate).to.exist;
      done();
    });
  });
});
