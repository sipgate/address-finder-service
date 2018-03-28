import express = require("express");

import Address from "./address.model";
import findAddress from "./util/find-address";

const PORT: number = Number(process.env.PORT) || 8080;

const app: express.Application = express();

app.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const address: Address = await findAddress(search);
    if (address) {
      return res.send(address);
    }
    res.status(404).send();
  } catch (error) {
    console.log(error.message);
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
