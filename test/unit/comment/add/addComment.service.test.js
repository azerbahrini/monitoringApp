const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const addComment = require('../../../../services/comment/addComment.service');
const Comment = require('../../../../models/Comment');

chai.use(sinonChai);
describe('Add Comment service TEST', () => {
  let createStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Comment, 'create');
  });
  afterEach(() => {
    createStub.restore();
  });
  it('Expect to return a success', async () => {
    createStub.returns(fixture.document);
    const res = await addComment(fixture.documentWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.documentWithoutID);
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(201);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('data');
    expect(res.data).to.be.a('object');
    expect(res.data).to.have.keys(['_id', 'content', 'createdAt', 'updatedAt', '__v', 'isActive', 'user', 'feed']);
  });

  it('Expect to return an error', async () => {
    createStub.throws(new Error('Random error'));
    const res = await addComment(fixture.documentWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

});
