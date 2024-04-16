const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const updateResultForm = require("../../../../services/resultForm/updateResultForm.service");
const ResultForm = require("../../../../models/ResultForm");

chai.use(sinonChai);
describe("testing UPDATE REsultForm service", () => {
    const sandbox = sinon.createSandbox();
    let findOneAndUpdateStub;
    beforeEach("", () => {
      findOneAndUpdateStub = sandbox.stub(ResultForm, "findOneAndUpdate");
    });
    it("expect to return an success object", async () => {
      findOneAndUpdateStub.returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.addedResultForm,
        }),
      });
      const res = await updateResultForm(
        fixture.addedResultForm._id,
        fixture.addedResultFormWithoutID
      );
      expect(findOneAndUpdateStub).to.have.been.calledOnce;
  
      expect(findOneAndUpdateStub).to.be.calledWith(
        { _id: fixture.addedResultForm._id },
        fixture.addedResultFormWithoutID
      );
      expect(res).to.be.a("object");
      expect(res).to.have.property("data");
      expect(res).to.have.property("status");
      expect(res.data).to.be.a("object");
      expect(res.status).to.be.eq("success");
    });
    it("expect to return an fail object - no id", async () => {
      findOneAndUpdateStub.returns({
        lean: sandbox.stub().returns({
          exec: () => undefined,
        }),
      });
      const res = await updateResultForm(
        { _id: undefined },
        fixture.addedResultFormWithoutID
      );
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("object");
      expect(res.status).to.be.eq("error");
    });
    it("expect to return an fail object - wrong id", async () => {
      findOneAndUpdateStub.returns({
        lean: sandbox.stub().returns({
          exec: () => undefined,
        }),
      });
      const res = await updateResultForm(
        fixture.wrongID,
        fixture.addedResultFormWithoutID
      );
      expect(findOneAndUpdateStub).to.have.been.calledOnce;
      expect(findOneAndUpdateStub).to.be.calledWith(
        { _id: fixture.wrongID },
        fixture.addedResultFormWithoutID,
        { new: true }
      );
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("object");
      expect(res.status).to.be.eq("error");
    });
    it("expect to throw an error", async () => {
      findOneAndUpdateStub.throws(new Error());
      const res = await updateResultForm(
        { _id: fixture.addedResultForm._id },
        fixture.addedResultFormWithoutID
      );
  
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("error");
      expect(res.status).to.be.eq("error");
    });
  
    afterEach(() => {
      findOneAndUpdateStub.restore();
    });
    sandbox.restore();
  });
  