const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const getOneMtpService = require('../../../../services/mtp/getOneMtpService');

const MTP = require('../../../../models/MTP');

chai.use(sinonChai);

describe('testing get One MTP service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(MTP, 'findOne');
  });
  afterEach(() => {
    findStub.restore();
  });

  it('expect to return an success object', async () => {
    findStub.returns({
        lean: sandbox.stub().returns({
          exec: () => ({
            'isActive': true,
            '_id': '6212a1468a338608587cd325',
            'title': 'test',
            'description': 'for test',
            'type': 'monitoring',
            'estimatedStart': '20:00',
            'createdAt': '2022-02-20T20:15:02.379Z',
            'updatedAt': '2022-02-20T20:15:02.379Z',
            '__v': 0
        })
        })
      });
    const res = await getOneMtpService('6212a1468a338608587cd325');
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.status).to.be.eq('success');
  });

  it('expect to return no data', async () => {
    findStub.returns({
        lean: sandbox.stub().returns({
          exec: () => (undefined)
        })
      });
    const res = await getOneMtpService('6212a1468a338608587cd325');
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('no data');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getOneMtpService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

});
