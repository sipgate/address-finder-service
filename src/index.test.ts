import { assert } from "chai";

import { message } from ".";

describe("Hello World", () => {
  it("should export 'Hello World'", () => {
    assert.equal(message, "Hello World");
  });
});
