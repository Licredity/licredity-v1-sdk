import { test, expect } from "bun:test";
import { formatNonFungible } from "./account";

const MOCK_ADDRESS = "0x3Ebad585Af7A40f2ab97ceeB819f273Cbb3f71fB";
test("Format NonFungible", () => {
  const nonFungible = formatNonFungible(MOCK_ADDRESS, 123n);
  expect(nonFungible).toBe(
    "0x3ebad585af7a40f2ab97ceeb819f273cbb3f71fb00000000000000000000007b",
  );
});
