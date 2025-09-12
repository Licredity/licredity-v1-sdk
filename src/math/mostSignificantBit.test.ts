import { test, describe, expect } from "bun:test";
import { mostSignificantBit } from "./mostSignificantBit";
import { maxUint256 } from "viem";

describe("mostSignificantBit", () => {
  test("throws for zero", () => {
    expect(() => mostSignificantBit(0n)).toThrow("ZERO");
  });
  test("correct value for every power of 2", () => {
    for (let i = 1; i < 256; i++) {
      const x = 2n ** BigInt(i);
      expect(mostSignificantBit(x)).toEqual(i);
    }
  });

  test("correct value for every power of 2 - 1", () => {
    for (let i = 2; i < 256; i++) {
      const x = 2n ** BigInt(i) - 1n;

      expect(mostSignificantBit(x)).toEqual(i - 1);
    }
  });

  test("succeeds for MaxUint256", () => {
    expect(mostSignificantBit(maxUint256)).toEqual(255);
  });

  test("throws for MaxUint256 + 1", () => {
    expect(() => mostSignificantBit(maxUint256 + 1n)).toThrow("MAX");
  });
});
