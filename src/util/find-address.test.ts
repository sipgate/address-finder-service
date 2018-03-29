import { assert } from "chai";

import Address from "../address.model";
import findAddress from "./find-address";

describe("Address Search", () => {
  it("should find the address for 'sipgate GmbH'", async () => {
    const address: Address = await findAddress("sipgate GmbH");
    assert.isNotNull(address);
    assert.equal(address.street, "Gladbacher Straße");
    assert.equal(address.streetNumber, "74");
    assert.equal(address.zip, "40219");
    assert.equal(address.city, "Düsseldorf");
    assert.equal(address.country, "Deutschland");
  });

  it("should not find an address for 'a1b2c3d4e5f6g7h8i9j'", async () => {
    const address: Address = await findAddress("a1b2c3d4e5f6g7h8i9j");
    assert.isNull(address);
  });
});
