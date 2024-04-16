const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const resultFormController = require("../../../../controllers/resultForm.controller");
const resultFormService = require("../../../../services/resultForm");

describe("GET BY ID Result Form Controller ", () => {
    let stubGetById;
    beforeEach(() => {
      stubGetById = sinon.stub(resultFormService, "getResultFormByIdService");
    });
    afterEach(() => {
      stubGetById.restore();
    });
    it("Expect to send Task by that ID", async () => {
      stubGetById.returns({
        data: fixture.addedResultForm,
        status: "success",
      });
      let req = {
        body: {},
        params: { id: fixture.addedResultForm._id },
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getResultFormById(req, res);
      expect(stubGetById).to.be.calledWith(req.params.id);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.addedResultForm,
      });
    });
  
  
    it("Expect to send Task by that ID route+post+ip", async () => {
      stubGetById.returns({
        data: fixture.addedResultForm,
        status: "success",
      });
      let req = {
        body: {},
        params: { id: fixture.addedResultForm._id },
        route: "/testing", method: 'post', ip: '1234'
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getResultFormById(req, res);
      expect(stubGetById).to.be.calledWith(req.params.id);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.addedResultForm,
      });
    });
  
  
    it("Expect to return an error - ID Does not exist", async () => {
      stubGetById.returns({
        err: { message: "task not found" },
        status: "error",
        statusCode: 404,
      });
      let req = {
        body: {},
        params: { id: fixture.wrongID },
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getResultFormById(req, res);
      expect(stubGetById).to.be.calledWith(req.params.id);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).be.calledWith({
        message: "task not found",
      });
    });
  
  
    it("Expect to return an error - ID Does not exist route+post+ip", async () => {
      stubGetById.returns({
        err: { message: "task not found" },
        status: "error",
        statusCode: 404,
      });
      let req = {
        body: {},
        params: { id: fixture.wrongID },
        route: "/testing", method: 'post', ip: '1234'
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await resultFormController.getResultFormById(req, res);
      expect(stubGetById).to.be.calledWith(req.params.id);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).be.calledWith({
        message: "task not found",
      });
    });
  });
  