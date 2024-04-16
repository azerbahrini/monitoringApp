const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleController = require("../../../../controllers/role.controller");
const roleService = require("../../../../services/role");

describe("controller get roles by user test ", () => {
    let stubGetById;
    beforeEach(() => {
      stubGetById = sinon.stub(roleService, "getAllRoleByUser");
    });
    afterEach(() => {
      stubGetById.restore();
    });
    it("expect to send role by that user ID", async () => {
      stubGetById.returns({
        data: fixture.arrayofRoles,
        status: "success",
      });
      let user = fixture.user.id
      let date = fixture.user.date
      let req = {
        body: {},
        params: { id :user,date : date},
        query: { page: 0, size: 2 }
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await roleController.getRolesByuser(req, res);
      expect(stubGetById).to.be.calledWith(req.id,req.date);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.arrayofRoles,
      });
    });
    it("Expect to send Role by that ID  + route + method + ip", async () => {
      stubGetById.returns({
        data: fixture.arrayofRoles,
        status: "success",
      });
      let user = fixture.user.id
      let date = fixture.user.date
      let req = {
        body: {},
        params: { },
        query: {id :user,date : date },
        route: "/testing",
        method: "get",
        ip: "1234",
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await roleController.getRolesByuser(req, res);
      expect(stubGetById).to.be.calledWith(req.query.id,req.query.date);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.arrayofRoles,
      });
    });
    it("expect to return an error - ID Does not exist", async () => {
        stubGetById.returns({
          err: { message: "user not found" },
          status: "error",
          statusCode: 400,
        });
        let req = {
          body: {},
          params: { id: 123 },
          query: { page: 0, size: 2 }
        };
        let res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        await roleController.getRolesByuser(req, res);
        expect(stubGetById).to.be.calledWith(req.id,req.date);
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).be.calledWith({
          message: "user not found",
        });
      });
      it("Expect to return an error - without StatusCode", async () => {
        stubGetById.returns({
          err: { message: "role not found" },
          status: "error",
          
        });
        let req = {
          body: {},
          query: { id: 123, date: 123 },
        };
        let res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        await roleController.getRolesByuser(req, res);
        expect(stubGetById).to.be.calledWith(req.query.id);
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).be.calledWith({
          message: "role not found",
        });
      });
      it("expect to return an error - Invalid Status", async () => {
        stubGetById.returns({
          err: { message: "invalidStatus" },
          status: "invalidStatus",
        });
        let req = {
          body: {},
          query: { id: 123 },
        };
        let res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        await roleController.getRolesByuser(req, res);
        expect(stubGetById).to.be.calledOnce;
      });
      it("Expect to return an error - ID Does not exist  + route + method + ip", async () => {
        stubGetById.returns({
          err: { message: "role not found" },
          status: "error",
          statusCode: 404,
        });
        let req = {
          body: {},
          query: { id: 123 },
          route: "/testing",
          method: "get",
          ip: "1234",
        };
        let res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        await roleController.getRolesByuser(req, res);
        expect(stubGetById).to.be.calledWith(req.query.id);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).be.calledWith({
          message: "role not found",
        });
      });
    
  
  
  });