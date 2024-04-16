const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const mtpController = require('../../../../controllers/mtp.controller');
const mtpService = require('../../../../services/mtp');

describe('controller Delete MTP test ', () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(mtpService, 'deleteMtpService');
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it('expect to return an Updated Mtp ', async () => {
    stubUpdate.returns({
        data: {
            'isActive': false,
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
      params: { id: '6212a1468a338608587cd325' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.deleteMtp(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: '6212a1468a338608587cd325' });
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
        data: {
          isActive: false,
          _id: '6212a1468a338608587cd325',
          title: 'test',
          description: 'aaaaaa',
          type: 'monitoring',
          estimatedStart: 'azearaz',
          createdAt: '2022-02-20T20:15:02.379Z',
          updatedAt: '2022-02-20T20:15:02.379Z',
          __v: 0
        }
      });
  });

  it('expect to return deleted mtp route+post+ip', async () => {
    stubUpdate.returns({
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
        params: { id: '6212a1468a338608587cd325' },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.deleteMtp(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: '6212a1468a338608587cd325' });
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
        data: {
          isActive: true,
          _id: '6212a1468a338608587cd325',
          title: 'test',
          description: 'aaaaaa',
          type: 'monitoring',
          estimatedStart: 'azearaz',
          createdAt: '2022-02-20T20:15:02.379Z',
          updatedAt: '2022-02-20T20:15:02.379Z',
          __v: 0
        }
      });
  });

  it('expect to return an error ', async () => {
    stubUpdate.returns({
      err: { message: 'error' },
      status: 'error',
      statusCode: 400
    });
    const req = {
        params: { id: '6212a1468a338608587cd325' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.deleteMtp(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: '6212a1468a338608587cd325' });
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });

  it('expect to return an error  route+post+ip', async () => {
    stubUpdate.returns({
      err: { message: 'error' },
      status: 'error',
      statusCode: 400
    });
    const req = {
        params: { id: '6212a1468a338608587cd325' },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.deleteMtp(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: '6212a1468a338608587cd325' });
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'error'
    });
  });

  it('expect to return an error - ID Does not exist', async () => {
    stubUpdate.returns({
      err: { message: 'No MTP matched this criteria !' },
      status: 'no data',
      statusCode: 204
    });
    const req = {
        body: { 'estimatedStart': '20:20' },
        params: { id: '6212a1468a338608587cd325' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.deleteMtp(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: '6212a1468a338608587cd325' });
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).be.calledWith({
      message: 'No MTP matched this criteria !'
    });
  });

  it('expect to return an error - ID Does not exist route+post+ip', async () => {
    stubUpdate.returns({
      err: { message: 'No MTP matched this criteria !' },
      status: 'no data',
      statusCode: 204
    });
    const req = {
        params: { id: '6212a1468a338608587cd325' },
      route: '/testing', method: 'post', ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.deleteMtp(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: '6212a1468a338608587cd325' });
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).be.calledWith({
      message: 'No MTP matched this criteria !'
    });
  });
});
