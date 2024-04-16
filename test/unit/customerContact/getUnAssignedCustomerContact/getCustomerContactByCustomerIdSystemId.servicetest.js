const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const fixture = require('../fixture.json');
const getUnassignedCustomerContactBySystem = require('../../../../services/customerContact/getUnassignedCustomerContactBySystem');
const CustomerContact = require('../../../../models/CustomerContact');
const System = require('../../../../models/System');
chai.use(sinonChai);

describe('service : GET ALL unssigned Customer Contacts', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  let aStub;
  beforeEach(() => {
    findStub = sandbox.stub(CustomerContact, 'find');
    aStub = sandbox.stub(System, 'aggregate');
  });
  afterEach(() => {
    findStub.restore();
    aStub.restore();
  });
  it('returns a success object', async () => {
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.getAllMongoosePaginationArray.docs
      })
    });

    aStub.returns([
      {
        contact: {
          _id: '615c798e5f9d512f7d5baad0',
          isActive: true,
          lastName: 'Nikola Tesla',
          mail: 'nikola@avaxia.com',
          customer: '608bde23c5a2a0a1607294a5',
          phoneNumber: 98776655
        }
      },
      {
        contact: {
          _id: '615c7fc95f9d5189a95baad2',
          isActive: true,
          lastName: 'Niels Bohr',
          mail: 'niels@avaxia.com',
          customer: '608bde23c5a2a0a1607294a5',
          phoneNumber: 22557788
        }
      }
    ]
    );
    const res = await getUnassignedCustomerContactBySystem(
      fixture.customerId,
      fixture.systemDataTestTest._id
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });
  it('returns a success object length 0000000000000000', async () => {
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => []
      })
    });

    aStub.returns([]
    );
    const res = await getUnassignedCustomerContactBySystem(
      fixture.customerId,
      fixture.systemDataTestTest._id
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('string');
    expect(res.status).to.be.eq('success');
  });

  it('expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getUnassignedCustomerContactBySystem(fixture.customerId);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
