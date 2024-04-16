const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const fixture = require('../fixture.json');
const getCustomerContactByCustomer = require('../../../../services/customerContact/getCustomerContactByCustomer.service');
const CustomerContact = require('../../../../models/CustomerContact');

chai.use(sinonChai);

describe('testing get all Customer Contact By Customer service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(CustomerContact, 'paginate');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('expect to return an success object', async () => {
    findStub.returns(fixture.getAllMongoosePaginationArray);
    const res = await getCustomerContactByCustomer(fixture.customerId);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.status).to.be.eq('success');
  });
  it('expect to return an success object + search', async () => {
    findStub.returns(fixture.getAllMongoosePaginationArray);
    const res = await getCustomerContactByCustomer(fixture.customerId, 0, 10, 'search');
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.status).to.be.eq('success');
  });

  it('expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getCustomerContactByCustomer();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
