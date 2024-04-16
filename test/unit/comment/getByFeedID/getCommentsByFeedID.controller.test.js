const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture.json');
const commentController = require('../../../../controllers/comment.controller');
const commentService = require('../../../../services/comment');

describe('controller get Comments By Feed ID Test ', () => {
  let stubGet;
  beforeEach(() => {
    stubGet = sinon.stub(commentService, 'getCommentsByFeedID');
  });
  afterEach(() => {
    stubGet.restore();
  });
  it('expect to return success ', async () => {
    stubGet.returns({
      data: [fixture.document],
      status: 'success',
      statusCode: 200
    });

    const req = {
      body: {},
      params: { id: fixture.document.feed }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.getCommentsByFeedID(req, res);
    expect(stubGet).to.be.calledWith(fixture.document.feed);
    expect(res.json).be.calledWith({
      data: [fixture.document],
      status: 'success'
    });
  });

  it('expect to return 204 No Data found ', async () => {
    stubGet.returns({
      err: { message: 'No Comments found for this newsfeed ID !' },
      status: 'success',
      statusCode: 204
    });

    const req = {
      body: {},
      params: { id: fixture.document.feed }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.getCommentsByFeedID(req, res);
    expect(stubGet).to.be.calledWith(fixture.document.feed);
    expect(res.json).be.calledWith({
      status: 'success',
      message: 'No Comments found for this newsfeed ID !'
    });
  });
});
