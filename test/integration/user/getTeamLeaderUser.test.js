// const chai = require("chai");
// const sinon = require("sinon");
// const sinonChai = require("sinon-chai");
// const request = require("supertest");

// const expect = chai.expect;

// const User = require("../../../models/User");
// const app = require("../../../server");
// const fixture = require("./fixture.json");

// chai.use(sinonChai);

// describe("GET ALL User 'Team Leaders' ", () => {
//   it("Sends a valid request", async () => {
//     const res = await request(app)
//       .get("/api/user/getTeamLeaders")
//       .set("content-type", "application/json");

//     expect(res.status).to.equal(200);
//     expect(res.body.data).to.be.a("array");
//   });

//   it("Sends an invalid request - Body Validator Error", async () => {
//     const res = await request(app)
//       .get("/api/user/getTeamLeaders")
//       .set("content-type", "application/json")
//       .send({ property: "something" });

//     expect(res.status).to.equal(400);
//   });

//   it("Sends an invalid request - Query Validator Error", async () => {
//     const res = await request(app)
//       .get("/api/user/getTeamLeaders?param=something")
//       .set("content-type", "application/json");
//     expect(res.status).to.equal(400);
//   });

//   it("Expect to throw an Internal Error", async () => {
//     const findStub = sinon.stub(User, "find");
//     const res = await request(app)
//       .get("/api/user/getTeamLeaders")
//       .set("content-type", "application/json");
//     expect(res.status).to.equal(400);
//     findStub.restore();
//   });
// });
