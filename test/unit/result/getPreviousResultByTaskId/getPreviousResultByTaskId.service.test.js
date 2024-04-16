const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const fixture = require('./fixture.json');
const getPreviousResultByTaskIDService = require('../../../../services/result/getPreviousResultByTaskIDService');
const Result = require('../../../../models/Result');
const Task = require('../../../../models/Task');
chai.use(sinonChai);
const ObjectId = require('mongodb').ObjectId;
const sandbox = sinon.createSandbox();

describe('testing get previous Result service', () => {
  let aggregateStub;
  let findStub;
  beforeEach(() => {
    aggregateStub = sinon.stub(Task, 'aggregate');
    findStub = sinon.stub(Result, 'findOne');
  });
  afterEach(() => {
    aggregateStub.restore();
    findStub.restore();
  });

  it('expect to return an success object', async () => {
    aggregateStub
      .onFirstCall()
      .returns(fixture.map)
      .onSecondCall()
      .returns(fixture.taskList);
    findStub.returns({
        sort: sandbox.stub().returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.foundResult
      })
    })
    });
    const res = await getPreviousResultByTaskIDService(
      '609061c32b4129d92a2c867c'
    );
    expect(findStub).to.be.calledOnce;
    expect(findStub).be.calledWith({
      task: ObjectId('6091cc36b651f8639221fa5c')
    });
    expect(aggregateStub).to.have.been.calledTwice;
    expect(aggregateStub.firstCall).to.have.been.calledWith([
      { $match: { _id: new ObjectId('609061c32b4129d92a2c867c') } },
      { $project: { map: 1, _id: 0 } },
    ]);
    expect(aggregateStub.secondCall).to.have.been.calledWith([
      {
        $match: {
          map: new ObjectId('60905c242b412971d52c866c'),
          state: 'Done',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.data).to.be.a('object');
    expect(res.statusCode).to.be.eq(200);
    expect(res.status).to.be.eq('success');
  });

  it('expect to return an error', async () => {
    aggregateStub
      .onFirstCall()
      .returns(fixture.map)
      .onSecondCall()
      .returns(fixture.taskList);
      findStub.returns({
        sort: sandbox.stub().returns({
      lean: sandbox.stub().returns({
        exec: () => null
      })
    })
    });
    const res = await getPreviousResultByTaskIDService(
      '609061c32b4129d92a2c867c'
    );
    expect(findStub).to.be.calledOnce;
    expect(findStub).be.calledWith({
      task: ObjectId('6091cc36b651f8639221fa5c'),
    });
    expect(aggregateStub).to.have.been.calledTwice;
    expect(aggregateStub.firstCall).to.have.been.calledWith([
      { $match: { _id: new ObjectId('609061c32b4129d92a2c867c') } },
      { $project: { map: 1, _id: 0 } },
    ]);
    expect(aggregateStub.secondCall).to.have.been.calledWith([
      {
        $match: {
          map: new ObjectId('60905c242b412971d52c866c'),
          state: 'Done',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.a('string');
    expect(res.err.message).to.be.eq(
      'No Result Can be found with this Task ID'
    );
    expect(res.statusCode).to.be.eq(404);
    expect(res.status).to.be.eq('error');
  });

  it('expect to fail to get the map tasks', async () => {
    aggregateStub
      .onFirstCall()
      .returns(fixture.map)
      .onSecondCall()
      .returns(null);
      findStub.returns(null);
    const res = await getPreviousResultByTaskIDService(
      '609061c32b4129d92a2c867c'
    );
    expect(aggregateStub).to.have.been.calledTwice;
    expect(aggregateStub.firstCall).to.have.been.calledWith([
      { $match: { _id: new ObjectId('609061c32b4129d92a2c867c') } },
      { $project: { map: 1, _id: 0 } },
    ]);
    expect(aggregateStub.secondCall).to.have.been.calledWith([
      {
        $match: {
          map: new ObjectId('60905c242b412971d52c866c'),
          state: 'Done',
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.a('string');
    expect(res.err.message).to.be.eq('Failed to get the map tasks');
    expect(res.statusCode).to.be.eq(400);
    expect(res.status).to.be.eq('error');
  });

  it('expect to return an error - No Task Can be found with this ID.', async () => {
    aggregateStub.onFirstCall().returns([]);
    findStub.returns({
        sort: sandbox.stub().returns({
      lean: sandbox.stub().returns({
        exec: () => null
      })
    })
    });    const res = await getPreviousResultByTaskIDService(
      '609061c32b4129d92a2c867c'
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(aggregateStub).to.have.been.calledWith([
      { $match: { _id: new ObjectId('609061c32b4129d92a2c867c') } },
      { $project: { map: 1, _id: 0 } },
    ]);

    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.a('string');
    expect(res.err.message).to.be.eq('No Task Can be found with this ID.');
    expect(res.statusCode).to.be.eq(404);
    expect(res.status).to.be.eq('error');
  });

  it('Expect to throw an error', async () => {
    aggregateStub.throws(new Error('random error'));
    const res = await getPreviousResultByTaskIDService(
      '609061c32b4129d92a2c867c'
    );
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

  // it('expect to return an success + No Content', async () => {
  //   aggregateStub
  //     .onFirstCall()
  //     .returns(fixture.map)
  //     .onSecondCall()
  //     .returns(fixture.taskList);

  //     findStub.returns({});
  //   const res = await getPreviousResultByTaskIDService(
  //     '609061c32b4129d92a2c867c'
  //   );
  //   expect(findStub).to.be.calledOnce;
  //   expect(findStub).be.calledWith({ taskID: ObjectId('6091cc36b651f8639221fa5c') });
  //   expect(aggregateStub).to.have.been.calledTwice;
  //   expect(aggregateStub.firstCall).to.have.been.calledWith([
  //     { $match: { _id: new ObjectId('609061c32b4129d92a2c867c') } },
  //     { $project: { map: 1, _id: 0 } },
  //   ]);
  //   expect(aggregateStub.secondCall).to.have.been.calledWith([
  //     {
  //       $match: {
  //         map: new ObjectId('60905c242b412971d52c866c'),
  //         state: 'Done',
  //       },
  //     },
  //     { $sort: { createdAt: -1 } },
  //   ]);
  //   expect(res).to.be.a('object');
  //   expect(res).to.have.property('data');
  //   expect(res).to.have.property('status');
  //   expect(res).to.have.property('statusCode');
  //   expect(res.data).to.be.a('object');
  //   expect(res.statusCode).to.be.eq(204);
  //   expect(res.status).to.be.eq('success');
  // });
});
