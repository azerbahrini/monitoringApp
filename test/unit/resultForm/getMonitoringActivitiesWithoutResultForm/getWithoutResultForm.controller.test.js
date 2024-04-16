const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('./fixture.json');
const resultFormController = require('../../../../controllers/resultForm.controller');
const resultFormService = require('../../../../services/resultForm');

describe('GET Monitoring Acts Without Result Form Controller TEST', () => {
  let stubGet;
  beforeEach(() => {
    stubGet = sinon.stub(
      resultFormService,
      'getMonitoringActivitiesWithoutResultFormService'
    );
  });
  afterEach(() => {
    stubGet.restore();
  });
  it('expect to  return success', async () => {
    stubGet.returns({
      data: fixture.result.data,
      status: 'success'
    });
    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await resultFormController.getMonitoringActivitiesWithoutResultForm(
      req,
      res
    );
    expect(stubGet).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.result.data
    });
  });
  it('expect to  return success + route+post+ ip', async () => {
    stubGet.returns({
      data: fixture.result.data,
      status: 'success'
    });
    const req = {
      body: {},
      params: {},
      query: {},
      route: '/testing',
      method: 'post',
      ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await resultFormController.getMonitoringActivitiesWithoutResultForm(
      req,
      res
    );
    expect(stubGet).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.result.data
    });
  });

  it('expect to  return an error - 400', async () => {
    stubGet.returns({
      err: {
        message: 'error'
      },
      status: 'error'
    });
    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await resultFormController.getMonitoringActivitiesWithoutResultForm(
      req,
      res
    );
    expect(stubGet).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });
  it('expect to  return an error - 404', async () => {
    stubGet.returns({
      err: {
        message: 'not found error'
      },
      status: 'error',
      statusCode: 404
    });
    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await resultFormController.getMonitoringActivitiesWithoutResultForm(
      req,
      res
    );
    expect(stubGet).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: 'not found error'
    });
  });

  it('expect to  return an error + route+post+ ip ', async () => {
    stubGet.returns({
      err: {
        message: 'error'
      },
      status: 'error'
    });
    const req = {
      body: {},
      params: {},
      query: {},
      route: '/testing',
      method: 'post',
      ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await resultFormController.getMonitoringActivitiesWithoutResultForm(
      req,
      res
    );
    expect(stubGet).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });
});
