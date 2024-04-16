const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const request = require('supertest');
const Map = require('../../../models/MonitoringActivityPlannification');
const System = require('../../../models/System');
const app = require('../../../server');

chai.use(sinonChai);
let map;
let system;
describe('GET CUSTOMER REPORT LAYOUT', () => {
  before('adding system and map before beginning the test', (done) => {

    system = System({
      name: 'systemExemple',

      type: '60ee0042d9b53b3e089209f5',

      category: '60ee0042d0b53b3e089209f6',

      customer: '608bde23c5a2a0a1607294a5',

      class: '50ee0042d8b53b31084309f5',

      deployType: 'Cloud',

      deployDesc: 'descTest',

      fqdn: 'test',

      listTechnicalUser: ['50ee0042d8b53b32084309f5'],

      isActive: true
    });
    system.save();

    map = Map({
      periodicity: 5,
      active: true,
      system: system._id,
      estimation: 200,
      startTime: 77,
      monitoringAct: '5fd1e65f93dd352dbcbf8cc6'
    });

    map.save().then(() => done());

  });
  it('Sends a valid Request', async () => {
      console.log(map,system)
    const customerId = '608bde23c5a2a0a1607294a5';
    const res = await request(app)
      .get('/api/customer/getCustomerReportLayout/' + customerId)
      .set('content-type', 'application/json');
    expect(res.status).to.equal(200);
    /* expect(res.body.data).to.be.a('object');
    expect(res.body.data).to.have.property('label');
    expect(res.body.data).to.have.property('isActive');
    expect(res.body.data).to.have.property('address');
    expect(res.body.data).to.have.property('firstReport'); */
  });

  it('Sends an invalid request - Wrong ID', async () => {
    it('Sends a valid Request', async () => {
      const customerId = '60ef4e3f7221301cc8eaafbe';
      const res = await request(app)
        .get('/api/customer/' + customerId)
        .set('content-type', 'application/json');
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a('string');
      expect(res.body.message).to.be.eq('customer not found');
    });
  });
  after(() => {
    System.findByIdAndDelete(system._id).then(() => done());
    Map.findByIdAndDelete(map._id).then(() => done());
  });
});
