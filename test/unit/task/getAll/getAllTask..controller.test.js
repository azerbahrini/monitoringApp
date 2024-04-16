const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture.json');
const taskController = require('../../../../controllers/task.controller');
const taskService = require('../../../../services/task');

describe('controller GET ALL Task test ', () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(taskService, 'getAllTaskService');
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it('expect to send all Tasks', async () => {
    stubGetAll.returns({
      data: fixture.arrayofTasks,
      status: 'success'
    });

    const req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getAllTask(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofTasks
    });
  });

  it('expect to send all Tasks route+post+ip', async () => {
    stubGetAll.returns({
      data: fixture.arrayofTasks,
      status: 'success'
    });

    const req = { body: {}, params: {}, query: { page: 2, size: 2 },
    route: '/testing', method: 'post', ip: '1234' };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getAllTask(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofTasks
    });
  });

  it('expect to return an error', async () => {
    stubGetAll.returns({
      status: 'error',
      err: { message: 'an error occured' }
    });

    const req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getAllTask(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'an error occured'
    });
  });

  it('expect to return an error - Invalid Status', async () => {
    stubGetAll.returns({
      status: 'Invalid Status',
      err: { message: 'an error occured' }
    });
    const req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getAllTask(req, res);
    expect(stubGetAll).to.be.calledOnce;
  });

  it('expect to return an error route+post+ip(logger)', async () => {
    stubGetAll.returns({
      status: 'error',
      err: { message: 'an error occured' }
    });
    const req = {
      body: {},
      params: {},
      query: { page: 2, size: 2 },
      route: '/testing',
      method: 'post',
      ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getAllTask(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'an error occured'
    });
  });

});
