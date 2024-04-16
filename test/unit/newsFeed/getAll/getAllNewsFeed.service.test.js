const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getAllNewsFeed = require('../../../../services/newsFeed/getAllNewsFeed.service');
const NewsFeed = require('../../../../models/NewsFeed');

chai.use(sinonChai);

describe('GET ALL newsFeed service', () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(NewsFeed, 'paginate');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return a success object', async () => {
    findStub.returns(fixture.getAllDocument);
    const res = await getAllNewsFeed();
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith(req.query);
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res.data).to.have.property('docs');
    expect(res).to.have.property('status');
    expect(res.data.docs).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllNewsFeed();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
