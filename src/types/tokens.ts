import type { Address } from "viem";

/**
 * Currency and Token Types
 */

// From Uniswap V4 Core
export type Currency = Address;

// Native ETH currency constant
export const NATIVE_CURRENCY: Currency =
  "0x0000000000000000000000000000000000000000";

// Fungible token representation
export interface Fungible {
  token: Address;
}

// Non-fungible token representation
export interface NonFungible {
  token: Address;
  tokenId: bigint;
}

export interface TokenInfo {
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
}
