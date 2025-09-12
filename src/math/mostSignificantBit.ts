import { maxUint256 } from "viem";

const POWERS_OF_2 = [128, 64, 32, 16, 8, 4, 2, 1].map(
  (pow: number): [number, bigint] => [pow, 2n ** BigInt(pow)],
);

export function mostSignificantBit(x: bigint): number {
  if (x <= 0n) {
    throw Error("ZERO");
  }

  if (x > maxUint256) {
    throw Error("MAX");
  }

  let msb: number = 0;
  for (const [power, min] of POWERS_OF_2) {
    if (x >= min) {
      x = x >> BigInt(power);
      msb += power;
    }
  }
  return msb;
}
