// const chai = require("chai");
// const sinon = require("sinon");
// const sinonChai = require("sinon-chai");
// const expect = chai.expect;
// const request = require("supertest");
// const User = require("../../../models/User");
// const app = require("../../../server");
// const fixture = require("./fixture.json");
// chai.use(sinonChai);
// // let id;
// // if the send valid request fails try to check if the user exists with the same email
// //or simply change user.email in the fixture
// let id;
// describe("Update User", () => {
//   it("Sends a valid request", async () => {
//     const res = await request(app)
//       .patch("/api/user")
//       .set("content-type", "application/json")
//       .send(fixture.userToRegister);
//     expect(res.status).to.equal(200);
//     expect(res.body.data).to.be.a("object");
//     expect(res.body.data).to.have.property("token");
//   });

//   it("Sends an invalid request - Empty Body", async () => {
//     const res = await request(app)
//       .post("/api/register")
//       .set("content-type", "application/json")
//       .send(fixture.emptyTypeDataTest);

//     expect(res.status).to.equal(400);
//   });
//   it("Sends an invalid request - Missing Property", async () => {
//     const res = await request(app)
//       .post("/api/register")
//       .set("content-type", "application/json")
//       .send({ firstName: fixture.userToRegister.firstName });
//     expect(res.status).to.equal(400);
//   });
//   it("Sends an invalid request - Query Validation Error", async () => {
//     const res = await request(app)
//       .post("/api/register?param=something")
//       .set("content-type", "application/json")
//       .send(fixture.userToRegister);
//     expect(res.status).to.equal(400);
//   });
//   it("Expect to throw an Internal Error", async () => {
//     const createStub = sinon.stub(User.prototype, "save").throws(new Error(""));
//     const res = await request(app)
//       .post("/api/register")
//       .set("content-type", "application/json")
//       .send(fixture.userToRegister);
//     expect(res.status).to.equal(400);
//     createStub.restore();
//   });
//   // after((done) => {
//   //   User.findByIdAndDelete(id).then(() => done());
//   // });
// });
