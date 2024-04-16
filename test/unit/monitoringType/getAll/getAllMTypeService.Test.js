const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getAllMTypeService = require('../../../../services/monitoringType/getAll');
const MonitoringType = require('../../../../models/MonitoringType');

chai.use(sinonChai);

describe('GET ALL MonitoringType service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(MonitoringType, 'paginate');
  });
  afterEach(() => {
    findStub.restore();
  });
  const page = 0;
  const size = 5;

  it('Expect to return all active objects', async () => {
    const isActive = true;
    const searchValue = null;
    findStub.returns(fixture.arrayofTypes);
    const res = await getAllMTypeService(page, size, isActive, searchValue);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.have.property('isActive');
    expect(res.data[0].isActive).to.be.equal(true);
    expect(res.status).to.be.eq('success');
  });
  it('Expect search in active objects', async () => {
    const isActive = true;
    const searchValue = 'test';
    findStub.returns(fixture.arrayofTypes);
    const res = await getAllMTypeService(page, size, isActive, searchValue);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.have.property('isActive');
    expect(res.data[0].isActive).to.be.equal(true);
    expect(res.status).to.be.eq('success');
  });

  it('Expect to return all Invactive objects', async () => {
    const isActive = false;
    const searchValue = null;
    findStub.returns(fixture.arrayofTypes);
    const res = await getAllMTypeService(page, size, isActive, searchValue);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.have.property('isActive');
    expect(res.data[0].isActive).to.be.equal(true);
    expect(res.status).to.be.eq('success');
  });

  it('Expect to search in  Invactive objects', async () => {
    const isActive = false;
    const searchValue = 'test';
    findStub.returns(fixture.arrayofTypes);
    const res = await getAllMTypeService(page, size, isActive, searchValue);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.have.property('isActive');
    expect(res.data[0].isActive).to.be.equal(true);
    expect(res.status).to.be.eq('success');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllMTypeService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
