const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getAllClients = require('../../../../services/client/getClientsBySystemId');
const Client = require('../../../../models/Client');

chai.use(sinonChai);

describe('GET ALL Clients By System service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Client, 'find');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return an success object', async () => {
    findStub.returns(fixture.arrayofClients);
    const res = await getAllClients(fixture.clientDataTest.system);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });
  it('Expect to return an success object + search Value', async () => {
    findStub.returns(fixture.arrayofClients);
    const res = await getAllClients(fixture.clientDataTest.systemId, 'search value');
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to return a 404 error', async () => {
    findStub.returns(null);
    const res = await getAllClients(fixture.clientDataTest.system);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('statusCode');
    expect(res).to.have.property('status');
    expect(res.err).to.have.property('message');
    expect(res.err).to.be.a('object');
    expect(res.status).to.be.eq('error');
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq('No  Client match this criteria !');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllClients();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
