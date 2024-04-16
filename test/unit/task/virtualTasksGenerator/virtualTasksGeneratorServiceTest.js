// const sinon = require("sinon");
// const chai = require("chai");
// var expect = chai.expect;
// const sinonChai = require("sinon-chai");
// const virtualTasksGeneratorService = require("../../../../services/task/virtualTasksGenerator");
// const fixture = require("../fixture.json");
// const moment = require('moment');

// chai.use(sinonChai);

// describe("testing virtualTasksGenerator Map service", () => {
//   it("firstReport > startMinutes", async () => {
//     const res = await virtualTasksGeneratorService(fixture.mapForVirtualTasks,moment().utc().startOf('day').add('20', 'minutes').format(),moment().utc().startOf('day').add('10', 'hours').format(),null,"Africa/Tunis");
//     expect(res).to.be.a("object");
//     expect(res).to.have.property("data");
//     expect(res).to.have.property("status");
//     expect(res.data).to.be.a("array");
//     expect(res.data.length).to.be.eq(10);
//     expect(res.status).to.be.eq("success");
//   });
//   it("firstReport <= startMinutes", async () => {
//     const res = await virtualTasksGeneratorService(fixture.mapForVirtualTasks,moment().utc().startOf('day').add('20', 'minutes').format(),null,"Africa/Tunis");
//     expect(res).to.be.a("object");
//     expect(res).to.have.property("data");
//     expect(res).to.have.property("status");
//     expect(res.data).to.be.a("array");
//     expect(res.data.length).to.be.eq(0);
//     expect(res.status).to.be.eq("success");
//   });
//   it("null inputs", async () => {
//     const res = await virtualTasksGeneratorService(fixture.nullMapForVirtualTasks,null,null,null,"Africa/Tunis");
//     expect(res).to.be.a("object");
//     expect(res).to.have.property("data");
//     expect(res).to.have.property("status");
//     expect(res.data).to.be.a("array");
//     expect(res.data.length).to.be.eq(0);
//     expect(res.status).to.be.eq("success");
//   });
//   it("No tasks", async () => {
//     const res = await virtualTasksGeneratorService(fixture.mapForVirtualTasks,"2021-11-06T08:00+01","2021-11-06T08:20+01",null,"Africa/Tunis");
//     expect(res).to.be.a("object");
//     expect(res).to.have.property("data");
//     expect(res).to.have.property("status");
//     expect(res.data).to.be.a("array");
//     expect(res.data.length).to.be.eq(0);
//     expect(res.status).to.be.eq("success");
//   });
// });
