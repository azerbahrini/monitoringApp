const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const mtpController = require('../../../../controllers/mtp.controller');
const mtpService = require('../../../../services/mtp');

describe('GET All Mtps Controller ', () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(
      mtpService,
      'getAllMtpService'
    );
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it('Expect to get All MTPs ', async () => {
    stubGetAll.returns({
      data: {
        'docs': [
            {
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
        ],
        'totalDocs': 2,
        'offset': 0,
        'limit': 10,
        'totalPages': 1,
        'page': 1,
        'pagingCounter': 1,
        'hasPrevPage': false,
        'hasNextPage': false,
        'prevPage': null,
        'nextPage': null
    },
      status: 'success'
    });
    const req = {
      body: {},
      query: {page: 1, size: 100, isActive: true},
      params: {}

    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getAllMTP(req, res);
    expect(stubGetAll).to.be.calledWith(1, 100);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({data: {
        'docs': [
            {
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
        ],
        'totalDocs': 2,
        'offset': 0,
        'limit': 10,
        'totalPages': 1,
        'page': 1,
        'pagingCounter': 1,
        'hasPrevPage': false,
        'hasNextPage': false,
        'prevPage': null,
        'nextPage': null
    }});
  });

  it('Expect to get All MTPs route+post+ip', async () => {
    stubGetAll.returns({
      data: {
        'docs': [
            {
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
        ],
        'totalDocs': 2,
        'offset': 0,
        'limit': 10,
        'totalPages': 1,
        'page': 1,
        'pagingCounter': 1,
        'hasPrevPage': false,
        'hasNextPage': false,
        'prevPage': null,
        'nextPage': null
    },
      status: 'success'
    });
    const req = {
      body: {},
      params: {},
      query: {page: 1, size: 100, isActive: true},
      route: '/testing', method: 'post', ip: '1234'

    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getAllMTP(req, res);
    expect(stubGetAll).to.be.calledWith(1, 100);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({data: {
        'docs': [

            {
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
        ],
        'totalDocs': 2,
        'offset': 0,
        'limit': 10,
        'totalPages': 1,
        'page': 1,
        'pagingCounter': 1,
        'hasPrevPage': false,
        'hasNextPage': false,
        'prevPage': null,
        'nextPage': null
    }});
  });

  it('Expect to get no data', async () => {
    stubGetAll.returns({
      data: {
        'docs': [],
        'totalDocs': 0,
        'offset': 0,
        'limit': 10,
        'totalPages': 1,
        'page': 1,
        'pagingCounter': 1,
        'hasPrevPage': false,
        'hasNextPage': false,
        'prevPage': null,
        'nextPage': null
    },
      status: 'no data',
      err: { message: 'MTP not found' }
    });
    const req = {
      body: {},
      params: {},
      query: {page: 1, size: 100, isActive: true}

    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getAllMTP(req, res);
    expect(stubGetAll).to.be.calledWith(1, 100);
    expect(res.status).to.have.been.calledWith(204);
  });

  it('Expect to get no data route+post+ip', async () => {
    stubGetAll.returns({
      data: {
        'docs': [],
        'totalDocs': 0,
        'offset': 0,
        'limit': 10,
        'totalPages': 1,
        'page': 1,
        'pagingCounter': 1,
        'hasPrevPage': false,
        'hasNextPage': false,
        'prevPage': null,
        'nextPage': null
    },
      status: 'no data',
      err: { message: 'MTP not found' }
    });
    const req = {
      body: {},
      params: {},
      query: {page: 1, size: 100, isActive: true},
      route: '/testing', method: 'post', ip: '1234'

    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getAllMTP(req, res);
    expect(stubGetAll).to.be.calledWith(1, 100);
    expect(res.status).to.have.been.calledWith(204);
  });

  it('Expect to return An Error: route+post+ip', async () => {
    stubGetAll.returns({
        err: { message: 'Missing Customer ID' },
        status: 'error',
        statusCode: 400
    });
    const req = {
      body: {},
      params: {},
      query: {page: 1, size: 100, isActive: true},
      route: '/testing', method: 'post', ip: '1234'

    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getAllMTP(req, res);
    expect(stubGetAll).to.be.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
        message: 'Missing Customer ID'
    });
  });

  it('Expect to return An Error', async () => {
    stubGetAll.returns({
        err: { message: 'error' },
        status: 'error',
        statusCode: 400
    });
    const req = {
      body: {},
      params: {},
      query: {page: 1, size: 100, isActive: true}

    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mtpController.getAllMTP(req, res);
    expect(stubGetAll).to.be.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
        message: 'error'
    });
  });
});
