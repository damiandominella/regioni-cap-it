const express = require("express");
const fs = require("fs-extra");

const PORT = process.env.PORT || 5000;

const app = express();

// Returns list of cap given a region name
app.get("/region2cap", async (req, res) => {
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
    console.error(err);
    return res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// Returns region name given a cap
app.get("/cap2region", async (req, res) => {
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
    console.error(err);
    return res.status(400).send({
      success: false,
      error: err.message,
    });
  }
});

// 404 - Error page
app.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
