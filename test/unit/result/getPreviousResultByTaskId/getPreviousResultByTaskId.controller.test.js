// const sinon = require('sinon');
// const chai = require('chai');
// const sinonChai = require('sinon-chai');
// const expect = chai.expect;
// chai.use(sinonChai);
// const fixture = require('./fixture.json');
// const resultController = require('../../../../controllers/result.controller');
// const resultService = require('../../../../services/result');

// describe('controller getPreviousResultByTaskId ', () => {
//   let stubGetPrevious;
//   const taskID = '609061c32b4129d92a2c867c';
//   beforeEach(() => {
//     stubGetPrevious = sinon.stub(
//       resultService,
//       'getPreviousResultByTaskIDService'
//     );
//   });
//   afterEach(() => {
//     stubGetPrevious.restore();
//   });

//   it('expect to send the previous Result', async () => {
//     stubGetPrevious.returns({
//       data: fixture.foundResult,
//       status: 'success',
//       statusCode: 200
//     });
//     const req = { body: {}, params: { id: taskID }, query: {} };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.getPreviousResultByTaskId(req, res);
//     expect(stubGetPrevious).to.be.calledOnce;
//     expect(stubGetPrevious).be.calledWith(taskID);
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).be.calledWith({
//       data: fixture.foundResult,
//       status: 'success'
//     });
//   });
//   it('expect to return an error', async () => {
//     stubGetPrevious.returns({
//       err: { message: 'No Task Can be found with this ID.' },
//       status: 'error',
//       statusCode: 400,
//     });
//     const req = { body: {}, params: { id: taskID }, query: {} };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.getPreviousResultByTaskId(req, res);
//     expect(stubGetPrevious).to.be.calledOnce;
//     expect(stubGetPrevious).be.calledWith(taskID);
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).be.calledWith({
//       message: 'No Task Can be found with this ID.',
//       status: 'error'
//     });
//   });
// });
