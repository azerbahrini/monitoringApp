const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const mtpController = require('../../../../controllers/mtp.controller');
const mtpService = require('../../../../services/mtp');
describe('controller Add MTP test ', () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(mtpService, 'addMtpService');
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it('send a correct MTP object ', async () => {
    stubAdd.returns({
      data: {
        'isActive': true,
        '_id': '6212a1468a338608587cd325',
        'title': 'test',
        'description': 'aaaaaa',
        'type': 'monitoring',
        'estimatedStart': 'azearaz',
        'createdAt': '2022-02-20T20:15:02.379Z',
        'updatedAt': '2022-02-20T20:15:02.379Z',
        '__v': 0
    },
      status: 'success'
    });
    const req = {
      body: {
    'title': 'MTP test',
    'description': 'New mtp fo unit test',
    'type': 'monitoring',
    'estimatedStart': '14:05'
},
      params: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.addMtp(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({data: {
        isActive: true,
        _id: '6212a1468a338608587cd325',
        title: 'test',
        description: 'aaaaaa',
        type: 'monitoring',
        estimatedStart: 'azearaz',
        createdAt: '2022-02-20T20:15:02.379Z',
        updatedAt: '2022-02-20T20:15:02.379Z',
        __v: 0
      }});
  });

  it('send a correct MTP object route+post+ip', async () => {
    stubAdd.returns({
      data: {
        'isActive': true,
        '_id': '6212a1468a338608587cd325',
        'title': 'test',
        'description': 'aaaaaa',
        'type': 'monitoring',
        'estimatedStart': 'azearaz',
        'createdAt': '2022-02-20T20:15:02.379Z',
        'updatedAt': '2022-02-20T20:15:02.379Z',
        '__v': 0
    },
      status: 'success'
    });
    const req = {
      body: {
        'title': 'MTP test',
        'description': 'New mtp fo unit test',
        'type': 'monitoring',
        'estimatedStart': '14:05'
    },
      params: {},
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.addMtp(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({data: {
        isActive: true,
        _id: '6212a1468a338608587cd325',
        title: 'test',
        description: 'aaaaaa',
        type: 'monitoring',
        estimatedStart: 'azearaz',
        createdAt: '2022-02-20T20:15:02.379Z',
        updatedAt: '2022-02-20T20:15:02.379Z',
        __v: 0
      }});
  });

  it('send a wrong data form - Missing Property', async () => {
    stubAdd.returns({
      err: { message: 'error' },
      status: 'error'
    });
    const req = {
      body: { 'estimatedStart': '14:05'},
      params: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.addMtp(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });

  it('send a wrong data form - Missing Property route+post+ip', async () => {
    stubAdd.returns({
      err: { message: 'error' },
      status: 'error'
    });
    const req = {
      body: { 'estimatedStart': '14:05' },
      params: {},
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.addMtp(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });
});
