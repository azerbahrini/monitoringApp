const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const fixture = require('../fixture.json');
const newsFeedController = require('../../../../controllers/newsFeed.controller');
const newsFeedService = require('../../../../services/newsFeed');
const roleService = require('../../../../services/role')

describe('controller GET ALL newsFeed test ', () => {
    let stubGetAll;
    let stubGetRole;
    beforeEach(() => {
      stubGetAll = sinon.stub(newsFeedService, 'getAllNewsFeed');
      stubGetRole = sinon.stub(roleService, 'getAllRoleByUser')
    });
    afterEach(() => {
      stubGetAll.restore();
      stubGetRole.restore();
    });
    it('expect to send all posts ', async () => {
      stubGetAll.returns({
        data: fixture.getAllDocument,
        status: 'success'
      });
      let req = { body: {}, params: {}, query: { page: 0, size: 2, paginate: true }};
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await newsFeedController.getAllNews(req, res);
      expect(stubGetAll).to.be.calledOnce;
      expect(stubGetRole).to.be.calledOnce;
      expect(stubGetRole).to.have.been.calledWith(fixture.document.user, '2022-02-21T14:23:25.058Z', 'app')
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.getAllDocument
      });
    });
    it('expect to send all post + route + method + ip ', async () => {
      stubGetAll.returns({
        data: fixture.getAllDocument,
        status: 'success'
      });
      let req = {
        body: {},
        params: {},
        query: { page: 0, size: 2 },
        route: '/testing',
        method: 'post',
        ip: '1234',
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await newsFeedController.getAllNews(req, res);
      expect(stubGetAll).to.be.calledOnce;
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).be.calledWith({
        data: fixture.getAllDocument
      });
    });

    it('expect to return an error', async () => {
      stubGetAll.returns({
        err: { message: 'An error message' },
        status: 'error'
      });
      const isActive = true;
      let req = { body: {}, params: {}, query: { page: 0, size: 2, isActive } };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await newsFeedController.getAllNews(req, res);
      expect(stubGetAll).to.be.calledOnce;
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).be.calledWith({ message: 'An error message' });
    });
  
    it('expect to return an error  + route + method + ip ', async () => {
      stubGetAll.returns({
        err: { message: 'An error message' },
        status: 'error',
      });
      const isActive = true;
      let req = {
        body: {},
        params: {},
        query: { page: 0, size: 2, isActive },
        query: { page: 0, size: 2 },
        route: '/testing',
        method: 'post',
        ip: '1234',
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await newsFeedController.getAllNews(req, res);
      expect(stubGetAll).to.be.calledOnce;
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).be.calledWith({ message: 'An error message' });
    });
  
    it('expect to return an error - Invalid Status', async () => {
      stubGetAll.returns({
        err: { message: 'invalidStatus' },
        status: 'invalidStatus',
      });
      let req = { body: {}, params: {}, query: { page: 0, size: 2 } };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await newsFeedController.getAllNews(req, res);
      expect(stubGetAll).to.be.calledOnce;
    });
  });
  