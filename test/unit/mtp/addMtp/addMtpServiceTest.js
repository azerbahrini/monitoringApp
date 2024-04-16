const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const addMtp = require('../../../../services/mtp/addMtpService');
const MTP = require('../../../../models/MTP');

chai.use(sinonChai);
describe('Add MTP service TEST', () => {
  let createStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(MTP, 'create');
  });
  afterEach(() => {
    createStub.restore();
  });
  it('Expect to return a success', async () => {
    createStub.returns({
        'isActive': false,
        '_id': '620e541c46ad03120ca9ccdc',
        'title': 'test',
        'description': 'aaaaaa',
        'type': 'monitoring',
        'estimatedStart': 'azearaz',
        'createdAt': '2022-02-17T13:56:44.758Z',
        'updatedAt': '2022-02-17T13:57:20.200Z',
        '__v': 0
    });
    const res = await addMtp({
        'isActive': false,
        'title': 'test',
        'description': 'aaaaaa',
        'type': 'monitoring',
        'estimatedStart': 'azearaz'
    });
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith({
        'isActive': false,
        'title': 'test',
        'description': 'aaaaaa',
        'type': 'monitoring',
        'estimatedStart': 'azearaz'
    });
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(201);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('data');
    expect(res.data).to.be.a('object');
    expect(res.data).to.includes.keys(['_id', 'isActive', 'title', 'estimatedStart', 'isActive', 'description']);
  });

  it('Expect to return an error', async () => {
    createStub.throws(new Error('Random error'));
    const res = await addMtp({
        'isActive': false,
        'title': 'test',
        'description': 'for test',
        'type': 'monitoring',
        'estimatedStart': '20:00'
    });
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

});
