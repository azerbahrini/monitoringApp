const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const deleteResultForm = require("../../../../services/resultForm/deleteResultForm.service");
const ResultForm = require("../../../../models/ResultForm");

chai.use(sinonChai);

describe("testing DELETE Result Form service", () => {
    const sandbox = sinon.createSandbox();
    let findOneAndRemoveStub;
    beforeEach("", () => {
      findOneAndRemoveStub = sandbox.stub(ResultForm, "findOneAndUpdate");
    });
    it("expect to return an success object", async () => {
      findOneAndRemoveStub.returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.addedResultForm
        })
      });
      const res = await deleteResultForm(fixture.addedResultForm._id);
      expect(findOneAndRemoveStub).to.have.been.calledOnce;
      expect(findOneAndRemoveStub).to.be.calledWith(
        { _id: fixture.addedResultForm._id}
      );
      expect(res).to.be.a("object");
      expect(res).to.have.property("data");
      expect(res).to.have.property("status");
      expect(res.data).to.be.a("object");
      expect(res.status).to.be.eq("success");
    });
    it("expect to return an fail object - no id", async () => {
      const res = await deleteResultForm();
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("object");
      expect(res.status).to.be.eq("error");
    });
    it("expect to return an fail object - wrong id", async () => {
      findOneAndRemoveStub.returns(undefined);
      const res = await deleteResultForm(fixture.wrongID);
      expect(findOneAndRemoveStub).to.have.been.calledOnce;
      expect(findOneAndRemoveStub).to.be.calledWith({ _id: fixture.wrongID });
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("object");
      expect(res.status).to.be.eq("error");
    });
    it("expect to throw an error", async () => {
      findOneAndRemoveStub.throws(new Error());
      const res = await deleteResultForm(fixture.addedResultForm._id);  
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("error");
      expect(res.status).to.be.eq("error");
    });

    afterEach(() => {
      findOneAndRemoveStub.restore();
    });
    sandbox.restore();
  });