const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getAllHosts = require('../../../../services/host/getAllHostsBySystem');
const Host = require('../../../../models/Host');

chai.use(sinonChai);

describe('GET ALL Hosts By System service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Host, 'find');
  });
  afterEach(() => {
    findStub.restore();
  });

  it('Expect to return an success object', async () => {
    findStub.returns(fixture.arrayofHosts);
    const res = await getAllHosts(fixture.hostDataTest.system);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data.data.docs).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });
  it('Expect to return an success object + search value', async () => {
    findStub.returns(fixture.arrayofHosts);
    const res = await getAllHosts(fixture.hostDataTest.system, 'search value');
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data.data.docs).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to return 404 error', async () => {
    findStub.returns(null);
    const res = await getAllHosts(fixture.hostDataTest.system);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('statusCode');
    expect(res).to.have.property('status');
    expect(res.err).to.have.property('message');
    expect(res.err).to.be.a('object');
    expect(res.status).to.be.eq('error');
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq('No Host match this criteria !');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllHosts();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
