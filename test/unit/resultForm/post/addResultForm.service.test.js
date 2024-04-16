const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addResultFormService = require("../../../../services/resultForm/addResultForm.service");
const resultForm = require("../../../../models/ResultForm");
chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
    const refectoredList = listPropertyError.reverse().map((elem) => {
      return " " + elem + ": Path `" + elem + "` is required.";
    });
    return modelName + " validation failed:" + refectoredList.join(",");
  };
describe(" POST ResultForm service", () => {
    let createStub;
    let sandbox = sinon.createSandbox();
    beforeEach(() => {
      createStub = sandbox.stub(resultForm, "create");
    });
    afterEach(() => {
      createStub.restore();
    });

    it("Expect to return an success object", async () => {
        createStub.returns(fixture.addedResultForm);
    
        const res = await addResultFormService(fixture.addResultFormReq);
        expect(createStub).to.have.been.calledOnce;
        expect(createStub).to.be.calledWith(fixture.addResultFormReq);
        expect(res).to.be.a("object");
        expect(res).to.have.property("data");
        expect(res).to.have.property("status");
        expect(res.data).to.be.a("object");
        expect(res.status).to.be.eq("success");
      });

      it("Expect to return an error object - empty object", async () => {
        createStub.throws(new Error(mongooseError("taskresult", ["formSchema","ranformUISchemak","formLimits", "isActive"])));
        const res = await addResultFormService(fixture.emptyResultFormDataTest);
        expect(createStub).to.have.been.calledOnce;
        expect(createStub).to.be.calledWith(fixture.emptyResultFormDataTest);
        expect(res).to.be.a("object");
        expect(res).to.have.property("err");
        expect(res).to.have.property("status");
        expect(res.err.message).to.be.a("string");
        expect(res.err.message).to.be.eq(mongooseError("taskresult", ["formSchema","ranformUISchemak","formLimits", "isActive"]));
        expect(res.status).to.be.eq("error");
      });
     

});