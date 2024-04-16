const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const getAllMtpService = require('../../../../services/mtp/getAllMtpService');

const MTP = require('../../../../models/MTP');

chai.use(sinonChai);

describe('testing get all MTP service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(MTP, 'paginate');
  });
  afterEach(() => {
    findStub.restore();
  });

  it('expect to return an success object', async () => {
    findStub.returns({
            'docs': [
                {
                    'isActive': true,
                    '_id': '6212a1468a338608587cd325',
                    'title': 'test',
                    'description': 'for test',
                    'type': 'monitoring',
                    'estimatedStart': '20:00',
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

    });
    const page = 0;
    const size = 100;
    const isActive = true
    const res = await getAllMtpService(page, size, isActive);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.data).to.have.property('docs');
    expect(res.data.docs).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('expect to return no data', async () => {
    findStub.returns({
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

    });
    const page = 0;
    const size = 100;
    const isActive = true
    const res = await getAllMtpService(page, size, isActive);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('no data');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllMtpService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

});
