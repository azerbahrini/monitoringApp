const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const request = require('supertest');
const ResultForm = require('../../../models/ResultForm');
const app = require('../../../server');

chai.use(sinonChai);
let refsultForm;

describe("PUT result form", () => {
    before("adding a result form before beginning the test", (done) => {
        refsultForm = refsultForm({
            formSchema: {
                test: '6189549b05812f2a68ef7aed'
            },
            formUISchema: {
                test: '6189549b05812f2a68ef7987'
            },
            formLimits: {
                test: '6189549b05812f2a68ef7123'
            },
            monitoringActivity: '6189549b05812f2a68ef7aed',
            isActive: true
        });
        ResultForm.save().then(() => done());
    });
    it("Sends a valid Request", (done) => {
        const refsultFormId = refsultForm._id;
        request(app)
            .patch("/api/resultform/updateResultForm" + refsultFormId.toString())
            .set("content-type", "application/json")

            .then((res) => {
                expect(res.status).to.equal(201);
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
                done();
            })
            .catch((err) => done(err));
    });

    it("Sends an invalid request - Wrong ID", async () => {
        it("Sends a valid Request", async () => {
            const refsultFormIdWrongId = "60ef4e3f7221301cc8eaafbe";
            const res = await request(app)
                .put("/api/resultform/updateResultForm" + refsultFormIdWrongId)
                .set("content-type", "application/json");
            expect(res.status).to.equal(400);
        });
    });
    after((done) => {
        ResultForm.findByIdAndDelete(refsultForm._id).then(() => done());
    });
});