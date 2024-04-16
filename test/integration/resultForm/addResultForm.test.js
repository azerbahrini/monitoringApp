const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const ResultForm = require("../../../models/ResultForm");
const app = require("../../../server");

chai.use(sinonChai);
let id;

describe("Add task", () => {
    it("Sends a valid Request", async () => {
        const refsultForm = {
            formSchema: {
                test: "6189549b05812f2a68ef7aed"
            },
            formUISchema: {
                test: "6189549b05812f2a68ef7987"
            },
            formLimits: {
                test: "6189549b05812f2a68ef7123"
            },
            monitoringActivity: "6189549b05812f2a68ef7aed",
            isActive: true
        };
        const res = await request(app)
            .post("/api/resultform/addFormSchema")
            .set("content-type", "application/json")
            .send(refsultForm);
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("formSchema");
        expect(res.body.data).to.have.property("formUISchema");
        expect(res.body.data).to.have.property("formLimits");
        expect(res.body.data).to.have.property("monitoringActivity");
        expect(res.body.data).to.have.property("isActive");
        expect(res.body.data.formSchema).to.be.a("object");
        expect(res.body.data.formUISchema).to.be.a("object");
        expect(res.body.data.formLimits).to.be.a("object");
        expect(res.body.data.isActive).to.be.a("boolean");
        expect(res.body.data._id).to.be.a("string");
        id = res.body.data._id.toString();
    });
    it("Sends an invalid request - empty body", async () => {
        const res = await request(app)
          .post("/api/resultform/addFormSchema")
          .set("content-type", "application/json")
          .send({});
        expect(res.status).to.equal(400);
      });
      it("Send an invalid request - missing property", async () => {
        const res = await request(app)
          .post("/api/resultform/addFormSchema")
          .set("content-type", "application/json")
          .send({ isActive: false });
        expect(res.status).to.equal(400);
      });
    after((done) => {
        ResultForm.findByIdAndDelete(id).then(() => done());
    });
});