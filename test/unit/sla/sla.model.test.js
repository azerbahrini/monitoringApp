const expect = require("chai").expect;

const Sla = require("../../../models/Sla");

describe("validate every attribute in the sla model ", () => {
  it("kpi property must be required", (done) => {
    const sla = new Sla();
    sla.validate((err) => {
      expect(err.errors.kpi).to.exist;
      done();
    });
  });
  it("kpi property must be in enum:[escalation, response, takeOver, resolution]", (done) => {
    const sla = new Sla({
      kpi:"abcd"
    });
    sla.validate((err) => {
      expect(err.errors.kpi).to.exist;
      done();
    });
  });
  it("unity property must be required", (done) => {
    const sla = new Sla();
    sla.validate((err) => {
      expect(err.errors.unity).to.exist;
      done();
    });
  });
  it("unity property must be in enum:[second,minute, hour, day]", (done) => {
    const sla = new Sla({
      unity:"abcd"
    });
    sla.validate((err) => {
      expect(err.errors.unity).to.exist;
      done();
    });
  });
  it("desc property must be required", (done) => {
    const sla = new Sla();
    sla.validate((err) => {
      expect(err.errors.desc).to.exist;
      done();
    });
  });
  it("priority property must be required", (done) => {
    const sla = new Sla();
    sla.validate((err) => {
      expect(err.errors.priority).to.exist;
      done();
    });
  });
  it("time property must be required", (done) => {
    const sla = new Sla();
    sla.validate((err) => {
      expect(err.errors.time).to.exist;
      done();
    });
  });

});
