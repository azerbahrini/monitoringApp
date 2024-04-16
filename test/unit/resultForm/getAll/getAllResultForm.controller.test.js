const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const resultFormController = require("../../../../controllers/resultForm.controller");
const resultFormService = require("../../../../services/resultForm");

describe("controller GET ALL Result Form test ", () => {
    let stubGetAll;
    beforeEach(() => {
      stubGetAll = sinon.stub(resultFormService, "getAllResultFormService");
    });
    afterEach(() => {
      stubGetAll.restore();
    });
    it("expect to send all Tasks", async () => {
      stubGetAll.returns({
        data: fixture.arrayOfResultForm,
        status: "success",
      });
  
      let req = { body: {}, params: {} , query: { page: 2, size: 2 } };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getAllResultForm(req, res);
      expect(stubGetAll).to.be.calledOnce;
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.arrayOfResultForm,
      });
    });
  
    it("expect to send all Tasks + search Filter", async () => {
      stubGetAll.returns({
        data: fixture.arrayOfResultForm,
        status: "success",
      });
  
      let req = { body: {}, params: {} , query: { page: 2, size: 2, monitActTitle: "SM3" } };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getAllResultForm(req, res);
      expect(stubGetAll).to.be.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.arrayOfResultForm,
      });
    });

    it("expect to send all Tasks route+post+ip", async () => {
      stubGetAll.returns({
        data: fixture.arrayOfResultForm,
        status: "success",
      });
  
      let req = { body: {}, params: {} , query: { page: 2, size: 2 },      
      route: "/testing", method: 'post', ip: '1234' };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getAllResultForm(req, res);
      expect(stubGetAll).to.be.calledOnce;

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.arrayOfResultForm,
      });
    });
    it("expect to return an error", async () => {
      stubGetAll.returns({
        err: { message: "missing property" },
        status: "error",
      });
      let req = { body: {}, params: {}, query: { page: 2, size: 2, isActive: undefined } };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getAllResultForm(req, res)
      expect(stubGetAll).to.be.calledOnce;
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).be.calledWith({
        message: "missing property",
      });
    });
    it("expect to return an error - Invalid Status", async () => {
      stubGetAll.returns({
        err: { message: "invalidStatus" },
        status: "invalidStatus",
      });
      let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getAllResultForm(req, res)
      expect(stubGetAll).to.be.calledOnce;
    });
    it("expect to return an error  + route + method + ip", async () => {
      stubGetAll.returns({
        err: { message: "missing property" },
        status: "error",
      });
      let req = {
        body: {},
        params: {},
        query: { page: 2, size: 2 },
        route: "/testing",
        method: "post",
        ip: "1234",
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getAllResultForm(req, res)
      expect(stubGetAll).to.be.calledOnce;
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).be.calledWith({
        message: "missing property",
      });
    });
  });
  