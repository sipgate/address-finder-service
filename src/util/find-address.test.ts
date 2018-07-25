import { assert } from "chai";

import Address from "../address.model";
import findAddress from "./find-address";

describe("Address Search", () => {
  it("should find the address for 'sipgate'", async () => {
    const address: Address | null = await findAddress("sipgate");
    assert.isNotNull(address);
    assert.deepEqual(address, {
      city: "Düsseldorf",
      country: "Deutschland",
      street: "Gladbacher Straße",
      streetNumber: "74",
      zip: "40219"
    });
  });

  it("should not find an address for 'a1b2c3d4e5f6g7h8i9j'", async () => {
    const address: Address | null = await findAddress("a1b2c3d4e5f6g7h8i9j");
    assert.isNull(address);
  });
});
