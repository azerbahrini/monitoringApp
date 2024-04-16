const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
chai.use(require('sinon-chai'));
const fixture = require('../fixture.json');
const customerController = require('../../../../controllers/customer.controller');
const systemService = require('../../../../services/system');
const mapsService = require('../../../../services/map');

describe('controller get customer Report Layout Controller test ', () => {
  let stubGetSystems;
  let stubGetMaps;
  beforeEach(() => {
    stubGetSystems = sinon.stub(systemService, 'getAllSystemByCustomerId');
    stubGetMaps = sinon.stub(mapsService, 'getMapsBySystems');
  });
  afterEach(() => {
    stubGetSystems.restore();
    stubGetMaps.restore();
  });
  it('expect to send customer  by that ID', async () => {
    stubGetSystems.returns({
      data: { docs:
        [
          {
            listTechnicalUser: [],
            listCustomerContact: [],
            isActive: true,
            _id: '61b0790be6b6f1336491ec2a',
            name: 'PRD-FIRAS',
            type: '608be0f0c5a2a0bd397294aa',
            category: '608be4c6c5a2a0084a7294b2',
            customer: '608bde23c5a2a0a1607294a5',
            class: '608be15ec5a2a054387294ab',
            deployType: 'On-Premise',
            deployDesc: 'Test',
            fqdn: 'firas.com',
            createdAt: '2021-12-08T09:21:15.975Z',
            updatedAt: '2021-12-08T09:21:15.975Z'
          }
        ]},
        status: 'success'
    })
    stubGetMaps.returns({
data: [
  {
    _id: '61b079a0e6b6f1336491ec2b',
    active: true,
    periodicity: 60,
    estimation: 15,
    system: {
      _id: '61b0790be6b6f1336491ec2a',
      name: 'PRD-FIRAS',
      customer: { _id: '608bde23c5a2a0a1607294a5', label: 'Jera Corporation' }
    },
    monitoringAct: {
      _id: '608bcbcdc5a2a053a072948f',
      activity: 'SP01',
      description: 'SAP Transaction'
    },
    startTime: 1020,
    createdAt: '2021-12-08T09:23:44.771Z',
    updatedAt: '2021-12-08T09:23:44.771Z'
  }
]
    })
    const req = {
      body: {},
      params: { id: fixture.customerDataTest._id },
      query: {type: JSON.stringify(['616404eba7548faf96ecceae']), category: JSON.stringify(['616404eba7548faf96ecceae']) }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
   await customerController.getCustomerReportLayout(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it('expect to return an error - ID Does not exist', async () => {
    stubGetSystems.returns({IDs: '123456789xxx'});
    stubGetMaps.returns([])
    const req = {
      body: {},
      params: { id: fixture.wrongID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getCustomerReportLayout(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: 'no data to display' });
  });
});
