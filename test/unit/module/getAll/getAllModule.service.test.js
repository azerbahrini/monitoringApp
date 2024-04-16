const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getAllModuleService = require('../../../../services/module/getAllModule.service');
const Module = require('../../../../models/Module');

chai.use(sinonChai);

describe('GET ALL Module service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  const page=0;
  const size=1;
  beforeEach(() => {
    findStub = sandbox.stub(Module, 'paginate');
  });
  afterEach(() => {
    findStub.restore();
  });

  it('Expect to return ALL modules', async () => {
    const isBasic = false;
    findStub.returns(fixture.arrayofModules);
    const res = await getAllModuleService(page, size, isBasic);
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith();
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });
  it('Expect to return ALL modules + search value', async () => {
    const isBasic = false;
    findStub.returns(fixture.arrayofModules);
    const res = await getAllModuleService(page, size, isBasic, 'module name');
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith();
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to return ONLY basic modules', async () => {
    const isBasic = true;
    findStub.returns(fixture.arrayofModules);
    const res = await getAllModuleService(page, size, isBasic);
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith();
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllModuleService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
