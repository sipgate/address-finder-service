import express = require("express");
import RateLimit = require("express-rate-limit");

import handleAddressRequest from "./address.controller";
import cors from "./cors.middleware";

const limiter: express.RequestHandler = new RateLimit({
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  max: 30, // limit each IP to 15 requests per minute
  windowMs: 60000 // 1 minute
});

const PORT: number = Number(process.env.PORT) || 8080;

const app: express.Application = express();

app.enable("trust proxy");

app.use(cors);
app.use(limiter);

app.get("/address", handleAddressRequest);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
