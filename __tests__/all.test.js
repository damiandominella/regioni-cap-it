const request = require("supertest");
const server = require("../server");

describe("Endpoint requests cap2region", () => {
  it("should return an error", async () => {
    const res = await request(server).get("/cap2region").send();
    expect(res.statusCode).toEqual(400);
  });

  it("should return an empty region", async () => {
    const res = await request(server).get("/cap2region?cap=00000").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.region).toEqual(null);
  });

  it("should return Emilia-Romagna as a region", async () => {
    const res = await request(server).get("/cap2region?cap=47838").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.region).toEqual("Emilia-Romagna");
  });
});

describe("Endpoint requests region2cap", () => {
  it("should return an error", async () => {
    const res = await request(server).get("/region2cap").send();
    expect(res.statusCode).toEqual(400);
  });

  it("should return an empty array of caps", async () => {
    const res = await request(server)
      .get("/region2cap?region=SanMarino")
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toEqual(0);
    expect(res.body.data).toEqual([]);
  });

  it("should return 47838 in the array of caps", async () => {
    const res = await request(server).get("/region2cap?region=Emilia-Romagna").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toBeGreaterThan(0);
    expect(res.body.data).toContain("47838")
  });
});
