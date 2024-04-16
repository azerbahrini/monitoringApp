const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('./fixture.json');
const assignTlService = require('../../../../services/shift/assignTeamLead');
const Shift = require('../../../../models/Shift');

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => ' ' + elem + ': Path `' + elem + '` is required.');
  return modelName + ' validation failed:' + refectoredList.join(',');
};
describe('Service Assign TL', () => {
  let createStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Shift, 'insertMany');
  });
  afterEach(() => {
    createStub.restore();
  });
  it('expect to return an success object', async () => {
    const shiftObject = [
      {
        shiftId: fixture.add.success.body.data[0].id,
        userId: fixture.add.success.body.data[0].userId,
        type: 'app',
        userMicrosoftId: '5fa02d8f785e4681ddfa3a6d',
        role: '5fa02d8f785e4681ddfa3a6d',
        name: 'night-shift',
        startDate: '2021-09-24',
        endDate: '2021-09-24',
        updatedShiftAt: '2021-09-24'
      },
      {
        shiftId: fixture.add.success.body.data[0].id,
        userId: fixture.add.success.body.data[0].userId,
        type: 'app',
        userMicrosoftId: '5fa02d8f785e4681ddfa3a6d',
        role: '5fa02d8f785e4681ddfa3a6d',
        name: 'night-shift',
        startDate: '2021-09-24',
        endDate: '2021-09-24',
        updatedShiftAt: '2021-09-24'
      }
    ];

    createStub.returns(fixture.add.success.body.data);

    const res = await assignTlService(shiftObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(shiftObject);
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.be.a('object');
    expect(res.data[0]).to.have.property('shiftId');
    expect(res.status).to.be.eq('success');
  });

  it('expect to return a 404 error', async () => {
    createStub.returns(null);
    const res = await assignTlService(null);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(null);
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('statusCode');
    expect(res).to.have.property('status');
    expect(res.err).to.have.property('message');
    expect(res.err).to.be.a('object');
    expect(res.status).to.be.eq('error');
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq('Cannot Assign A Team Leader ');
  });

  it('expect to return an error object - empty object', async () => {
    const shiftObject = [{}];
    createStub.throws(
      new Error(
        mongooseError('shift', [
          'shiftId',
          'userId',
          'type',
          'userMicrosoftId',
          'role',
          'name',
          'startDate',
          'endDate',
          'updatedShiftAt'
        ])
      )
    );
    const res = await assignTlService(shiftObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(shiftObject);
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    //Expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a('string');
    expect(res.err.message).to.be.eq(
      mongooseError('shift', [
        'shiftId',
        'userId',
        'type',
        'userMicrosoftId',
        'role',
        'name',
        'startDate',
        'endDate',
        'updatedShiftAt'
      ])
    );
    expect(res.status).to.be.eq('error');
  });
  it('expect to return an error object - missing property', async () => {
    const shiftObject = [{ user: fixture.add.success.body.data[0].user }];
    createStub.throws(new Error(mongooseError('shift', ['user'])));
    const res = await assignTlService(shiftObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(shiftObject);
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    //Expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a('string');
    expect(res.err.message).to.be.eq(mongooseError('shift', ['user']));
    expect(res.status).to.be.eq('error');
  });
});
