const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture.json');
const taskController = require('../../../../controllers/task.controller');
const taskService = require('../../../../services/task');

describe('GET BY ID task Controller ', () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(taskService, 'getTaskByIdService');
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it('Expect to send Task by that ID', async () => {
    stubGetById.returns({
      data: fixture.taskDataTest,
      status: 'success'
    });
    const req = {
      body: {},
      params: { id: fixture.taskDataTest._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getTaskById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.taskDataTest
    });
  });

  it('Expect to send Task by that ID route+post+ip', async () => {
    stubGetById.returns({
      data: fixture.taskDataTest,
      status: 'success'
    });
    const req = {
      body: {},
      params: { id: fixture.taskDataTest._id },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getTaskById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.taskDataTest
    });
  });

  it('Expect to return an error - ID Does not exist', async () => {
    stubGetById.returns({
      err: { message: 'task not found' },
      status: 'error',
      statusCode: 404
    });
    const req = {
      body: {},
      params: { id: fixture.wrongID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getTaskById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: 'task not found'
    });
  });

  it('Expect to return an error - Invalid Status', async () => {
    stubGetById.returns({
      err: { message: 'task not found' },
      status: 'Invalid-Status ',
      statusCode: 404
    });
    const req = {
      body: {},
      params: { id: fixture.wrongID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getTaskById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
  });

  it('Expect to return an error - undefined StatusCode', async () => {
    stubGetById.returns({
      err: { message: 'task not found' },
      status: 'error',
      statusCode: undefined
    });
    const req = {
      body: {},
      params: { id: fixture.wrongID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getTaskById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
  });

  it('Expect to return an error - ID Does not exist route+post+ip', async () => {
    stubGetById.returns({
      err: { message: 'task not found' },
      status: 'error',
      statusCode: 404
    });
    const req = {
      body: {},
      params: { id: fixture.wrongID },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getTaskById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: 'task not found'
    });
  });
});
