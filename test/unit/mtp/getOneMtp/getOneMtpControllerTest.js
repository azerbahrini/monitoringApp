const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const mtpController = require('../../../../controllers/mtp.controller');
const mtpService = require('../../../../services/mtp');

describe('GET MTP By ID Controller ', () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(mtpService, 'getOneMtpService');
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it('Expect to send MTP by that ID', async () => {
    stubGetById.returns({
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
            }
        ,
      status: 'success'
    });
    const req = {
      body: {},
      params: { id: '620e541c46ad03120ca9ccdc' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getMTPById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({data: {
                'isActive': true,
                '_id': '6212a1468a338608587cd325',
                'title': 'test',
                'description': 'aaaaaa',
                'type': 'monitoring',
                'estimatedStart': 'azearaz',
                'createdAt': '2022-02-20T20:15:02.379Z',
                'updatedAt': '2022-02-20T20:15:02.379Z',
                '__v': 0
            }});
  });

  it('Expect to send MTP by that ID route+post+ip', async () => {
    stubGetById.returns({
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
            }
        ,
      status: 'success'
    });
    const req = {
      body: {},
      params: { id: '6212a1468a338608587cd325' },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getMTPById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({data: {
                'isActive': true,
                '_id': '6212a1468a338608587cd325',
                'title': 'test',
                'description': 'aaaaaa',
                'type': 'monitoring',
                'estimatedStart': 'azearaz',
                'createdAt': '2022-02-20T20:15:02.379Z',
                'updatedAt': '2022-02-20T20:15:02.379Z',
                '__v': 0
            }});
  });

  it('Expect to return an error - ID Does not exist', async () => {
    stubGetById.returns({
      err: { message: 'MTP not found' },
      status: 'no data',
      statusCode: 204
    });
    const req = {
      body: {},
      params: { id: '6212a1468a338608587cd325' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getMTPById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).be.calledWith({
      message: 'MTP not found'
    });
  });

  it('Expect to return an error - ID Does not exist route+post+ip', async () => {
    stubGetById.returns({
      err: { message: 'MTP not found' },
      status: 'no data',
      statusCode: 204
    });
    const req = {
      body: {},
      params: { id: '6212a1468a338608587cd325' },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getMTPById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).be.calledWith({
      message: 'MTP not found'
    });
  });

  it('Expect to return an error ', async () => {
    stubGetById.returns({
      err: { message: 'error' },
      status: 'error',
      statusCode: 400
    });
    const req = {
      body: {},
      params: { id: '6212a1468a338608587cd325' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getMTPById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });

  it('Expect to return an error - route+post+ip', async () => {
    stubGetById.returns({
      err: { message: 'error' },
      status: 'error',
      statusCode: 400
    });
    const req = {
      body: {},
      params: { id: '6212a1468a338608587cd325' },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getMTPById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });
});
