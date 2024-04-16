const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const moment = require('moment-timezone');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture.json');
const taskController = require('../../../../controllers/task.controller');
const taskService = require('../../../../services/task');

describe('controller get tasks ', () => {
  let stubGetAll;
  let stubNumberOfTasks;
  beforeEach(() => {
    stubGetAll = sinon.stub(taskService, 'getTaskList');
    stubNumberOfTasks = sinon.stub(taskService, 'numberOfTasksByCriteria');
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it('expect to send all Tasks filtred', async () => {

    stubGetAll.returns({
      data: fixture.arrayOfFiltredTasks,
      status: 'success'
    });
    stubNumberOfTasks.returns({
      data: {
        'Pending': 10,
        'In_Progress': 10,
        'Done': 10,
        'Canceled': 10,
        'To_Be_Validated': 10,
        'Rejected': 10,
        'Deleted': 10,
        'Completed': 10
      },
      status: 'success'
    });

    const req = {
      body: {
        type: ['Monitoring'],
        state: ['Done', 'Pending'],
        startDate: moment('2021-11-11T00:00:00.000Z').format(),
        endDate: moment('2031-11-12T00:00:00.000Z').format(),
        timeZone: 'Asia/Taipei'
      },
      params: {},
      query: {
        searchValue: 'SP01 PR1',
        page: 1,
        size: 1000
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getAllTasksByCriteria(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(stubNumberOfTasks).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);

  });
});
