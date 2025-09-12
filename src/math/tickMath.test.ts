import { TickMath } from "./tickMath";
import { describe, expect, test } from "bun:test";

describe("TickMath", () => {
  describe("#MIN_TICK", () => {
    test("equals correct value", () => {
      expect(TickMath.MIN_TICK).toEqual(-887272);
    });
  });

  describe("#MAX_TICK", () => {
    test("equals correct value", () => {
      expect(TickMath.MAX_TICK).toEqual(887272);
    });
  });

  describe("#getSqrtRatioAtTick", () => {
    test("throws for non integer", () => {
      expect(() => TickMath.getSqrtRatioAtTick(1.5)).toThrow("TICK");
    });

    test("throws for tick too small", () => {
      expect(() => TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK - 1)).toThrow(
        "TICK",
      );
    });

    test("throws for tick too large", () => {
      expect(() => TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK + 1)).toThrow(
        "TICK",
      );
    });

    test("returns the correct value for min tick", () => {
      expect(TickMath.getSqrtRatioAtTick(TickMath.MIN_TICK)).toEqual(
        TickMath.MIN_SQRT_RATIO,
      );
    });

    test("returns the correct value for tick 0", () => {
      expect(TickMath.getSqrtRatioAtTick(0)).toEqual(1n << 96n);
    });

    test("returns the correct value for max tick", () => {
      expect(TickMath.getSqrtRatioAtTick(TickMath.MAX_TICK)).toEqual(
        TickMath.MAX_SQRT_RATIO,
      );
    });

    test("returns the correct value for +3 tick", () => {
      expect(TickMath.getSqrtRatioAtTick(3)).toEqual(
        79240047035742135098198828268n,
      );
    });
  });

  describe("#getTickAtSqrtRatio", () => {
    test("returns the correct value for sqrt ratio at min tick", () => {
      expect(TickMath.getTickAtSqrtRatio(TickMath.MIN_SQRT_RATIO)).toEqual(
        TickMath.MIN_TICK,
      );
    });
    test("returns the correct value for sqrt ratio at max tick", () => {
      expect(TickMath.getTickAtSqrtRatio(TickMath.MAX_SQRT_RATIO - 1n)).toEqual(
        TickMath.MAX_TICK - 1,
      );
    });
  });
});
