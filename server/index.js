const express = require("express");
const fs = require("fs-extra");

const server = express();

// Returns list of cap given a region name
server.get("/region2cap", async (req, res) => {
  try {
    // Region name
    const region = req.query.region;

    if (!region) {
      throw new Error("region is a required query parameter");
    }

    // Load data
    const dataSet = await fs.readJson("./data.json");

    // Search by region
    const results = dataSet.filter((item) => item.regione.nome === region);

    // Map to get only zip Codes
    const zipCodes = results.map((item) => item.cap);

    // Flatten the output
    const output = [].concat.apply([], zipCodes);

    // Return the response
    return res.status(200).send({
      success: true,
      region: region,
      count: output.length,
      data: output,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// Returns region name given a cap
server.get("/cap2region", async (req, res) => {
  try {
    // CAP (zipCode)
    const cap = req.query.cap;

    if (!cap) {
      throw new Error("cap is a required query parameter");
    }

    // Load data
    const dataSet = await fs.readJson("./data.json");

    // Search by cap
    const results = dataSet.filter((item) => item.cap.includes(cap));

    // Map to get only region name
    const region = results.map((item) => item.regione.nome);

    // Return the response
    return res.status(200).send({
      success: true,
      cap: cap,
      region: region[0] || null,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// 404 - Error page
server.use((req, res) => {
  res
    .status(404)
    .send({
      error: "not-found",
      availableEndpoints: ["/region2cap", "/cap2region"],
    });
});

module.exports = server;
