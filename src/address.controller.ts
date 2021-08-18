import { Request, Response } from "express";
import Address from "./address.model";
import findAddress from "./util/find-address";
import { parseGeolocationPosition } from "./util/geolocation";

function handleNotFound(res: Response): void {
  res.status(404).send();
}

export default async function handleAddressRequest(req: Request, res: Response): Promise<void> {
  try {
    const { search } = req.query;

    if (typeof search !== "string") {
      handleNotFound(res);
      return;
    }

    const address: Address | null = await findAddress(search, parseGeolocationPosition(req.query));

    if (address) {
      res.send(address);
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
  handleNotFound(res);
}
