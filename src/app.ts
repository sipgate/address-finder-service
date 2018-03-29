import express = require("express");

import handleAddressRequest from "./address.controller";
import Address from "./address.model";
import cors from "./cors.middleware";

const PORT: number = Number(process.env.PORT) || 8080;

const app: express.Application = express();

app.use(cors);

app.get("/address", handleAddressRequest);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
