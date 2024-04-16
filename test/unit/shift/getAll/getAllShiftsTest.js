const sinon = require("sinon");
const request = require("request");
const chai = require("chai");
const should = chai.should();

const shift = require("./fixture.json");
const base = "http://localhost:5000";

describe("when stubbed", () => {
  beforeEach(() => {
    this.get = sinon.stub(request, "get");
  });

  afterEach(() => {
    request.get.restore();
  });
  describe("GET /api/shift", () => {
    it("should return all shifts", (done) => {
      this.get.yields(
        null,
        shift.all.success.res,
        JSON.stringify(shift.all.success.body)
      );
      request.get(`${base}/api/shift`, (err, res, body) => {
        res.statusCode.should.eql(200);
        res.headers["content-type"].should.contain("application/json");
        body = JSON.parse(body);
        body.status.should.eql("success");
        body.data.length.should.eql(3);
        body.data[0].should.include.keys("id", "userId");
        done();
      });
    });
  });
});
