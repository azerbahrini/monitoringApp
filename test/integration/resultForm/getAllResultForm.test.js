const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const request = require('supertest');
const ResultForm = require('../../../models/ResultForm');
const app = require('../../../server');

chai.use(sinonChai);
let refsultForm;

describe('GET ALL resultForm', () => {
    before('adding result form before beginning the test', (done) => {
        refsultForm = refsultForm({
            formSchema: {
                test: '6189549b05812f2a68ef7aed'
            },
            formUISchema: {
                test: '6189549b05812f2a68ef7987'
            },
            formLimits: {
                test: '6189549b05812f2a68ef7123'
            },
            monitoringActivity: '6189549b05812f2a68ef7aed',
            isActive: true
        });
        ResultForm.save().then(() => done());
    });
    it('Sends a valid Request', async () => {
      const query = {
        page: 0,
        size: 1
      }
      const res = await request(app)
        .get('/api/resultform/getAllResultForm')
        .set('content-type", "application/json')
        .query(query);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.include.property('docs');
        expect(res.body.data.docs).to.be.a('array');
        expect(res.body.data.docs[0]).to.be.a('object');
        expect(res.body.data.docs[0]).to.include.all.keys('formSchema', 'formUISchema', '_id', 'formLimits', 'monitoringActivity', 'isActive');
        expect(res.body.data.docs[0].isActive).to.be.a('boolean');
        expect(res.body.data.docs[0]._id).to.be.a('string');
    });
    it('Sends an invalid request - wrong route', async () => {
      const res = await request(app)
        .get('/api/resultform/getAllResultForm')
        .set('content-type', 'application/json')
        .send({});
      expect(res.status).to.equal(404);
    });
    after(() => {
        ResultForm.findByIdAndDelete(refsultForm._id).then(() => done());
    });
  });