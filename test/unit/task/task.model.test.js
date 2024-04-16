const expect = require("chai").expect;

const Task = require("../../../models/Task");

describe("validate every attribute in the task model ", () => {
  it("title property must be required", (done) => {
    const task = new Task();
    task.validate((err) => {
      expect(err.errors.title).to.exist;
      done();
    });
  });
  it("decription property must be required", (done) => {
    const task = new Task();
    task.validate((err) => {
      expect(err.errors.description).to.exist;
      done();
    });
  });
  it("assignee property must be required", (done) => {
    const task = new Task();
    task.validate((err) => {
      expect(err.errors.assignee).to.exist;
      done();
    });
  });
});
