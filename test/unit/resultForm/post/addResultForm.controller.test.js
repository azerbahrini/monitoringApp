const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const resultFormController = require("../../../../controllers/resultForm.controller");
const resultFormService = require("../../../../services/resultForm");

describe("controller POST resultForm test ", () => {
    let stubAdd;
    beforeEach(() => {
      stubAdd = sinon.stub(resultFormService, "addResultFormService");
    });
    afterEach(() => {
      stubAdd.restore();
    });
    it("send a correct task object ", async () => {
      stubAdd.returns({
        data: fixture.addedResultForm,
        status: "success",
      });
      let req = {
        body: { ...fixture.addedResultFormWithoutID },
        params: {},
        query : {timeZone :"Asia/Taipei" }
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.addResultForm(req, res);
      expect(stubAdd).to.be.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).be.calledWith({
        data: fixture.addedResultForm,
      });
    });
  
  
    it("send a correct task object route+post+ip", async () => {
      stubAdd.returns({
        data: fixture.addedResultForm,
        status: "success",
      });
      let req = {
        body: { ...fixture.addedResultFormWithoutID },
        params: {},
        query : {timeZone :"Asia/Taipei" } ,
        route: "/testing", method: 'post', ip: '1234'
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.addResultForm(req, res);
      expect(stubAdd).to.be.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).be.calledWith({
        data: fixture.addedResultForm,
      });
    });
  
  
    it("send a wrong data form - Missing Property", async () => {
      stubAdd.returns({
        err: { message: "missing property" },
        status: "error",
      });
      let req = {
        body: { isActive: fixture.addedResultForm.isActive },
        params: {},
        query : {timeZone :"Asia/Taipei" }
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.addResultForm(req, res);
      expect(stubAdd).to.be.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).be.calledWith({
        message: "missing property",
      });
    });
  
    
    it("send a wrong data form - Missing Property route+post+ip", async () => {
      stubAdd.returns({
        err: { message: "missing property" },
        status: "error",
      });
      let req = {
        body: { isActive: fixture.addedResultForm.isActive },
        params: {},
        query : {timeZone :"Asia/Taipei" },
        route: "/testing", method: 'post', ip: '1234'
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.addResultForm(req, res);
      expect(stubAdd).to.be.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).be.calledWith({
        message: "missing property",
      });
    });
  });
  